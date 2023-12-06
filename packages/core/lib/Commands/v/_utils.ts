/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import * as CoreApi from '../Core.js';
import * as SystemApi from '../System.js';
import * as StorageApi from '../Storage.js';
import * as AppApi from '../App.js';
import * as GuiApi from '../Gui.js';
import type { PROTOBUF_VERSION } from '@flipper-rpc-client/versioned-protobuf';
import type RpcApi from '../../RpcApi.js';

type MapTuple<
  Key extends PropertyKey,
  T extends readonly [Function, unknown],
> = {
  [key in keyof T]: key extends '0' ? T[0] & { name: Key } : T[key];
};

type MapArr<
  Key extends PropertyKey,
  T extends readonly (readonly [Function, unknown])[],
> = {
  [key in keyof T]: MapTuple<Key, T[key]>;
};

type CmdEntry<V, T> = V extends any ? [V, T] : never;

type ExplodeFnEntry<T> = T extends any
  ? T extends (this: RpcApi<infer Q>, ...args: any) => any
    ? CmdEntry<Q, T>
    : never
  : never;

export type CmdsByVersion = {
  [key in ExplodeFnEntry<
    (typeof apiDefs)[keyof typeof apiDefs][number][0]
  >[0]]: Extract<
    ExplodeFnEntry<(typeof apiDefs)[keyof typeof apiDefs][number][0]>,
    readonly [key, unknown]
  >[1];
};

function normalize<
  const T extends Record<
    string,
    | readonly (readonly [Function, readonly PROTOBUF_VERSION[]])[]
    | readonly [Function, readonly PROTOBUF_VERSION[]]
  >,
>(o: T) {
  Object.entries(o).forEach(([key, val]) => {
    if (val.length === 0) return;
    if (!Array.isArray(val[0])) {
      o[key as keyof T] = [val] as any;
    }
  });
  return o as unknown as {
    readonly [key in keyof T]: T[key] extends readonly [
      Function,
      readonly PROTOBUF_VERSION[],
    ]
      ? MapArr<key, [T[key]]>
      : T[key] extends readonly (readonly [Function, unknown])[]
        ? MapArr<key, T[key]>
        : never;
  };
}

const rawDefs = {
  ...CoreApi,
  ...SystemApi,
  ...StorageApi,
  ...AppApi,
  ...GuiApi,
} as const;

export const apiDefs = normalize(rawDefs);

export type CleanName<T extends (...args: any) => any> = (...args: Parameters<T>) => ReturnType<T>;
