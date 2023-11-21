export const PROTOBUF_VERSIONS = [
  '0.1',
  '0.2',
  '0.3',
  '0.4',
  '0.5',
  '0.6',
  '0.7',
  '0.8',
  '0.9',
  '0.10',
  '0.11',
  '0.12',
  '0.13',
  '0.14',
  '0.15',
  '0.16',
  '0.17',
  '0.18',
  '0.19',
  '0.20',
  '0.21',
];
export function loadVersion(version) {
  return import(
    /* webpackChunkName: "protobuf-version" */
    /* webpackMode: "lazy-once" */
    `./v/${version}/index.js`
  );
}
export const FIRST_VERSION = '0.1';
export const LATEST_VERSION = '0.21';
export function isValidVersion(version) {
  return PROTOBUF_VERSIONS.includes(version);
}
