/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PROTOBUF_VERSION,
  PROTOBUF_VERSIONS,
} from '@flipper-rpc-client/versioned-protobuf';
import type RpcApi from '../RpcApi.js';
import { versionAndDown, versionAndUp, versionBetween } from '../Utils.js';
import type { Version } from '../Types.js';
import { ResolvePropertyMap } from './PropertyDescriptorTypes.js';

type Digits<T extends string> = T extends `${infer First extends
  bigint}${infer Rest}`
  ? `${1}${Rest}` extends `${bigint}`
    ? `${First}${Rest}`
    : never
  : never;

type ReverseMap = {
  [key in PROTOBUF_VERSION]: key extends `${infer Ma}.${infer Mi}`
    ? `v${Digits<Ma>}_${Digits<Mi>}` extends never
      ? key
      : `v${Digits<Ma>}_${Digits<Mi>}` extends PROTOBUF_VERSION
        ? never
        : `v${Digits<Ma>}_${Digits<Mi>}`
    : key;
};

type CmdFn<Versions extends PROTOBUF_VERSION> = <V extends Versions = Versions>(
  this: RpcApi<V>,
  ...args: any
) => any;

const versionSet = new Set<string>(PROTOBUF_VERSIONS);

function createNull<Props extends PropertyDescriptorMap>(
  props: Props,
): ResolvePropertyMap<Props>;
function createNull(props: PropertyDescriptorMap) {
  return Object.create(null, props);
}

function fromEntries<const T extends readonly (readonly [PropertyKey, any])[]>(
  entries: T,
) {
  return Object.fromEntries(entries) as {
    [key in T[number][0]]: Extract<T[number], readonly [key, any]>[1];
  };
}

function defineProperties<
  const T extends NonNullable<unknown>,
  const U extends PropertyDescriptorMap,
>(obj: T, props: U) {
  return Object.defineProperties(obj, props) as T & ResolvePropertyMap<U>;
}

function mkToVersionDescriptor<
  const MinV extends PROTOBUF_VERSION,
  const MaxV extends PROTOBUF_VERSION,
>(minV: MinV, maxV: MaxV) {
  const { [maxV]: fn } = {
    [maxV]: function <const T extends CmdFn<Version.Between<MinV, MaxV>>>(
      fn: T,
    ) {
      const versions = Object.freeze(versionBetween(minV, maxV));
      return Object.freeze([fn, versions] as const);
    },
  };
  return {
    value: fn,
    writable: false,
    enumerable: true,
    configurable: true,
  };
}

function mkToVersionEntry<
  const MinV extends PROTOBUF_VERSION,
  const MaxV extends PROTOBUF_VERSION,
>(minV: MinV, maxV: MaxV) {
  let key: ReverseMap[MaxV];
  const match = maxV.match(/^(\d+)\.(\d+)$/);
  if (match != null) {
    key = `v${match[1]}_${match[2]}` as ReverseMap[MaxV];
    // If a collision occurs, with an explicit version, we don't want to
    // overwrite the existing version. To ensure sane types and knowable state.
    if (versionSet.has(key)) {
      return null;
    }
  } else {
    key = maxV as ReverseMap[MaxV];
  }
  return [key, mkToVersionDescriptor(minV, maxV)] as MaxV extends any
    ? [ReverseMap[MaxV], ReturnType<typeof mkToVersionDescriptor<MinV, MaxV>>]
    : never;
}

function mkVersionDescriptor<const Version extends PROTOBUF_VERSION>(
  version: Version,
  key: ReverseMap[Version],
) {
  return {
    get() {
      const value = createNull({
        andUp: {
          value: function andUp<const T extends CmdFn<Version.AndUp<Version>>>(
            fn: T,
          ) {
            const versions = Object.freeze(versionAndUp(version));
            return Object.freeze([fn, versions] as const);
          },
          writable: false,
          enumerable: true,
          configurable: true,
        },
        andDown: {
          value: function andDown<
            const T extends CmdFn<Version.AndDown<Version>>,
          >(fn: T) {
            const versions = Object.freeze(versionAndDown(version));
            return Object.freeze([fn, versions] as const);
          },
          writable: false,
          enumerable: true,
          configurable: true,
        },
        to: {
          get() {
            const toValue = createNull(
              fromEntries(
                versionAndUp(version)
                  .map((maxVersion) => mkToVersionEntry(version, maxVersion))
                  .filter((e): e is NonNullable<typeof e> => e != null),
              ),
            );
            Object.defineProperty(value, 'to', {
              value: toValue,
              writable: false,
              enumerable: true,
              configurable: true,
            });
            return toValue;
          },
          enumerable: true,
          configurable: true,
        },
      });
      Object.defineProperty(cmd, key, {
        value: value,
        writable: false,
        enumerable: true,
        configurable: true,
      });
      return value;
    },
    enumerable: true,
    configurable: true,
  };
}

function mkVersionEntry<const Version extends PROTOBUF_VERSION>(
  version: Version,
) {
  let key: ReverseMap[Version];
  const match = version.match(/^(\d+)\.(\d+)$/);
  if (match != null) {
    key = `v${match[1]}_${match[2]}` as ReverseMap[Version];
    // If a collision occurs, with an explicit version, we don't want to
    // overwrite the existing version. To ensure sane types and knowable state.
    if (versionSet.has(key)) {
      return null;
    }
  } else {
    key = version as ReverseMap[Version];
  }
  return [key, mkVersionDescriptor(version, key)] as Version extends any
    ? [ReverseMap[Version], ReturnType<typeof mkVersionDescriptor<Version>>]
    : never;
}

export const cmd = defineProperties(
  function cmd<
    const T extends CmdFn<SV[number]>,
    const SV extends readonly PROTOBUF_VERSION[],
  >(fn: T, providedVersions: SV) {
    const versions = Object.freeze([...providedVersions]);
    return [fn, versions] as const;
  },
  fromEntries(
    PROTOBUF_VERSIONS.map((v) => mkVersionEntry(v)).filter(
      (e): e is NonNullable<typeof e> => e != null,
    ),
  ),
);
