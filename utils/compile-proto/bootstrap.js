import path from 'node:path';
import fs from 'node:fs/promises';
import {
  Loader,
  formatEslintMessage,
  pbjsMain,
  pbtsMain,
  VERSIONS_DIR,
  doPrettier,
} from './utils.js';
import { eslintText, stopEslint } from './eslintHelper.js';

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
          (result) => {
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
          (result) => {
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
          (result) => {
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
