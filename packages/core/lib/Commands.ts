/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { PROTOBUF_VERSION } from '@flipper-rpc-client/versioned-protobuf';
import * as CoreApi from './Commands/Core.js';
import * as SystemApi from './Commands/System.js';
import * as StorageApi from './Commands/Storage.js';
import * as AppApi from './Commands/App.js';
import * as GuiApi from './Commands/Gui.js';

export { CoreApi, SystemApi, StorageApi, AppApi, GuiApi };

function entries<
  T extends Record<
    string,
    | readonly [Function, readonly PROTOBUF_VERSION[]]
    | readonly [
        readonly [Function, readonly PROTOBUF_VERSION[]],
        ...(readonly [Function, readonly PROTOBUF_VERSION[]])[],
      ]
  >,
>(
  o: T,
): {
  [key in keyof T]: [
    key,
    T[key] extends readonly [Function, readonly PROTOBUF_VERSION[]]
      ? [T[key]]
      : T[key],
  ];
}[keyof T][] {
  return Object.entries(o).map(([k, v]) => [
    k,
    typeof v[0] === 'function' ? [v] : v,
  ]) as any;
}

export const apiDefs = [
  ...entries(CoreApi),
  ...entries(SystemApi),
  ...entries(StorageApi),
  ...entries(AppApi),
  ...entries(GuiApi),
];

export type ApiInterfaceByVersionMap = {
  [Version in PROTOBUF_VERSION]: (typeof apiDefs)[number] extends infer T
    ? T extends readonly [
        infer Name extends string,
        // eslint-disable-next-line @typescript-eslint/ban-types
        infer Fns extends readonly (readonly [
          Function,
          readonly PROTOBUF_VERSION[],
        ])[],
      ]
      ? {
          [key in keyof Fns]: Fns[key] extends readonly [
            infer Fn extends Function,
            infer SUPPORTED_VERSIONS extends readonly PROTOBUF_VERSION[],
          ]
            ? Version extends SUPPORTED_VERSIONS[number]
              ? {
                  [key2 in Name]: Fn;
                }
              : never
            : never;
        }[number]
      : never
    : never extends infer U
      ? (U extends any ? (k: U) => void : never) extends (k: infer I) => void
        ? { [key in keyof I]: I[key] }
        : never
      : never;
};