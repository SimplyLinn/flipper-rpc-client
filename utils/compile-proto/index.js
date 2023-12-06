import path from 'node:path';
import fs from 'node:fs/promises';
import { Loader, VERSIONS_DIR, sortVersions, doPrettier } from './utils.js';

/**
 * @param {string[]} versions
 */
function makeProtobufIndex(versions) {
  const escapedVersions = versions.map((v) =>
    JSON.stringify(v).trim().replace(/^"|"$/g, ''),
  );
  const tsDef = `export declare const FIRST_VERSION: "${escapedVersions[0]}";
export declare const LATEST_VERSION: "${
    escapedVersions[escapedVersions.length - 1]
  }";
export type LATEST_VERSION = typeof LATEST_VERSION;
export declare const BOOTSTRAP_VERSION: unique symbol;
export type BOOTSTRAP_VERSION = typeof BOOTSTRAP_VERSION;
export type PROTOBUF_VERSION_MAP = {
  [BOOTSTRAP_VERSION]: { [key in keyof (typeof import("./bootstrap.js")) ]: (typeof import("./bootstrap.js"))[key] };
${escapedVersions
  .map(
    (v) =>
      `  "${v}":{ [key in keyof (typeof import("./v/${v}/index.js")) ]: (typeof import("./v/${v}/index.js"))[key] }`,
  )
  .join(';\n')};};
export type PROTOBUF_VERSIONS = readonly ["${escapedVersions.join('","')}"];
export declare const PROTOBUF_VERSIONS: PROTOBUF_VERSIONS;
export type PROTOBUF_VERSION = PROTOBUF_VERSIONS[number];
${escapedVersions
  .map(
    (v) =>
      `export declare function loadVersion(version: "${v}"): Promise<PROTOBUF_VERSION_MAP["${v}"]>;`,
  )
  .join('\n')}
export declare function loadVersion(version: BOOTSTRAP_VERSION): Promise<PROTOBUF_VERSION_MAP[BOOTSTRAP_VERSION]>;
export declare function loadVersion<T extends PROTOBUF_VERSION | BOOTSTRAP_VERSION>(version: T): Promise<PROTOBUF_VERSION_MAP[T]>;
export declare function isValidVersion(version: string): version is PROTOBUF_VERSION;
export declare function isValidVersion(version: symbol): version is BOOTSTRAP_VERSION;
export declare function isValidVersion(version: string | symbol): version is PROTOBUF_VERSION | BOOTSTRAP_VERSION;
`;
  const esm = `export const FIRST_VERSION = "${escapedVersions[0]}";
export const LATEST_VERSION = "${escapedVersions[escapedVersions.length - 1]}";
export const PROTOBUF_VERSIONS = ["${escapedVersions.join('","')}"];
export const BOOTSTRAP_VERSION = Symbol.for('PROTOBUF_BOOTSTRAP_VERSION');
export function loadVersion(version) {
  if (version === BOOTSTRAP_VERSION) {
    return import('./bootstrap/index.js');
  }
  return import(
    /* webpackChunkName: "protobuf-version" */
    /* webpackMode: "lazy-once" */
    \`./v/\${version}/index.js\`
  );
}
export function isValidVersion(version) {
  return version === BOOTSTRAP_VERSION || PROTOBUF_VERSIONS.includes(version);
}
`;
  const cjs = `const FIRST_VERSION = "${escapedVersions[0]}";
const LATEST_VERSION = "${escapedVersions[escapedVersions.length - 1]}";
const BOOTSTRAP_VERSION = Symbol.for('PROTOBUF_BOOTSTRAP_VERSION');
const PROTOBUF_VERSIONS = ["${escapedVersions.join('","')}"];
function loadVersion(version) {
  if (version === BOOTSTRAP_VERSION) {
    return Promise.resolve(require('./bootstrap/index.cjs'));
  }
  return Promise.resolve(
    require(
      /* webpackChunkName: "protobuf-version" */
      /* webpackMode: "lazy-once" */
      \`./v/\${version}/index.cjs\`,
    ),
  );
}
function isValidVersion(version) {
  return version === BOOTSTRAP_VERSION || PROTOBUF_VERSIONS.includes(version);
}
module.exports = {
  FIRST_VERSION,
  LATEST_VERSION,
  BOOTSTRAP_VERSION,
  PROTOBUF_VERSIONS,
  loadVersion,
  isValidVersion,
};
`;
  const namespaceDef = escapedVersions
    .map(
      (v) =>
        `export type * as v${v.replace(
          /[^a-zA-Z0-9_$]/g,
          '_',
        )} from './v/${v}/index.d.ts';`,
    )
    .join('\n');
  return { tsDef, esm, cjs, namespaceDef };
}

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
          .filter(/** @type {(d: string | false) => d is string} */ (d) => !!d)
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
