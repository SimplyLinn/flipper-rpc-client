/* eslint-disable @typescript-eslint/no-explicit-any */
import { PROTOBUF_VERSION } from '@flipper-rpc-client/versioned-protobuf';
import { SUPPORTED_VERSIONS } from '../_internal/constants.js';
import { VersionRange } from '../Types.js';
import { SystemApi } from './System.js';
import { CoreApi } from './Core.js';
import {
  FunctionDeclaration,
  VersionMatchesRange,
} from '../_internal/types.js';

/**
 * Workaround for
 * > Exported variable 'fns' has or is using name 'SUPPORTED_VERSIONS' from external module "[./Core.ts](./Core.ts)" but cannot be named.
 * > ts(4023)
 *
 * if you can replace the `a(...Api1, ...Api2)` with `[...Api1, ...Api2] as const` you can safely remove this function.
 */
function a<
  T extends readonly { readonly [SUPPORTED_VERSIONS]: VersionRange }[],
>(
  ...args: T
): Readonly<{
  [key in keyof T]: {
    readonly [SUPPORTED_VERSIONS]: T[key][SUPPORTED_VERSIONS];
  } & {
    readonly [key2 in keyof Omit<T[key], SUPPORTED_VERSIONS>]: Omit<
      T[key],
      SUPPORTED_VERSIONS
    >[key2];
  } extends infer U
    ? { readonly [key2 in keyof U]: U[key2] }
    : never;
}> {
  return args as any;
}

export const apiDefs = a(...CoreApi, ...SystemApi);

type CleanupInterface<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? {
      [key in Exclude<keyof I, SUPPORTED_VERSIONS>]: I[key];
    }
  : never;

type ApiInterfaceByVersionMap_impl<T extends readonly unknown[]> = {
  [Version in PROTOBUF_VERSION]: CleanupInterface<
    {
      [key in keyof T]: T[key] extends FunctionDeclaration<any>
        ? VersionMatchesRange<Version, T[key][SUPPORTED_VERSIONS], T[key]>
        : never;
    }[number]
  >;
};

export type ApiInterfaceByVersionMap = ApiInterfaceByVersionMap_impl<
  typeof apiDefs
>;
