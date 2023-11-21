import type {
  LATEST_VERSION,
  PROTOBUF_VERSION,
  PROTOBUF_VERSION_MAP,
} from '@flipper-rpc-client/versioned-protobuf';
import type { VersionRangeToTuple } from './_internal/types.js';

export type ResolveVersion<Version extends VersionRange> =
  PROTOBUF_VERSION_MAP[AllVersionsInRange<ParseVersionRange<Version>>];

export type ResolveMainCtor<Version extends VersionRange> =
  ResolveVersion<Version>['PB']['Main'];

export type ResolveMain<Version extends VersionRange> = InstanceType<
  ResolveVersion<Version>['PB']['Main']
>;

export type ResolveParameters<Version extends VersionRange> =
  ConstructorParameters<ResolveMainCtor<Version>>;

export type ResolveOptions<Version extends VersionRange> = NonNullable<
  ResolveParameters<Version>[0]
>;

export type VersionRange = ParsedVersionRange | [PROTOBUF_VERSION, '...'];

export type ParsedVersionRange =
  | readonly PROTOBUF_VERSION[]
  | readonly [PROTOBUF_VERSION, '...', PROTOBUF_VERSION]
  | PROTOBUF_VERSION;

export type ParseVersionRange<T extends VersionRange> =
  T extends ParsedVersionRange
    ? T
    : T extends [PROTOBUF_VERSION, '...']
      ? [T[0], '...', LATEST_VERSION]
      : never;

export type AllVersionsInRange<Range extends ParsedVersionRange> =
  ParsedVersionRange extends Range
    ? PROTOBUF_VERSION
    : Range extends PROTOBUF_VERSION[]
      ? Range[number]
      : Range extends PROTOBUF_VERSION
        ? Range
        : Range extends [PROTOBUF_VERSION, '...']
          ? VersionRangeToTuple<Range[0]>[number]
          : Range extends [PROTOBUF_VERSION, '...', PROTOBUF_VERSION]
            ? VersionRangeToTuple<Range[0], Range[2]>[number]
            : never;

export type DefaultMainParams<Version extends VersionRange> =
  NonNullable<unknown> extends ResolveOptions<Version>
    ? [
        defaultMainProperties?: {
          [key in keyof Omit<
            ResolveOptions<Version>,
            'commandId' | 'hasNext'
          >]: ResolveOptions<Version>[key];
        },
      ]
    : [
        defaultMainProperties: {
          [key in keyof Omit<
            ResolveOptions<Version>,
            'commandId' | 'hasNext'
          >]: ResolveOptions<Version>[key];
        },
      ];
