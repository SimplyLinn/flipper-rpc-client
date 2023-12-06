import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import type { PROTOBUF_VERSION } from '@flipper-rpc-client/versioned-protobuf';
import { CmdsByVersion, apiDefs } from './_utils.js';
import RpcApi from '../../RpcApi.js';

const Version = '0.1' satisfies PROTOBUF_VERSION;
type Version = typeof Version;

export function CommandsV0_1(api: RpcApi<Version>) {
  const thisVersion: CmdsByVersion[Version] = {} as any;
  return Object.fromEntries(
    Object.entries(apiDefs)
      .map(([key, val]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const suppertedImpl = (val as any[]).find(([, supportedVersions]) =>
          (supportedVersions as readonly string[]).includes(Version),
        )?.[0];
        if (suppertedImpl == null) {
          return null;
        }
        return [key, suppertedImpl.bind(api)] as const;
      })
      .filter((f): f is NonNullable<typeof f> => f != null),
  ) as {
    [key in CmdsByVersion[Version]['name']]: Extract<
      typeof thisVersion<Version>,
      { readonly name: key }
    > extends (...hatt: infer A extends readonly [any, ...any[]]) => infer R
      ? (...A: A) => R
      : never;
  };
}

export type Test = (...ARGS: [a: 4]) => null;

export type CommandsV0_1 = ReturnType<typeof CommandsV0_1>;

export default CommandsV0_1;
