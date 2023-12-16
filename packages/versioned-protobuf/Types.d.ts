import type {
  LATEST_VERSION,
  PROTOBUF_VERSION,
  PROTOBUF_VERSIONS,
} from './index.js';

export namespace Version {
  type RangeCollectRecursive<
    T extends PROTOBUF_VERSION,
    Remaining extends readonly PROTOBUF_VERSION[],
    Collected extends readonly PROTOBUF_VERSION[] = [],
  > = Remaining extends readonly [
    infer Q extends PROTOBUF_VERSION,
    ...infer R extends readonly PROTOBUF_VERSION[],
  ]
    ? Q extends T
      ? readonly [...Collected, Q]
      : RangeCollectRecursive<T, R, readonly [...Collected, Q]>
    : // We reached the end of the list, so presumably we had an invalid
      // range ['0.5', '...', '0.3'].
      // This should be an empty tuple.
      [];

  type RangeSkipRecursive<
    T extends PROTOBUF_VERSION,
    U extends PROTOBUF_VERSION,
    Remaining extends readonly PROTOBUF_VERSION[] = typeof PROTOBUF_VERSIONS,
  > = Remaining extends readonly [
    infer Q,
    ...infer R extends readonly PROTOBUF_VERSION[],
  ]
    ? Q extends T
      ? // We don't want to include the latest version in the range
        // so we exclude it from the result.
        // Wrap U in Exclude to prevent unions to be exploded, generating unions of tuple ranges.
        Exclude<U, never> extends LATEST_VERSION
        ? readonly [Q, ...R]
        : RangeCollectRecursive<U, Remaining>
      : RangeSkipRecursive<T, U, R>
    : [];

  type UpMap = {
    [key1 in PROTOBUF_VERSION]: RangeSkipRecursive<
      key1,
      LATEST_VERSION
    >[number];
  };

  type DownMap = {
    [key1 in PROTOBUF_VERSION]: Exclude<PROTOBUF_VERSION, UpMap[key1]> | key1;
  };

  export type AndUp<V extends PROTOBUF_VERSION> = UpMap[V];
  export type AndDown<V extends PROTOBUF_VERSION> = DownMap[V];
  export type Between<
    MinV extends PROTOBUF_VERSION,
    MaxV extends PROTOBUF_VERSION,
  > = Exclude<UpMap[MinV], Exclude<UpMap[MaxV], MaxV>>;
}
