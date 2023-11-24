import {
  PROTOBUF_VERSION,
  PROTOBUF_VERSIONS,
} from '@flipper-rpc-client/versioned-protobuf';
import type RpcApi from '../RpcApi.js';
import { versionAndDown, versionAndUp, versionBetween } from '../Utils.js';
import type { Version } from '../Types.js';

type ReverseMap = {
  [key in PROTOBUF_VERSION]: key extends `${infer Ma}.${infer Mi}`
    ? `v${Digits<Ma>}_${Digits<Mi>}` extends never
      ? key
      : `v${Digits<Ma>}_${Digits<Mi>}` extends PROTOBUF_VERSION
        ? never
        : `v${Digits<Ma>}_${Digits<Mi>}`
    : key;
};

type AndUpFn<MinV extends PROTOBUF_VERSION> = <
  const T extends <V extends Version.AndUp<MinV> = Version.AndUp<MinV>>(
    this: RpcApi<V>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => any,
>(
  fn: T,
) => readonly [
  fn: T,
  SUPPORTED_PROTOCOL_VERSIONS: readonly Version.AndUp<MinV>[],
];

type AndDownFn<MaxV extends PROTOBUF_VERSION> = <
  const T extends <V extends Version.AndDown<MaxV> = Version.AndDown<MaxV>>(
    this: RpcApi<V>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => any,
>(
  fn: T,
) => readonly [
  fn: T,
  SUPPORTED_PROTOCOL_VERSIONS: readonly Version.AndDown<MaxV>[],
];

type FromToFn<MinV extends PROTOBUF_VERSION, MaxV extends PROTOBUF_VERSION> = <
  const T extends <
    V extends Version.Between<MinV, MaxV> = Version.Between<MinV, MaxV>,
  >(
    this: RpcApi<V>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => any,
>(
  fn: T,
) => readonly [
  fn: T,
  SUPPORTED_PROTOCOL_VERSIONS: readonly Version.Between<MinV, MaxV>[],
];

// Parse all versions in the format /^(\d+).(\d+)$/ to 'v$1_$2'
type ParsedVersion = ReverseMap[PROTOBUF_VERSION];
type VersionMap = {
  [key in ParsedVersion]: key extends PROTOBUF_VERSION
    ? key
    : key extends `v${infer Ma}_${infer Mi}`
      ? Extract<PROTOBUF_VERSION, `${Ma}.${Mi}`>
      : never;
};
export const cmd: (<
  const SV extends readonly PROTOBUF_VERSION[],
  const T extends <V extends SV[number] = SV[number]>(
    this: RpcApi<V>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => any,
>(
  version: SV,
  fn: T,
) => T & {
  readonly SUPPORTED_PROTOCOL_VERSIONS: readonly PROTOBUF_VERSION[];
}) & {
  [key in ParsedVersion]: {
    <
      const T extends <V extends VersionMap[key] = VersionMap[key]>(
        this: RpcApi<V>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...args: any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => any,
    >(
      fn: T,
    ): T & {
      readonly SUPPORTED_PROTOCOL_VERSIONS: readonly [VersionMap[key]];
    };
    andUp: AndUpFn<VersionMap[key]>;
    andDown: AndDownFn<VersionMap[key]>;
    to: {
      [key2 in ReverseMap[Version.AndUp<VersionMap[key]>]]: FromToFn<
        VersionMap[key],
        VersionMap[key2]
      >;
    };
  };
} = function cmd<const SV extends readonly PROTOBUF_VERSION[]>(version: SV) {
  return <
    const T extends <V extends SV[number] = SV[number]>(
      this: RpcApi<V>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...args: any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => any,
  >(
    fn: T,
  ) => {
    return Object.defineProperty(fn, 'SUPPORTED_PROTOCOL_VERSIONS', {
      value: Object.freeze(version),
      writable: false,
      enumerable: false,
      configurable: false,
    }) as typeof fn & {
      readonly SUPPORTED_PROTOCOL_VERSIONS: readonly PROTOBUF_VERSION[];
    };
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const versionSet = new Set<string>(PROTOBUF_VERSIONS);

type TypedPropertyDescriptorMap<T extends Record<string | symbol, unknown>> = {
  [key in keyof T]: TypedPropertyDescriptor<T[key]>;
};

function createNull<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Props extends PropertyDescriptorMap,
>(
  props: Props,
): {
  [key in keyof Props]: Props[key] extends TypedPropertyDescriptor<infer T>
    ? T
    : unknown;
};
function createNull(props: PropertyDescriptorMap) {
  return Object.create(null, props);
}

type Digits<T extends string> = T extends `${infer First extends
  bigint}${infer Rest}`
  ? `${1}${Rest}` extends `${bigint}`
    ? `${First}${Rest}`
    : never
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromEntries<const T extends readonly (readonly [PropertyKey, any])[]>(
  entries: T,
) {
  return Object.fromEntries(entries) as {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key in T[number][0]]: Extract<T[number], readonly [key, any]>[1];
  };
}

Object.defineProperties(
  cmd,
  fromEntries(
    PROTOBUF_VERSIONS.map((v1) => {
      let k1: ParsedVersion;
      const match = v1.match(/^(\d+)\.(\d+)$/);
      if (match != null) {
        k1 = `v${match[1]}_${match[2]}` as ParsedVersion;
        // If a collision occurs, with an explicit version, we don't want to
        // overwrite the existing version. To ensure sane types and knowable state.
        if (versionSet.has(k1)) {
          return null;
        }
      } else {
        k1 = v1 as ParsedVersion;
      }
      return [
        k1,
        {
          get() {
            const v1_value: {
              andUp: AndUpFn<typeof v1>;
              andDown: AndDownFn<typeof v1>;
              to: {
                [key2 in ReverseMap[Version.AndUp<typeof v1>]]: FromToFn<
                  typeof v1,
                  key2 & Version.AndUp<typeof v1>
                >;
              };
            } = createNull<
              TypedPropertyDescriptorMap<{
                andUp: AndUpFn<typeof v1>;
                andDown: AndDownFn<typeof v1>;
                to: {
                  [key2 in ReverseMap[Version.AndUp<typeof v1>]]: FromToFn<
                    typeof v1,
                    key2 & Version.AndUp<typeof v1>
                  >;
                };
              }>
            >({
              andUp: {
                value: function andUp(fn) {
                  const versions = Object.freeze(versionAndUp(v1));
                  return Object.freeze([fn, versions]);
                },
                writable: false,
                enumerable: true,
                configurable: true,
              },
              andDown: {
                value: function andDown(fn) {
                  const versions = Object.freeze(versionAndDown(v1));
                  return Object.freeze([fn, versions]);
                },
                writable: false,
                enumerable: true,
                configurable: true,
              },
              to: {
                get() {
                  const v2_value = createNull<
                    TypedPropertyDescriptorMap<(typeof v1_value)['to']>
                  >(
                    fromEntries(
                      versionAndUp(v1)
                        .map(
                          (
                            v2,
                          ):
                            | [
                                keyof (typeof v1_value)['to'],
                                FromToFn<typeof v1, Version.AndUp<typeof v1>>,
                              ]
                            | null => {
                            const toFn = ((
                              ...[fn]: Parameters<
                                FromToFn<typeof v1, Version.AndUp<typeof v1>>
                              >
                            ) => {
                              const versions = Object.freeze(
                                versionBetween(v1, v2),
                              );
                              return Object.freeze([fn, versions]);
                            }) as FromToFn<typeof v1, Version.AndUp<typeof v1>>;
                            let k2: ParsedVersion;
                            const match = v2.match(/^(\d+)\.(\d+)$/);
                            if (match != null) {
                              k2 = `v${match[1]}_${match[2]}` as ParsedVersion;
                              // If a collision occurs, with an explicit version, we don't want to
                              // overwrite the existing version. To ensure sane types and knowable state.
                              if (versionSet.has(k2)) {
                                return null;
                              }
                            } else {
                              k2 = v2 as ParsedVersion;
                            }
                            return [k2, toFn];
                          },
                        )
                        .filter((e): e is NonNullable<typeof e> => e != null),
                    ),
                  );
                  Object.defineProperty(v1_value, 'to', {
                    value: v2_value,
                    writable: false,
                    enumerable: true,
                    configurable: true,
                  });
                  return v2_value;
                },
                enumerable: true,
                configurable: true,
              },
            });
            Object.defineProperty(cmd, k1, {
              value: v1_value,
              writable: false,
              enumerable: true,
              configurable: true,
            });
            return v1_value;
          },
          enumerable: true,
          configurable: true,
        },
      ] as const;
    }).filter((e): e is NonNullable<typeof e> => e != null),
  ),
);
