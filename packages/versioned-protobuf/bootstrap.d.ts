import * as $protobuf from 'protobufjs';
import Long = require('long');
/** Namespace PB. */
export namespace PB {
  /** CommandStatus enum. */
  enum CommandStatus {
    OK = 0,
    ERROR = 1,
    ERROR_DECODE = 2,
    ERROR_NOT_IMPLEMENTED = 3,
    ERROR_BUSY = 4,
    ERROR_CONTINUOUS_COMMAND_INTERRUPTED = 14,
    ERROR_INVALID_PARAMETERS = 15,
  }

  /** Properties of an Empty. */
  interface IEmpty {}

  /** Represents an Empty. */
  class Empty implements IEmpty {
    /**
     * Constructs a new Empty.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB.IEmpty);

    /**
     * Creates a new Empty instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Empty instance
     */
    public static create(properties?: PB.IEmpty): PB.Empty;

    /**
     * Encodes the specified Empty message. Does not implicitly {@link PB.Empty.verify|verify} messages.
     * @param message Empty message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB.IEmpty,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified Empty message, length delimited. Does not implicitly {@link PB.Empty.verify|verify} messages.
     * @param message Empty message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB.IEmpty,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an Empty message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Empty
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB.Empty;

    /**
     * Decodes an Empty message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Empty
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB.Empty;

    /**
     * Verifies an Empty message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an Empty message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Empty
     */
    public static fromObject(object: { [k: string]: any }): PB.Empty;

    /**
     * Creates a plain object from an Empty message. Also converts values to other types if specified.
     * @param message Empty
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB.Empty,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this Empty to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Empty
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a StopSession. */
  interface IStopSession {}

  /** Represents a StopSession. */
  class StopSession implements IStopSession {
    /**
     * Constructs a new StopSession.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB.IStopSession);

    /**
     * Creates a new StopSession instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StopSession instance
     */
    public static create(properties?: PB.IStopSession): PB.StopSession;

    /**
     * Encodes the specified StopSession message. Does not implicitly {@link PB.StopSession.verify|verify} messages.
     * @param message StopSession message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB.IStopSession,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified StopSession message, length delimited. Does not implicitly {@link PB.StopSession.verify|verify} messages.
     * @param message StopSession message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB.IStopSession,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a StopSession message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns StopSession
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB.StopSession;

    /**
     * Decodes a StopSession message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns StopSession
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB.StopSession;

    /**
     * Verifies a StopSession message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a StopSession message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns StopSession
     */
    public static fromObject(object: { [k: string]: any }): PB.StopSession;

    /**
     * Creates a plain object from a StopSession message. Also converts values to other types if specified.
     * @param message StopSession
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB.StopSession,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this StopSession to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for StopSession
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a Main. */
  interface IMain {
    /** Main commandId */
    commandId?: number | null;

    /** Main commandStatus */
    commandStatus?: PB.CommandStatus | null;

    /** Main hasNext */
    hasNext?: boolean | null;

    /** Main empty */
    empty?: PB.IEmpty | null;

    /** Main stopSession */
    stopSession?: PB.IStopSession | null;

    /** Main systemPingRequest */
    systemPingRequest?: PB_System.IPingRequest | null;

    /** Main systemPingResponse */
    systemPingResponse?: PB_System.IPingResponse | null;

    /** Main systemDeviceInfoRequest */
    systemDeviceInfoRequest?: PB_System.IDeviceInfoRequest | null;

    /** Main systemDeviceInfoResponse */
    systemDeviceInfoResponse?: PB_System.IDeviceInfoResponse | null;
  }

  /** Represents a Main. */
  class Main implements IMain {
    /**
     * Constructs a new Main.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB.IMain);

    /** Main commandId. */
    public commandId: number;

    /** Main commandStatus. */
    public commandStatus: PB.CommandStatus;

    /** Main hasNext. */
    public hasNext: boolean;

    /** Main empty. */
    public empty?: PB.IEmpty | null;

    /** Main stopSession. */
    public stopSession?: PB.IStopSession | null;

    /** Main systemPingRequest. */
    public systemPingRequest?: PB_System.IPingRequest | null;

    /** Main systemPingResponse. */
    public systemPingResponse?: PB_System.IPingResponse | null;

    /** Main systemDeviceInfoRequest. */
    public systemDeviceInfoRequest?: PB_System.IDeviceInfoRequest | null;

    /** Main systemDeviceInfoResponse. */
    public systemDeviceInfoResponse?: PB_System.IDeviceInfoResponse | null;

    /** Main content. */
    public content?:
      | 'empty'
      | 'stopSession'
      | 'systemPingRequest'
      | 'systemPingResponse'
      | 'systemDeviceInfoRequest'
      | 'systemDeviceInfoResponse';

    /**
     * Creates a new Main instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Main instance
     */
    public static create(properties?: PB.IMain): PB.Main;

    /**
     * Encodes the specified Main message. Does not implicitly {@link PB.Main.verify|verify} messages.
     * @param message Main message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB.IMain,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified Main message, length delimited. Does not implicitly {@link PB.Main.verify|verify} messages.
     * @param message Main message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB.IMain,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a Main message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Main
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB.Main;

    /**
     * Decodes a Main message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Main
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB.Main;

    /**
     * Verifies a Main message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Main message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Main
     */
    public static fromObject(object: { [k: string]: any }): PB.Main;

