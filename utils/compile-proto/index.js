import path from 'node:path';
import fs from 'node:fs/promises';
import {
  Loader,
  VERSIONS_DIR,
  makeProtobufIndex,
  sortVersions,
  doPrettier,
} from './utils.js';

await Loader('Creating index.js', async () => {
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
  const { cjs, esm, tsDef, namespaceDef } = makeProtobufIndex(dir);
  const indexCjsPath = path.resolve(VERSIONS_DIR, '..', 'index.cjs');
  const indexEsmPath = path.resolve(VERSIONS_DIR, '..', 'index.js');
  const indexDtsPath = path.resolve(VERSIONS_DIR, '..', 'index.d.ts');
  const namespaceDtsPath = path.resolve(
    VERSIONS_DIR,
    '..',
    'version-namespace.d.ts',
  );
  await Promise.all([
    (async () =>
      fs.writeFile(indexCjsPath, await doPrettier(cjs, indexCjsPath)))(),
    (async () =>
      fs.writeFile(indexEsmPath, await doPrettier(esm, indexEsmPath)))(),
    (async () =>
      fs.writeFile(indexDtsPath, await doPrettier(tsDef, indexDtsPath)))(),
    (async () =>
      fs.writeFile(
        namespaceDtsPath,
        await doPrettier(namespaceDef, namespaceDtsPath),
      ))(),
  ]);
});
