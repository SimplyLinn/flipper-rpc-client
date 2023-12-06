export declare const FIRST_VERSION: '0.1';
export declare const LATEST_VERSION: '0.21';
export type LATEST_VERSION = typeof LATEST_VERSION;
export declare const BOOTSTRAP_VERSION: unique symbol;
export type BOOTSTRAP_VERSION = typeof BOOTSTRAP_VERSION;
export type PROTOBUF_VERSION_MAP = {
  [BOOTSTRAP_VERSION]: {
    [key in keyof typeof import('./bootstrap.js')]: (typeof import('./bootstrap.js'))[key];
  };
  '0.1': {
    [key in keyof typeof import('./v/0.1/index.js')]: (typeof import('./v/0.1/index.js'))[key];
  };
  '0.2': {
    [key in keyof typeof import('./v/0.2/index.js')]: (typeof import('./v/0.2/index.js'))[key];
  };
  '0.3': {
    [key in keyof typeof import('./v/0.3/index.js')]: (typeof import('./v/0.3/index.js'))[key];
  };
  '0.4': {
    [key in keyof typeof import('./v/0.4/index.js')]: (typeof import('./v/0.4/index.js'))[key];
  };
  '0.5': {
    [key in keyof typeof import('./v/0.5/index.js')]: (typeof import('./v/0.5/index.js'))[key];
  };
  '0.6': {
    [key in keyof typeof import('./v/0.6/index.js')]: (typeof import('./v/0.6/index.js'))[key];
  };
  '0.7': {
    [key in keyof typeof import('./v/0.7/index.js')]: (typeof import('./v/0.7/index.js'))[key];
  };
  '0.8': {
    [key in keyof typeof import('./v/0.8/index.js')]: (typeof import('./v/0.8/index.js'))[key];
  };
  '0.9': {
    [key in keyof typeof import('./v/0.9/index.js')]: (typeof import('./v/0.9/index.js'))[key];
  };
  '0.10': {
    [key in keyof typeof import('./v/0.10/index.js')]: (typeof import('./v/0.10/index.js'))[key];
  };
  '0.11': {
    [key in keyof typeof import('./v/0.11/index.js')]: (typeof import('./v/0.11/index.js'))[key];
  };
  '0.12': {
    [key in keyof typeof import('./v/0.12/index.js')]: (typeof import('./v/0.12/index.js'))[key];
  };
  '0.13': {
    [key in keyof typeof import('./v/0.13/index.js')]: (typeof import('./v/0.13/index.js'))[key];
  };
  '0.14': {
    [key in keyof typeof import('./v/0.14/index.js')]: (typeof import('./v/0.14/index.js'))[key];
  };
  '0.15': {
    [key in keyof typeof import('./v/0.15/index.js')]: (typeof import('./v/0.15/index.js'))[key];
  };
  '0.16': {
    [key in keyof typeof import('./v/0.16/index.js')]: (typeof import('./v/0.16/index.js'))[key];
  };
  '0.17': {
    [key in keyof typeof import('./v/0.17/index.js')]: (typeof import('./v/0.17/index.js'))[key];
  };
  '0.18': {
    [key in keyof typeof import('./v/0.18/index.js')]: (typeof import('./v/0.18/index.js'))[key];
  };
  '0.19': {
    [key in keyof typeof import('./v/0.19/index.js')]: (typeof import('./v/0.19/index.js'))[key];
  };
  '0.20': {
    [key in keyof typeof import('./v/0.20/index.js')]: (typeof import('./v/0.20/index.js'))[key];
  };
  '0.21': {
    [key in keyof typeof import('./v/0.21/index.js')]: (typeof import('./v/0.21/index.js'))[key];
  };
};
export type PROTOBUF_VERSIONS = readonly [
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
export declare const PROTOBUF_VERSIONS: PROTOBUF_VERSIONS;
export type PROTOBUF_VERSION = PROTOBUF_VERSIONS[number];
export declare function loadVersion(
  version: '0.1',
): Promise<PROTOBUF_VERSION_MAP['0.1']>;
export declare function loadVersion(
  version: '0.2',
): Promise<PROTOBUF_VERSION_MAP['0.2']>;
export declare function loadVersion(
  version: '0.3',
): Promise<PROTOBUF_VERSION_MAP['0.3']>;
export declare function loadVersion(
  version: '0.4',
): Promise<PROTOBUF_VERSION_MAP['0.4']>;
export declare function loadVersion(
  version: '0.5',
): Promise<PROTOBUF_VERSION_MAP['0.5']>;
export declare function loadVersion(
  version: '0.6',
): Promise<PROTOBUF_VERSION_MAP['0.6']>;
export declare function loadVersion(
  version: '0.7',
): Promise<PROTOBUF_VERSION_MAP['0.7']>;
export declare function loadVersion(
  version: '0.8',
): Promise<PROTOBUF_VERSION_MAP['0.8']>;
export declare function loadVersion(
  version: '0.9',
): Promise<PROTOBUF_VERSION_MAP['0.9']>;
export declare function loadVersion(
  version: '0.10',
): Promise<PROTOBUF_VERSION_MAP['0.10']>;
export declare function loadVersion(
  version: '0.11',
): Promise<PROTOBUF_VERSION_MAP['0.11']>;
export declare function loadVersion(
  version: '0.12',
): Promise<PROTOBUF_VERSION_MAP['0.12']>;
export declare function loadVersion(
  version: '0.13',
): Promise<PROTOBUF_VERSION_MAP['0.13']>;
export declare function loadVersion(
  version: '0.14',
): Promise<PROTOBUF_VERSION_MAP['0.14']>;
export declare function loadVersion(
  version: '0.15',
): Promise<PROTOBUF_VERSION_MAP['0.15']>;
export declare function loadVersion(
  version: '0.16',
): Promise<PROTOBUF_VERSION_MAP['0.16']>;
export declare function loadVersion(
  version: '0.17',
): Promise<PROTOBUF_VERSION_MAP['0.17']>;
export declare function loadVersion(
  version: '0.18',
): Promise<PROTOBUF_VERSION_MAP['0.18']>;
export declare function loadVersion(
  version: '0.19',
): Promise<PROTOBUF_VERSION_MAP['0.19']>;
export declare function loadVersion(
  version: '0.20',
): Promise<PROTOBUF_VERSION_MAP['0.20']>;
export declare function loadVersion(
  version: '0.21',
): Promise<PROTOBUF_VERSION_MAP['0.21']>;
export declare function loadVersion(
  version: BOOTSTRAP_VERSION,
): Promise<PROTOBUF_VERSION_MAP[BOOTSTRAP_VERSION]>;
export declare function loadVersion<
  T extends PROTOBUF_VERSION | BOOTSTRAP_VERSION,
>(version: T): Promise<PROTOBUF_VERSION_MAP[T]>;
export declare function isValidVersion(
  version: string,
): version is PROTOBUF_VERSION;
export declare function isValidVersion(
  version: symbol,
): version is BOOTSTRAP_VERSION;
export declare function isValidVersion(
  version: string | symbol,
): version is PROTOBUF_VERSION | BOOTSTRAP_VERSION;
