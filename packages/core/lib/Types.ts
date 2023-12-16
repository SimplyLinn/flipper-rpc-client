import type { PROTOBUF_VERSION_MAP } from '@flipper-rpc-client/versioned-protobuf';
import type Main from '@flipper-rpc-client/versioned-protobuf/Resolve/PB/Main';

export interface PatchedMainCtor<Version extends keyof PROTOBUF_VERSION_MAP> {
  /**
   * Constructs a new Main.
   * @param [properties] Properties to set
   */
  new (...params: Main.Parameters<Version>): Main<Version>;

  /**
   * Creates a new Main instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Main instance
   */
  create(properties?: Main.Options<Version>): Main<Version>;

  /**
   * Encodes the specified Main message. Does not implicitly {@link PatchedMainCtor.verify|verify} messages.
   * @param message Main message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  encode(
    message: Main.Options<Version>,
    writer?: protobuf.Writer,
  ): protobuf.Writer;

  /**
   * Encodes the specified Main message, length delimited. Does not implicitly {@link PatchedMainCtor.verify|verify} messages.
   * @param message Main message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  encodeDelimited(
    message: Main.Options<Version>,
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
  decode(reader: protobuf.Reader | Uint8Array, length?: number): Main<Version>;

  /**
   * Decodes a Main message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Main
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  decodeDelimited(reader: protobuf.Reader | Uint8Array): Main<Version>;

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
  fromObject(object: Record<string, any>): Main<Version>;

  /**
   * Creates a plain object from a Main message. Also converts values to other types if specified.
   * @param message Main
   * @param [options] Conversion options
   * @returns Plain object
   */
  toObject(
    message: Main<Version>,
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
  new (...params: Main.Parameters<Version>): Main<Version>;

  /**
   * Creates a new Main instance using the specified properties.
   * @param [properties] Properties to set
   * @returns Main instance
   */
  create(properties?: Main.Options<Version>): Main<Version>;

  /**
   * Encodes the specified Main message. Does not implicitly {@link PatchedMainCtor.verify|verify} messages.
   * @param message Main message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  encode(
    message: Main.Options<Version>,
    writer?: protobuf.Writer,
  ): protobuf.Writer;

  /**
   * Encodes the specified Main message, length delimited. Does not implicitly {@link PatchedMainCtor.verify|verify} messages.
   * @param message Main message or plain object to encode
   * @param [writer] Writer to encode to
   * @returns Writer
   */
  encodeDelimited(
    message: Main.Options<Version>,
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
  decode(reader: protobuf.Reader | Uint8Array, length?: number): Main<Version>;

  /**
   * Decodes a Main message from the specified reader or buffer, length delimited.
   * @param reader Reader or buffer to decode from
   * @returns Main
   * @throws {Error} If the payload is not a reader or valid buffer
   * @throws {$protobuf.util.ProtocolError} If required fields are missing
   */
  decodeDelimited(reader: protobuf.Reader | Uint8Array): Main<Version>;

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
  fromObject(object: Record<string, any>): Main<Version>;

  /**
   * Creates a plain object from a Main message. Also converts values to other types if specified.
   * @param message Main
   * @param [options] Conversion options
   * @returns Plain object
   */
  toObject(
    message: Main<Version>,
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
