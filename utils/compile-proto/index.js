import path from 'node:path';
import fs from 'node:fs/promises';
import prettier from 'prettier';
import {
  Loader,
  loadTags,
  formatEslintMessage,
  pbjsMain,
  pbtsMain,
  VERSIONS_DIR,
  makeProtobufVersions,
  sortVersions,
  eslintText,
  stopEslint,
  argv,
} from './utils.js';

async function doPrettier(data, filePath) {
  const config = await prettier.resolveConfig(filePath);
  return prettier.format(data, {
    ...config,
    filepath: filePath,
  });
}

try {
  for await (const tag of loadTags(argv._)) {
    const [strippedEsmOutput, strippedCjsOutput, fullOutput] = await Loader(
      'Generating protobuf static module',
      () =>
        Promise.all([
          pbjsMain([
            '--target=static-module',
            '--wrap=es6',
            '--root=___INVALID_DEFAULT___',
            ...tag.srcFiles,
            '--no-comments',
            '--lint=',
          ]).then((o) =>
            o
              .replace(
                /import \* as \$protobuf from (?:'protobufjs\/minimal'|"protobufjs\/minimal")/,
                "import $protobuf from 'protobufjs/minimal.js'",
              )
              .replace(
                /\.[\s\n]*___INVALID_DEFAULT___|\[[\s\n]*'___INVALID_DEFAULT___'[\s\n]*\]|\[[\s\n]*"___INVALID_DEFAULT___"[\s\n]*\]/g,
                '',
              ),
          ),
          pbjsMain([
            '--target=static-module',
            '--wrap=commonjs',
            ...tag.srcFiles,
            '--no-comments',
            '--lint=',
          ]),
          pbjsMain(['--target=static-module', '--wrap=es6', ...tag.srcFiles]),
        ]),
    );

    const tsOutput = await Loader('Generating typescript declarations', () =>
      pbtsMain(['-'], fullOutput),
    );

    const [lintEsmOutput, lintCjsOutput, lintTsOutput] = await Loader(
      'Formatting output',
      () =>
        Promise.all([
          eslintText(strippedEsmOutput, path.join(tag.outDir, 'index.js')).then(
            ([result]) => {
              if (result.fatalErrorCount > 0 || !result.output) {
                const firstFatal = result.messages.find((m) => m.fatal);
                if (firstFatal) {
                  console.error(firstFatal);
                  console.error(
                    formatEslintMessage(
                      tsOutput.split(/\r?\n/),
                      firstFatal,
                    ).join('\n'),
                  );
                }
                throw new Error('Failed to format protobuf output!');
              }
              return doPrettier(
                result.output,
                path.join(tag.outDir, 'index.js'),
              );
            },
          ),
          eslintText(
            strippedCjsOutput,
            path.join(tag.outDir, 'index.cjs'),
          ).then(([result]) => {
            if (result.fatalErrorCount > 0 || !result.output) {
              const firstFatal = result.messages.find((m) => m.fatal);
              if (firstFatal) {
                console.error(firstFatal);
                console.error(
                  formatEslintMessage(tsOutput.split(/\r?\n/), firstFatal).join(
                    '\n',
                  ),
                );
              }
              throw new Error('Failed to format protobuf output!');
            }
            return doPrettier(
              result.output,
              path.join(tag.outDir, 'index.cjs'),
            );
          }),
          eslintText(tsOutput, path.join(tag.outDir, 'index.d.ts')).then(
            ([result]) => {
              if (result.fatalErrorCount > 0 || !result.output) {
                const firstFatal = result.messages.find((m) => m.fatal);
                if (firstFatal) {
                  console.error(firstFatal);
                  console.error(
                    formatEslintMessage(
                      tsOutput.split(/\r?\n/),
                      firstFatal,
                    ).join('\n'),
                  );
                }
                throw new Error(
                  'Failed to format TypeScript declaration file output!',
                );
              }
              return doPrettier(
                result.output,
                path.join(tag.outDir, 'index.d.ts'),
              );
            },
          ),
        ]),
    );

    await Loader('Writing output', () =>
      fs
        .mkdir(tag.outDir, { recursive: true })
        .then(() => {
          Promise.all([
            fs.unlink(path.join(tag.outDir, 'index.js')).catch((e) => {
              if (e.code !== 'ENOENT') {
                throw e;
              }
            }),
            fs.unlink(path.join(tag.outDir, 'index.cjs')).catch((e) => {
              if (e.code !== 'ENOENT') {
                throw e;
              }
            }),
            fs.unlink(path.join(tag.outDir, 'index.d.ts')).catch((e) => {
              if (e.code !== 'ENOENT') {
                throw e;
              }
            }),
            fs.unlink(path.join(tag.outDir, '.git_commit')).catch((e) => {
              if (e.code !== 'ENOENT') {
                throw e;
              }
            }),
          ]);
        })
        .then(() =>
          Promise.all([
            fs.writeFile(path.join(tag.outDir, 'index.js'), lintEsmOutput),
            fs.writeFile(path.join(tag.outDir, 'index.cjs'), lintCjsOutput),
            fs.writeFile(path.join(tag.outDir, 'index.d.ts'), lintTsOutput),
          ]),
        )
        .then(() =>
          fs.writeFile(path.join(tag.outDir, '.git_commit'), tag.commit),
        ),
    );
  }
} catch (e) {
  stopEslint();
  throw e;
}

