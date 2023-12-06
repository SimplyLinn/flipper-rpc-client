import type * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import {
  BOOTSTRAP_VERSION,
  PROTOBUF_VERSION_MAP,
} from '@flipper-rpc-client/versioned-protobuf';
import * as Commands from './Commands/v/index.js';
import type RpcApi from './RpcApi.js';

export type CommandsByVersion<Version extends keyof PROTOBUF_VERSION_MAP> =
  Version extends BOOTSTRAP_VERSION
    ? (typeof Commands)['bootstrap']
    : Version extends `${infer Ma}.${infer Mi}`
      ? `1${Ma}0.1${Mi}0` extends `${bigint}.${bigint}`
        ? `v${Ma}_${Mi}` extends keyof typeof Commands
          ? ReturnType<(typeof Commands)[`v${Ma}_${Mi}`]>
          : never
        : never
      : never;

function versionToKey<V extends keyof PROTOBUF_VERSION_MAP>(
  version: V,
): V extends BOOTSTRAP_VERSION
  ? 'bootstrap'
  : V extends `${infer Ma}.${infer Mi}`
    ? `1${Ma}0.1${Mi}0` extends `${bigint}.${bigint}`
      ? `v${Ma}_${Mi}` extends keyof typeof Commands
        ? `v${Ma}_${Mi}`
        : never
      : never
    : never {
  if (version === BOOTSTRAP_VERSION) {
    return 'bootstrap' as never;
  }
  if (typeof version !== 'string') {
    throw new Error(`Invalid version ${String(version)}`);
  }
  const match = version.match(/^(\d+)\.(\d+)$/);
  if (match == null) {
    throw new Error(`Invalid version ${version}`);
  }
  const [, ma, mi] = match;
  return `v${ma}_${mi}` as never;
}

export function makeFromVersion<Version extends keyof PROTOBUF_VERSION_MAP>(
  api: RpcApi<Version>,
) {
  return (
    Commands[versionToKey(api.version)] as unknown as (
      api: RpcApi<Version>,
    ) => CommandsByVersion<Version>
  )(api);
}

export { Commands };
export default Commands;
