import path from 'node:path';
import fs from 'node:fs/promises';
import {
  Loader,
  loadTags,
  formatEslintMessage,
  pbjsMain,
  pbtsMain,
  eslintText,
  stopEslint,
  doPrettier,
  argv,
} from './utils.js';

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
