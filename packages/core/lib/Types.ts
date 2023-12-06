import type {
  LATEST_VERSION,
  PROTOBUF_VERSION,
  PROTOBUF_VERSIONS,
  PROTOBUF_VERSION_MAP,
} from '@flipper-rpc-client/versioned-protobuf';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Resolve {
  export type Version<V extends keyof PROTOBUF_VERSION_MAP> =
    PROTOBUF_VERSION_MAP[V];

  export type MainCtor<V extends keyof PROTOBUF_VERSION_MAP> =
    Version<V>['PB']['Main'];

  export type Main<V extends keyof PROTOBUF_VERSION_MAP> = InstanceType<
    MainCtor<V>
  >;

  export type CommandStatus<V extends keyof PROTOBUF_VERSION_MAP> =
    Version<V>['PB']['CommandStatus'];

  export type Parameters<V extends keyof PROTOBUF_VERSION_MAP> =
    ConstructorParameters<MainCtor<V>>;

  export type Options<V extends keyof PROTOBUF_VERSION_MAP> = NonNullable<
    Parameters<V>[0]
  >;

  export type DefaultMainParams<V extends keyof PROTOBUF_VERSION_MAP> =
    NonNullable<unknown> extends Options<V>
      ? [defaultMainProperties?: Options<V>]
      : [defaultMainProperties: Options<V>];
}

// eslint-disable-next-line @typescript-eslint/no-namespace
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

export interface PatchedMainCtor<Version extends keyof PROTOBUF_VERSION_MAP> {
  /**
   * Constructs a new Main.
   * @param [properties] Properties to set
   */
  new (...params: Resolve.Parameters<Version>): Resolve.Main<Version>;

  /**
   * Creates a new Main instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Main instance
   */
  create(properties?: Resolve.Options<Version>): Resolve.Main<Version>;

  /**
   * Encodes the specified Main message. Does not implicitly {@link PatchedMainCtor.verify|verify} messages.
   * @param message Main message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  encode(
    message: Resolve.Options<Version>,
    writer?: protobuf.Writer,
  ): protobuf.Writer;

  /**
   * Encodes the specified Main message, length delimited. Does not implicitly {@link PatchedMainCtor.verify|verify} messages.
   * @param message Main message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  encodeDelimited(
    message: Resolve.Options<Version>,
    writer?: protobuf.Writer,
  ): protobuf.Writer;

  /**
   * Decodes a Main message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Main
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  decode(
    reader: protobuf.Reader | Uint8Array,
    length?: number,
  ): Resolve.Main<Version>;

  /**
   * Decodes a Main message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Main
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  decodeDelimited(reader: protobuf.Reader | Uint8Array): Resolve.Main<Version>;

  /**
   * Verifies a Main message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verify(message: Record<string, any>): string | null;

  /**
   * Creates a Main message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Main
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fromObject(object: Record<string, any>): Resolve.Main<Version>;

  /**
   * Creates a plain object from a Main message. Also converts values to other types if specified.
   * @param message Main
   * @param [options] Conversion options
   * @returns Plain object
   */
  toObject(
    message: Resolve.Main<Version>,
    options?: protobuf.IConversionOptions,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Record<string, any>;

  /**
   * Gets the default type url for Main
   * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns The default type url
   */
  getTypeUrl(typeUrlPrefix?: string): string;
}

export interface PatchedSystemCtor<Version extends keyof PROTOBUF_VERSION_MAP> {
  /**
   * Constructs a new Main.
   * @param [properties] Properties to set
   */
  new (...params: Resolve.Parameters<Version>): Resolve.Main<Version>;

  /**
   * Creates a new Main instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Main instance
   */
  create(properties?: Resolve.Options<Version>): Resolve.Main<Version>;

  /**
   * Encodes the specified Main message. Does not implicitly {@link PatchedMainCtor.verify|verify} messages.
   * @param message Main message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  encode(
    message: Resolve.Options<Version>,
    writer?: protobuf.Writer,
  ): protobuf.Writer;

  /**
   * Encodes the specified Main message, length delimited. Does not implicitly {@link PatchedMainCtor.verify|verify} messages.
   * @param message Main message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  encodeDelimited(
    message: Resolve.Options<Version>,
    writer?: protobuf.Writer,
  ): protobuf.Writer;

  /**
   * Decodes a Main message from the specified reader or buffer.
   * @param reader Reader or buffer to decode from
   * @param [length] Message length if known beforehand
   * @returns Main
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  decode(
    reader: protobuf.Reader | Uint8Array,
    length?: number,
  ): Resolve.Main<Version>;

  /**
   * Decodes a Main message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Main
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  decodeDelimited(reader: protobuf.Reader | Uint8Array): Resolve.Main<Version>;

  /**
   * Verifies a Main message.
   * @param message Plain object to verify
   * @returns `null` if valid, otherwise the reason why it is not
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verify(message: Record<string, any>): string | null;

  /**
   * Creates a Main message from a plain object. Also converts values to their respective internal types.
   * @param object Plain object
   * @returns Main
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fromObject(object: Record<string, any>): Resolve.Main<Version>;

  /**
   * Creates a plain object from a Main message. Also converts values to other types if specified.
   * @param message Main
   * @param [options] Conversion options
   * @returns Plain object
   */
  toObject(
    message: Resolve.Main<Version>,
    options?: protobuf.IConversionOptions,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Record<string, any>;

  /**
   * Gets the default type url for Main
   * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
   * @returns The default type url
   */
  getTypeUrl(typeUrlPrefix?: string): string;
}