    /**
     * Creates a plain object from a Main message. Also converts values to other types if specified.
     * @param message Main
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB.Main,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this Main to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Main
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }
}

/** Namespace PB_System. */
export namespace PB_System {
  /** Properties of a PingRequest. */
  interface IPingRequest {
    /** PingRequest data */
    data?: Uint8Array | null;
  }

  /** Represents a PingRequest. */
  class PingRequest implements IPingRequest {
    /**
     * Constructs a new PingRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IPingRequest);

    /** PingRequest data. */
    public data: Uint8Array;

    /**
     * Creates a new PingRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PingRequest instance
     */
    public static create(
      properties?: PB_System.IPingRequest,
    ): PB_System.PingRequest;

    /**
     * Encodes the specified PingRequest message. Does not implicitly {@link PB_System.PingRequest.verify|verify} messages.
     * @param message PingRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IPingRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified PingRequest message, length delimited. Does not implicitly {@link PB_System.PingRequest.verify|verify} messages.
     * @param message PingRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IPingRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a PingRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PingRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.PingRequest;

    /**
     * Decodes a PingRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PingRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.PingRequest;

    /**
     * Verifies a PingRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a PingRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PingRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.PingRequest;

    /**
     * Creates a plain object from a PingRequest message. Also converts values to other types if specified.
     * @param message PingRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.PingRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this PingRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for PingRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a PingResponse. */
  interface IPingResponse {
    /** PingResponse data */
    data?: Uint8Array | null;
  }

  /** Represents a PingResponse. */
  class PingResponse implements IPingResponse {
    /**
     * Constructs a new PingResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IPingResponse);

    /** PingResponse data. */
    public data: Uint8Array;

    /**
     * Creates a new PingResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PingResponse instance
     */
    public static create(
      properties?: PB_System.IPingResponse,
    ): PB_System.PingResponse;

    /**
     * Encodes the specified PingResponse message. Does not implicitly {@link PB_System.PingResponse.verify|verify} messages.
     * @param message PingResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IPingResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified PingResponse message, length delimited. Does not implicitly {@link PB_System.PingResponse.verify|verify} messages.
     * @param message PingResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IPingResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a PingResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PingResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.PingResponse;

    /**
     * Decodes a PingResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PingResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.PingResponse;

    /**
     * Verifies a PingResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a PingResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PingResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.PingResponse;

    /**
     * Creates a plain object from a PingResponse message. Also converts values to other types if specified.
     * @param message PingResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.PingResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this PingResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for PingResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a DeviceInfoRequest. */
  interface IDeviceInfoRequest {}

  /** Represents a DeviceInfoRequest. */
  class DeviceInfoRequest implements IDeviceInfoRequest {
    /**
     * Constructs a new DeviceInfoRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IDeviceInfoRequest);

    /**
     * Creates a new DeviceInfoRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DeviceInfoRequest instance
     */
    public static create(
      properties?: PB_System.IDeviceInfoRequest,
    ): PB_System.DeviceInfoRequest;

    /**
     * Encodes the specified DeviceInfoRequest message. Does not implicitly {@link PB_System.DeviceInfoRequest.verify|verify} messages.
     * @param message DeviceInfoRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IDeviceInfoRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified DeviceInfoRequest message, length delimited. Does not implicitly {@link PB_System.DeviceInfoRequest.verify|verify} messages.
     * @param message DeviceInfoRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IDeviceInfoRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a DeviceInfoRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DeviceInfoRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.DeviceInfoRequest;

    /**
     * Decodes a DeviceInfoRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DeviceInfoRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.DeviceInfoRequest;

    /**
     * Verifies a DeviceInfoRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a DeviceInfoRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DeviceInfoRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.DeviceInfoRequest;

    /**
     * Creates a plain object from a DeviceInfoRequest message. Also converts values to other types if specified.
     * @param message DeviceInfoRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.DeviceInfoRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this DeviceInfoRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for DeviceInfoRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a DeviceInfoResponse. */
  interface IDeviceInfoResponse {
    /** DeviceInfoResponse key */
    key?: string | null;

    /** DeviceInfoResponse value */
    value?: string | null;
  }

  /** Represents a DeviceInfoResponse. */
  class DeviceInfoResponse implements IDeviceInfoResponse {
    /**
     * Constructs a new DeviceInfoResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IDeviceInfoResponse);

    /** DeviceInfoResponse key. */
    public key: string;

    /** DeviceInfoResponse value. */
    public value: string;

    /**
     * Creates a new DeviceInfoResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DeviceInfoResponse instance
     */
    public static create(
      properties?: PB_System.IDeviceInfoResponse,
    ): PB_System.DeviceInfoResponse;

    /**
     * Encodes the specified DeviceInfoResponse message. Does not implicitly {@link PB_System.DeviceInfoResponse.verify|verify} messages.
     * @param message DeviceInfoResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IDeviceInfoResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified DeviceInfoResponse message, length delimited. Does not implicitly {@link PB_System.DeviceInfoResponse.verify|verify} messages.
     * @param message DeviceInfoResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IDeviceInfoResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a DeviceInfoResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DeviceInfoResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.DeviceInfoResponse;

    /**
     * Decodes a DeviceInfoResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DeviceInfoResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.DeviceInfoResponse;

    /**
     * Verifies a DeviceInfoResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a DeviceInfoResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DeviceInfoResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.DeviceInfoResponse;

    /**
     * Creates a plain object from a DeviceInfoResponse message. Also converts values to other types if specified.
     * @param message DeviceInfoResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.DeviceInfoResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this DeviceInfoResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for DeviceInfoResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }
}
