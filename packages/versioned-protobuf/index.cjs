const FIRST_VERSION = '0.1';
const LATEST_VERSION = '0.21';
const BOOTSTRAP_VERSION = Symbol.for('PROTOBUF_BOOTSTRAP_VERSION');
const PROTOBUF_VERSIONS = [
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
function loadVersion(version) {
  if (version === BOOTSTRAP_VERSION) {
    return Promise.resolve(require('./bootstrap/index.cjs'));
  }
  return Promise.resolve(
    require(
      /* webpackChunkName: "protobuf-version" */
      /* webpackMode: "lazy-once" */
      `./v/${version}/index.cjs`,
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