console.info('\n~~ Compiling protobuf bootstrap');
try {
  const BOOTSTRAP_DIR = path.join(process.cwd(), 'flipperproto-bootstrap');
  const [strippedEsmOutput, strippedCjsOutput, fullOutput] = await Loader(
    'Generating boostrap protobuf module',
    () =>
      fs
        .readdir(BOOTSTRAP_DIR, {
          withFileTypes: true,
        })
        .then((files) =>
          files
            .filter((f) => f.isFile() && f.name.endsWith('.proto'))
            .sort(({ name: a }, { name: b }) => (a < b ? -1 : a > b ? 1 : 0))
            .map(({ name }) => path.join(BOOTSTRAP_DIR, name)),
        )
        .then((srcFiles) =>
          Promise.all([
            pbjsMain([
              '--target=static-module',
              '--wrap=es6',
              '--root=___INVALID_DEFAULT___',
              ...srcFiles,
              '--no-comments',
              '--lint=',
            ]).then((o) =>
              o
                .replace(
                  /import \* as \$protobuf from (?:'protobufjs\/minimal'|"protobufjs\/minimal")/,
                  "import $protobuf from 'protobufjs/minimal.js'",
                )
                .replace(
                  /\.[\s\n]*___INVALID_DEFAULT___|\[[\s\n]*'___INVALID_DEFAULT___'[\s\n]*\]|\[[\s\n]*"___INVALID_DEFAULT___"[\s\n]*\]/g,
                  '',
                ),
            ),
            pbjsMain([
              '--target=static-module',
              '--wrap=commonjs',
              ...srcFiles,
              '--no-comments',
              '--lint=',
            ]),
            pbjsMain(['--target=static-module', '--wrap=es6', ...srcFiles]),
          ]),
        ),
  );
  const tsOutput = await Loader('Generating typescript declarations', () =>
    pbtsMain(['-'], fullOutput),
  );

  const outDir = path.resolve(VERSIONS_DIR, '..');

  const [lintEsmOutput, lintCjsOutput, lintTsOutput] = await Loader(
    'Formatting output',
    () =>
      Promise.all([
        eslintText(strippedEsmOutput, path.join(outDir, 'bootstrap.js')).then(
          ([result]) => {
            if (result.fatalErrorCount > 0 || !result.output) {
              const firstFatal = result.messages.find((m) => m.fatal);
              if (firstFatal) {
                console.error(firstFatal);
                console.error(
                  formatEslintMessage(tsOutput.split(/\r?\n/), firstFatal).join(
                    '\n',
                  ),
                );
              }
              throw new Error('Failed to format protobuf output!');
            }
            return doPrettier(result.output, path.join(outDir, 'bootstrap.js'));
          },
        ),
        eslintText(strippedCjsOutput, path.join(outDir, 'bootstrap.cjs')).then(
          ([result]) => {
            if (result.fatalErrorCount > 0 || !result.output) {
              const firstFatal = result.messages.find((m) => m.fatal);
              if (firstFatal) {
                console.error(firstFatal);
                console.error(
                  formatEslintMessage(tsOutput.split(/\r?\n/), firstFatal).join(
                    '\n',
                  ),
                );
              }
              throw new Error('Failed to format protobuf output!');
            }
            return doPrettier(
              result.output,
              path.join(outDir, 'bootstrap.cjs'),
            );
          },
        ),
        eslintText(tsOutput, path.join(outDir, 'bootstrap.d.ts')).then(
          ([result]) => {
            if (result.fatalErrorCount > 0 || !result.output) {
              const firstFatal = result.messages.find((m) => m.fatal);
              if (firstFatal) {
                console.error(firstFatal);
                console.error(
                  formatEslintMessage(tsOutput.split(/\r?\n/), firstFatal).join(
                    '\n',
                  ),
                );
              }
              throw new Error(
                'Failed to format TypeScript declaration file output!',
              );
            }
            return doPrettier(
              result.output,
              path.join(outDir, 'bootstrap.d.ts'),
            );
          },
        ),
      ]),
  );

  await Loader('Writing output', () =>
    fs
      .mkdir(outDir, { recursive: true })
      .then(() => {
        Promise.all([
          fs.unlink(path.join(outDir, 'bootstrap.js')).catch((e) => {
            if (e.code !== 'ENOENT') {
              throw e;
            }
          }),
          fs.unlink(path.join(outDir, 'bootstrap.cjs')).catch((e) => {
            if (e.code !== 'ENOENT') {
              throw e;
            }
          }),
          fs.unlink(path.join(outDir, 'bootstrap.d.ts')).catch((e) => {
            if (e.code !== 'ENOENT') {
              throw e;
            }
          }),
        ]);
      })
      .then(() =>
        Promise.all([
          fs.writeFile(path.join(outDir, 'bootstrap.js'), lintEsmOutput),
          fs.writeFile(path.join(outDir, 'bootstrap.cjs'), lintCjsOutput),
          fs.writeFile(path.join(outDir, 'bootstrap.d.ts'), lintTsOutput),
        ]),
      ),
  );
  console.info('\n~~ Compiling protobuf bootstrap: DONE');
} catch (err) {
  console.info('\n~~ Compiling protobuf bootstrap: FAILED');
  throw err;
} finally {
  stopEslint();
}

