import type protobuf from 'protobufjs';
import type {
  LATEST_VERSION,
  PROTOBUF_VERSION,
  PROTOBUF_VERSIONS,
} from '@flipper-rpc-client/versioned-protobuf';
import type {
  VersionRange,
  AllVersionsInRange,
  ParsedVersionRange,
  ResolveOptions,
  ResolveMain,
  ResolveParameters,
} from '../Types.js';
import type { SUPPORTED_VERSIONS } from './constants.js';

export interface FunctionDeclaration<V extends VersionRange> {
  readonly [SUPPORTED_VERSIONS]: V;
  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly [key: string]: Function;
}

type VersionRangeCollectRecursive<
  T extends PROTOBUF_VERSION,
  Remaining extends readonly PROTOBUF_VERSION[],
  Collected extends readonly PROTOBUF_VERSION[] = [],
> = Remaining extends readonly [
  infer Q extends PROTOBUF_VERSION,
  ...infer R extends readonly PROTOBUF_VERSION[],
]
  ? Q extends T
    ? readonly [...Collected, Q]
    : VersionRangeCollectRecursive<T, R, readonly [...Collected, Q]>
  : // We reached the end of the list, so presumably we had an invalid
    // range ['0.5', '...', '0.3'].
    // This should be an empty tuple.
    [];

type VersionRangeSkipRecursive<
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
      : VersionRangeCollectRecursive<U, Remaining>
    : VersionRangeSkipRecursive<T, U, R>
  : [];

export type VersionRangeToTuple<
  T extends PROTOBUF_VERSION,
  U extends PROTOBUF_VERSION = LATEST_VERSION,
> = VersionRangeSkipRecursive<T, U>;

export type VersionMatchesRange<
  T extends PROTOBUF_VERSION,
  Range extends ParsedVersionRange,
  True = unknown,
  False = never,
> = T extends AllVersionsInRange<Range> ? True : False;

export interface PatchedMainCtor<Version extends VersionRange> {
  /**
   * Constructs a new Main.
   * @param [properties] Properties to set
   */
  new (...params: ResolveParameters<Version>): ResolveMain<Version>;

  /**
   * Creates a new Main instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Main instance
   */
  create(properties?: ResolveOptions<Version>): ResolveMain<Version>;

  /**
   * Encodes the specified Main message. Does not implicitly {@link PB.Main.verify|verify} messages.
   * @param message Main message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  encode(
    message: ResolveOptions<Version>,
    writer?: protobuf.Writer,
  ): protobuf.Writer;

  /**
   * Encodes the specified Main message, length delimited. Does not implicitly {@link PB.Main.verify|verify} messages.
   * @param message Main message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  encodeDelimited(
    message: ResolveOptions<Version>,
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
  ): ResolveMain<Version>;

  /**
   * Decodes a Main message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Main
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  decodeDelimited(reader: protobuf.Reader | Uint8Array): ResolveMain<Version>;

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
  fromObject(object: Record<string, any>): ResolveMain<Version>;

  /**
   * Creates a plain object from a Main message. Also converts values to other types if specified.
   * @param message Main
   * @param [options] Conversion options
   * @returns Plain object
   */
  toObject(
    message: ResolveMain<Version>,
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
