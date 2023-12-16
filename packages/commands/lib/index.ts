// import type * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import {
  BOOTSTRAP_VERSION,
  PROTOBUF_VERSION,
  PROTOBUF_VERSION_MAP,
} from '@flipper-rpc-client/versioned-protobuf';
import { RpcApi } from '@flipper-rpc-client/core';
import { Version } from '@flipper-rpc-client/versioned-protobuf/Types';
import v0_1 from './v0.1.js';
import v0_2 from './v0.2.js';
import v0_3 from './v0.3.js';
import v0_4 from './v0.4.js';
import v0_5 from './v0.5.js';
import v0_6 from './v0.6.js';
import v0_7 from './v0.7.js';
import v0_8 from './v0.8.js';
import v0_9 from './v0.9.js';
import v0_10 from './v0.10.js';
import v0_11 from './v0.11.js';
import v0_12 from './v0.12.js';
import v0_13 from './v0.13.js';
import v0_14 from './v0.14.js';
import v0_15 from './v0.15.js';
import v0_16 from './v0.16.js';
import v0_17 from './v0.17.js';
import v0_18 from './v0.18.js';
import v0_19 from './v0.19.js';
import v0_20 from './v0.20.js';
import v0_21 from './v0.21.js';
import bootstrap from './bootstrap.js';
import { Commands } from './base.js';

export type CommandsByVersion<Version extends keyof PROTOBUF_VERSION_MAP> = {
  [BOOTSTRAP_VERSION]: bootstrap<Version>;
  '0.1': v0_1<Version & Version.AndUp<'0.1'>>;
  '0.2': v0_2<Version & Version.AndUp<'0.2'>>;
  '0.3': v0_3<Version & Version.AndUp<'0.3'>>;
  '0.4': v0_4<Version & Version.AndUp<'0.4'>>;
  '0.5': v0_5<Version & Version.AndUp<'0.5'>>;
  '0.6': v0_6<Version & Version.AndUp<'0.6'>>;
  '0.7': v0_7<Version & Version.AndUp<'0.7'>>;
  '0.8': v0_8<Version & Version.AndUp<'0.8'>>;
  '0.9': v0_9<Version & Version.AndUp<'0.9'>>;
  '0.10': v0_10<Version & Version.AndUp<'0.10'>>;
  '0.11': v0_11<Version & Version.AndUp<'0.11'>>;
  '0.12': v0_12<Version & Version.AndUp<'0.12'>>;
  '0.13': v0_13<Version & Version.AndUp<'0.13'>>;
  '0.14': v0_14<Version & Version.AndUp<'0.14'>>;
  '0.15': v0_15<Version & Version.AndUp<'0.15'>>;
  '0.16': v0_16<Version & Version.AndUp<'0.16'>>;
  '0.17': v0_17<Version & Version.AndUp<'0.17'>>;
  '0.18': v0_18<Version & Version.AndUp<'0.18'>>;
  '0.19': v0_19<Version & Version.AndUp<'0.19'>>;
  '0.20': v0_20<Version & Version.AndUp<'0.20'>>;
  '0.21': v0_21<Version & Version.AndUp<'0.21'>>;
}[Extract<keyof PROTOBUF_VERSION_MAP, Version>];

const CommandsByVersion = {
  [BOOTSTRAP_VERSION]: bootstrap,
  '0.1': v0_1,
  '0.2': v0_2,
  '0.3': v0_3,
  '0.4': v0_4,
  '0.5': v0_5,
  '0.6': v0_6,
  '0.7': v0_7,
  '0.8': v0_8,
  '0.9': v0_9,
  '0.10': v0_10,
  '0.11': v0_11,
  '0.12': v0_12,
  '0.13': v0_13,
  '0.14': v0_14,
  '0.15': v0_15,
  '0.16': v0_16,
  '0.17': v0_17,
  '0.18': v0_18,
  '0.19': v0_19,
  '0.20': v0_20,
  '0.21': v0_21,
} satisfies {
  [key in keyof PROTOBUF_VERSION_MAP]: new <
    V extends Version.AndUp<key & PROTOBUF_VERSION> | key,
  >(
    api: RpcApi<V>,
  ) => Commands<V>;
};

export function makeFromVersion<
  const Version extends keyof PROTOBUF_VERSION_MAP,
>(api: RpcApi<Version>): CommandsByVersion<Version> {
  const ctor = CommandsByVersion[api.version] as new (
    api: RpcApi<Version>,
  ) => CommandsByVersion<Version>;
  return new ctor(api);
}

export { Commands };
export default Commands;