await Loader('Creating versions.js', async () => {
  const dir = await fs
    .readdir(VERSIONS_DIR, {
      withFileTypes: true,
    })
    .then((files) =>
      Promise.all(
        files
          .filter((f) => f.isDirectory())
          .map((f) =>
            fs
              .readdir(path.join(VERSIONS_DIR, f.name), {
                withFileTypes: true,
              })
              .then((f) => {
                const fileNames = f
                  .filter((f) => f.isFile())
                  .map((f) => f.name);
                return (
                  fileNames.includes('index.js') &&
                  fileNames.includes('index.d.ts')
                );
              })
              .then((hasIndex) => hasIndex && f.name),
          ),
      ).then((dirs) =>
        dirs
          .filter(/** @type {(d: string | false) => d is string} */ (d) => d)
          .sort(sortVersions),
      ),
    );
  const { cjs, esm, tsDef } = makeProtobufVersions(dir);
  const versionCjsPath = path.resolve(VERSIONS_DIR, '..', 'index.cjs');
  const versionEsmPath = path.resolve(VERSIONS_DIR, '..', 'index.js');
  const versionDtsPath = path.resolve(VERSIONS_DIR, '..', 'index.d.ts');
  await Promise.all([
    (async () =>
      fs.writeFile(versionCjsPath, await doPrettier(cjs, versionCjsPath)))(),
    (async () =>
      fs.writeFile(versionEsmPath, await doPrettier(esm, versionEsmPath)))(),
    (async () =>
      fs.writeFile(versionDtsPath, await doPrettier(tsDef, versionDtsPath)))(),
  ]);
});
