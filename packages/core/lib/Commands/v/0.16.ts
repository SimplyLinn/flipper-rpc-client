import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import type { PROTOBUF_VERSION } from '@flipper-rpc-client/versioned-protobuf';
import { CleanName, CmdsByVersion, apiDefs } from './_utils.js';
import RpcApi from '../../RpcApi.js';

const Version = '0.16' satisfies PROTOBUF_VERSION;
type Version = typeof Version;

declare const ThisVersion: CmdsByVersion[Version];
type ThisVersion = typeof ThisVersion<Version>;

export function CommandsV0_16(api: RpcApi<Version>) {
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
    [key in CmdsByVersion[Version]['name']]: (
      ...args: Parameters<
        CleanName<Extract<ThisVersion, { readonly name: key }>>
      >
    ) => ReturnType<CleanName<Extract<ThisVersion, { readonly name: key }>>>;
  };
}

export type CommandsV0_16 = ReturnType<typeof CommandsV0_16>;

export default CommandsV0_16;
