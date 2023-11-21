import * as $protobuf from 'protobufjs';
import Long = require('long');
/** Namespace PB_App. */
export namespace PB_App {
  /** Properties of a StartRequest. */
  interface IStartRequest {
    /** StartRequest name */
    name?: string | null;

    /** StartRequest args */
    args?: string | null;
  }

  /** Represents a StartRequest. */
  class StartRequest implements IStartRequest {
    /**
     * Constructs a new StartRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_App.IStartRequest);

    /** StartRequest name. */
    public name: string;

    /** StartRequest args. */
    public args: string;

    /**
     * Creates a new StartRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StartRequest instance
     */
    public static create(
      properties?: PB_App.IStartRequest,
    ): PB_App.StartRequest;

    /**
     * Encodes the specified StartRequest message. Does not implicitly {@link PB_App.StartRequest.verify|verify} messages.
     * @param message StartRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_App.IStartRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified StartRequest message, length delimited. Does not implicitly {@link PB_App.StartRequest.verify|verify} messages.
     * @param message StartRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_App.IStartRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a StartRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns StartRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_App.StartRequest;

    /**
     * Decodes a StartRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns StartRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_App.StartRequest;

    /**
     * Verifies a StartRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a StartRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns StartRequest
     */
    public static fromObject(object: { [k: string]: any }): PB_App.StartRequest;

    /**
     * Creates a plain object from a StartRequest message. Also converts values to other types if specified.
     * @param message StartRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_App.StartRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this StartRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for StartRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a LockStatusRequest. */
  interface ILockStatusRequest {}

  /** Represents a LockStatusRequest. */
  class LockStatusRequest implements ILockStatusRequest {
    /**
     * Constructs a new LockStatusRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_App.ILockStatusRequest);

    /**
     * Creates a new LockStatusRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns LockStatusRequest instance
     */
    public static create(
      properties?: PB_App.ILockStatusRequest,
    ): PB_App.LockStatusRequest;

    /**
     * Encodes the specified LockStatusRequest message. Does not implicitly {@link PB_App.LockStatusRequest.verify|verify} messages.
     * @param message LockStatusRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_App.ILockStatusRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified LockStatusRequest message, length delimited. Does not implicitly {@link PB_App.LockStatusRequest.verify|verify} messages.
     * @param message LockStatusRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_App.ILockStatusRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a LockStatusRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LockStatusRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_App.LockStatusRequest;

    /**
     * Decodes a LockStatusRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns LockStatusRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_App.LockStatusRequest;

    /**
     * Verifies a LockStatusRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a LockStatusRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns LockStatusRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_App.LockStatusRequest;

    /**
     * Creates a plain object from a LockStatusRequest message. Also converts values to other types if specified.
     * @param message LockStatusRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_App.LockStatusRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this LockStatusRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for LockStatusRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a LockStatusResponse. */
  interface ILockStatusResponse {
    /** LockStatusResponse locked */
    locked?: boolean | null;
  }

  /** Represents a LockStatusResponse. */
  class LockStatusResponse implements ILockStatusResponse {
    /**
     * Constructs a new LockStatusResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_App.ILockStatusResponse);

    /** LockStatusResponse locked. */
    public locked: boolean;

    /**
     * Creates a new LockStatusResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns LockStatusResponse instance
     */
    public static create(
      properties?: PB_App.ILockStatusResponse,
    ): PB_App.LockStatusResponse;

    /**
     * Encodes the specified LockStatusResponse message. Does not implicitly {@link PB_App.LockStatusResponse.verify|verify} messages.
     * @param message LockStatusResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_App.ILockStatusResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified LockStatusResponse message, length delimited. Does not implicitly {@link PB_App.LockStatusResponse.verify|verify} messages.
     * @param message LockStatusResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_App.ILockStatusResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a LockStatusResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns LockStatusResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_App.LockStatusResponse;

    /**
     * Decodes a LockStatusResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns LockStatusResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_App.LockStatusResponse;

    /**
     * Verifies a LockStatusResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a LockStatusResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns LockStatusResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_App.LockStatusResponse;

    /**
     * Creates a plain object from a LockStatusResponse message. Also converts values to other types if specified.
     * @param message LockStatusResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_App.LockStatusResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this LockStatusResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for LockStatusResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of an AppExitRequest. */
  interface IAppExitRequest {}

  /** Represents an AppExitRequest. */
  class AppExitRequest implements IAppExitRequest {
    /**
     * Constructs a new AppExitRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_App.IAppExitRequest);

    /**
     * Creates a new AppExitRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AppExitRequest instance
     */
    public static create(
      properties?: PB_App.IAppExitRequest,
    ): PB_App.AppExitRequest;

    /**
     * Encodes the specified AppExitRequest message. Does not implicitly {@link PB_App.AppExitRequest.verify|verify} messages.
     * @param message AppExitRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_App.IAppExitRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified AppExitRequest message, length delimited. Does not implicitly {@link PB_App.AppExitRequest.verify|verify} messages.
     * @param message AppExitRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_App.IAppExitRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an AppExitRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AppExitRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_App.AppExitRequest;

    /**
     * Decodes an AppExitRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AppExitRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_App.AppExitRequest;

    /**
     * Verifies an AppExitRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an AppExitRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AppExitRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_App.AppExitRequest;

    /**
     * Creates a plain object from an AppExitRequest message. Also converts values to other types if specified.
     * @param message AppExitRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_App.AppExitRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this AppExitRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for AppExitRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of an AppLoadFileRequest. */
  interface IAppLoadFileRequest {
    /** AppLoadFileRequest path */
    path?: string | null;
  }

  /** Represents an AppLoadFileRequest. */
  class AppLoadFileRequest implements IAppLoadFileRequest {
    /**
     * Constructs a new AppLoadFileRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_App.IAppLoadFileRequest);

    /** AppLoadFileRequest path. */
    public path: string;

    /**
     * Creates a new AppLoadFileRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AppLoadFileRequest instance
     */
    public static create(
      properties?: PB_App.IAppLoadFileRequest,
    ): PB_App.AppLoadFileRequest;

    /**
     * Encodes the specified AppLoadFileRequest message. Does not implicitly {@link PB_App.AppLoadFileRequest.verify|verify} messages.
     * @param message AppLoadFileRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_App.IAppLoadFileRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified AppLoadFileRequest message, length delimited. Does not implicitly {@link PB_App.AppLoadFileRequest.verify|verify} messages.
     * @param message AppLoadFileRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_App.IAppLoadFileRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an AppLoadFileRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AppLoadFileRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_App.AppLoadFileRequest;

    /**
     * Decodes an AppLoadFileRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AppLoadFileRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_App.AppLoadFileRequest;

    /**
     * Verifies an AppLoadFileRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an AppLoadFileRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AppLoadFileRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_App.AppLoadFileRequest;

    /**
     * Creates a plain object from an AppLoadFileRequest message. Also converts values to other types if specified.
     * @param message AppLoadFileRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_App.AppLoadFileRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this AppLoadFileRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for AppLoadFileRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of an AppButtonPressRequest. */
  interface IAppButtonPressRequest {
    /** AppButtonPressRequest args */
    args?: string | null;
  }

  /** Represents an AppButtonPressRequest. */
  class AppButtonPressRequest implements IAppButtonPressRequest {
    /**
     * Constructs a new AppButtonPressRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_App.IAppButtonPressRequest);

    /** AppButtonPressRequest args. */
    public args: string;

    /**
     * Creates a new AppButtonPressRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AppButtonPressRequest instance
     */
    public static create(
      properties?: PB_App.IAppButtonPressRequest,
    ): PB_App.AppButtonPressRequest;

    /**
     * Encodes the specified AppButtonPressRequest message. Does not implicitly {@link PB_App.AppButtonPressRequest.verify|verify} messages.
     * @param message AppButtonPressRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_App.IAppButtonPressRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified AppButtonPressRequest message, length delimited. Does not implicitly {@link PB_App.AppButtonPressRequest.verify|verify} messages.
     * @param message AppButtonPressRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_App.IAppButtonPressRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an AppButtonPressRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AppButtonPressRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_App.AppButtonPressRequest;

    /**
     * Decodes an AppButtonPressRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AppButtonPressRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_App.AppButtonPressRequest;

    /**
     * Verifies an AppButtonPressRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an AppButtonPressRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AppButtonPressRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_App.AppButtonPressRequest;

    /**
     * Creates a plain object from an AppButtonPressRequest message. Also converts values to other types if specified.
     * @param message AppButtonPressRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_App.AppButtonPressRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this AppButtonPressRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for AppButtonPressRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of an AppButtonReleaseRequest. */
  interface IAppButtonReleaseRequest {}

  /** Represents an AppButtonReleaseRequest. */
  class AppButtonReleaseRequest implements IAppButtonReleaseRequest {
    /**
     * Constructs a new AppButtonReleaseRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_App.IAppButtonReleaseRequest);

    /**
     * Creates a new AppButtonReleaseRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AppButtonReleaseRequest instance
     */
    public static create(
      properties?: PB_App.IAppButtonReleaseRequest,
    ): PB_App.AppButtonReleaseRequest;

    /**
     * Encodes the specified AppButtonReleaseRequest message. Does not implicitly {@link PB_App.AppButtonReleaseRequest.verify|verify} messages.
     * @param message AppButtonReleaseRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_App.IAppButtonReleaseRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified AppButtonReleaseRequest message, length delimited. Does not implicitly {@link PB_App.AppButtonReleaseRequest.verify|verify} messages.
     * @param message AppButtonReleaseRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_App.IAppButtonReleaseRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an AppButtonReleaseRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AppButtonReleaseRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_App.AppButtonReleaseRequest;

    /**
     * Decodes an AppButtonReleaseRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AppButtonReleaseRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_App.AppButtonReleaseRequest;

    /**
     * Verifies an AppButtonReleaseRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an AppButtonReleaseRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AppButtonReleaseRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_App.AppButtonReleaseRequest;

    /**
     * Creates a plain object from an AppButtonReleaseRequest message. Also converts values to other types if specified.
     * @param message AppButtonReleaseRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_App.AppButtonReleaseRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this AppButtonReleaseRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for AppButtonReleaseRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** AppState enum. */
  enum AppState {
    APP_CLOSED = 0,
    APP_STARTED = 1,
  }

  /** Properties of an AppStateResponse. */
  interface IAppStateResponse {
    /** AppStateResponse state */
    state?: PB_App.AppState | null;
  }

  /** Represents an AppStateResponse. */
  class AppStateResponse implements IAppStateResponse {
    /**
     * Constructs a new AppStateResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_App.IAppStateResponse);

    /** AppStateResponse state. */
    public state: PB_App.AppState;

    /**
     * Creates a new AppStateResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns AppStateResponse instance
     */
    public static create(
      properties?: PB_App.IAppStateResponse,
    ): PB_App.AppStateResponse;

    /**
     * Encodes the specified AppStateResponse message. Does not implicitly {@link PB_App.AppStateResponse.verify|verify} messages.
     * @param message AppStateResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_App.IAppStateResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified AppStateResponse message, length delimited. Does not implicitly {@link PB_App.AppStateResponse.verify|verify} messages.
     * @param message AppStateResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_App.IAppStateResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an AppStateResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns AppStateResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_App.AppStateResponse;

    /**
     * Decodes an AppStateResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns AppStateResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_App.AppStateResponse;

    /**
     * Verifies an AppStateResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an AppStateResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns AppStateResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_App.AppStateResponse;

    /**
     * Creates a plain object from an AppStateResponse message. Also converts values to other types if specified.
     * @param message AppStateResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_App.AppStateResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this AppStateResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for AppStateResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }
}

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
    ERROR_STORAGE_NOT_READY = 5,
    ERROR_STORAGE_EXIST = 6,
    ERROR_STORAGE_NOT_EXIST = 7,
    ERROR_STORAGE_INVALID_PARAMETER = 8,
    ERROR_STORAGE_DENIED = 9,
    ERROR_STORAGE_INVALID_NAME = 10,
    ERROR_STORAGE_INTERNAL = 11,
    ERROR_STORAGE_NOT_IMPLEMENTED = 12,
    ERROR_STORAGE_ALREADY_OPEN = 13,
    ERROR_STORAGE_DIR_NOT_EMPTY = 18,
    ERROR_APP_CANT_START = 16,
    ERROR_APP_SYSTEM_LOCKED = 17,
    ERROR_APP_NOT_RUNNING = 21,
    ERROR_APP_CMD_ERROR = 22,
    ERROR_VIRTUAL_DISPLAY_ALREADY_STARTED = 19,
    ERROR_VIRTUAL_DISPLAY_NOT_STARTED = 20,
    ERROR_GPIO_MODE_INCORRECT = 58,
    ERROR_GPIO_UNKNOWN_PIN_MODE = 59,
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

    /** Main systemRebootRequest */
    systemRebootRequest?: PB_System.IRebootRequest | null;

    /** Main systemDeviceInfoRequest */
    systemDeviceInfoRequest?: PB_System.IDeviceInfoRequest | null;

    /** Main systemDeviceInfoResponse */
    systemDeviceInfoResponse?: PB_System.IDeviceInfoResponse | null;

    /** Main systemFactoryResetRequest */
    systemFactoryResetRequest?: PB_System.IFactoryResetRequest | null;

    /** Main systemGetDatetimeRequest */
    systemGetDatetimeRequest?: PB_System.IGetDateTimeRequest | null;

    /** Main systemGetDatetimeResponse */
    systemGetDatetimeResponse?: PB_System.IGetDateTimeResponse | null;

    /** Main systemSetDatetimeRequest */
    systemSetDatetimeRequest?: PB_System.ISetDateTimeRequest | null;

    /** Main systemPlayAudiovisualAlertRequest */
    systemPlayAudiovisualAlertRequest?: PB_System.IPlayAudiovisualAlertRequest | null;

    /** Main systemProtobufVersionRequest */
    systemProtobufVersionRequest?: PB_System.IProtobufVersionRequest | null;

    /** Main systemProtobufVersionResponse */
    systemProtobufVersionResponse?: PB_System.IProtobufVersionResponse | null;

    /** Main systemUpdateRequest */
    systemUpdateRequest?: PB_System.IUpdateRequest | null;

    /** Main systemUpdateResponse */
    systemUpdateResponse?: PB_System.IUpdateResponse | null;

    /** Main systemPowerInfoRequest */
    systemPowerInfoRequest?: PB_System.IPowerInfoRequest | null;

    /** Main systemPowerInfoResponse */
    systemPowerInfoResponse?: PB_System.IPowerInfoResponse | null;

    /** Main storageInfoRequest */
    storageInfoRequest?: PB_Storage.IInfoRequest | null;

    /** Main storageInfoResponse */
    storageInfoResponse?: PB_Storage.IInfoResponse | null;

    /** Main storageStatRequest */
    storageStatRequest?: PB_Storage.IStatRequest | null;

    /** Main storageStatResponse */
    storageStatResponse?: PB_Storage.IStatResponse | null;

    /** Main storageListRequest */
    storageListRequest?: PB_Storage.IListRequest | null;

    /** Main storageListResponse */
    storageListResponse?: PB_Storage.IListResponse | null;

    /** Main storageReadRequest */
    storageReadRequest?: PB_Storage.IReadRequest | null;

    /** Main storageReadResponse */
    storageReadResponse?: PB_Storage.IReadResponse | null;

    /** Main storageWriteRequest */
    storageWriteRequest?: PB_Storage.IWriteRequest | null;

    /** Main storageDeleteRequest */
    storageDeleteRequest?: PB_Storage.IDeleteRequest | null;

    /** Main storageMkdirRequest */
    storageMkdirRequest?: PB_Storage.IMkdirRequest | null;

    /** Main storageMd5sumRequest */
    storageMd5sumRequest?: PB_Storage.IMd5sumRequest | null;

    /** Main storageMd5sumResponse */
    storageMd5sumResponse?: PB_Storage.IMd5sumResponse | null;

    /** Main storageRenameRequest */
    storageRenameRequest?: PB_Storage.IRenameRequest | null;

    /** Main storageBackupCreateRequest */
    storageBackupCreateRequest?: PB_Storage.IBackupCreateRequest | null;

    /** Main storageBackupRestoreRequest */
    storageBackupRestoreRequest?: PB_Storage.IBackupRestoreRequest | null;

    /** Main appStartRequest */
    appStartRequest?: PB_App.IStartRequest | null;

    /** Main appLockStatusRequest */
    appLockStatusRequest?: PB_App.ILockStatusRequest | null;

    /** Main appLockStatusResponse */
    appLockStatusResponse?: PB_App.ILockStatusResponse | null;

    /** Main appExitRequest */
    appExitRequest?: PB_App.IAppExitRequest | null;

    /** Main appLoadFileRequest */
    appLoadFileRequest?: PB_App.IAppLoadFileRequest | null;

    /** Main appButtonPressRequest */
    appButtonPressRequest?: PB_App.IAppButtonPressRequest | null;

    /** Main appButtonReleaseRequest */
    appButtonReleaseRequest?: PB_App.IAppButtonReleaseRequest | null;

    /** Main guiStartScreenStreamRequest */
    guiStartScreenStreamRequest?: PB_Gui.IStartScreenStreamRequest | null;

    /** Main guiStopScreenStreamRequest */
    guiStopScreenStreamRequest?: PB_Gui.IStopScreenStreamRequest | null;

    /** Main guiScreenFrame */
    guiScreenFrame?: PB_Gui.IScreenFrame | null;

    /** Main guiSendInputEventRequest */
    guiSendInputEventRequest?: PB_Gui.ISendInputEventRequest | null;

    /** Main guiStartVirtualDisplayRequest */
    guiStartVirtualDisplayRequest?: PB_Gui.IStartVirtualDisplayRequest | null;

    /** Main guiStopVirtualDisplayRequest */
    guiStopVirtualDisplayRequest?: PB_Gui.IStopVirtualDisplayRequest | null;

    /** Main gpioSetPinMode */
    gpioSetPinMode?: PB_Gpio.ISetPinMode | null;

    /** Main gpioSetInputPull */
    gpioSetInputPull?: PB_Gpio.ISetInputPull | null;

    /** Main gpioGetPinMode */
    gpioGetPinMode?: PB_Gpio.IGetPinMode | null;

    /** Main gpioGetPinModeResponse */
    gpioGetPinModeResponse?: PB_Gpio.IGetPinModeResponse | null;

    /** Main gpioReadPin */
    gpioReadPin?: PB_Gpio.IReadPin | null;

    /** Main gpioReadPinResponse */
    gpioReadPinResponse?: PB_Gpio.IReadPinResponse | null;

    /** Main gpioWritePin */
    gpioWritePin?: PB_Gpio.IWritePin | null;

    /** Main appStateResponse */
    appStateResponse?: PB_App.IAppStateResponse | null;
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

    /** Main systemRebootRequest. */
    public systemRebootRequest?: PB_System.IRebootRequest | null;

    /** Main systemDeviceInfoRequest. */
    public systemDeviceInfoRequest?: PB_System.IDeviceInfoRequest | null;

    /** Main systemDeviceInfoResponse. */
    public systemDeviceInfoResponse?: PB_System.IDeviceInfoResponse | null;

    /** Main systemFactoryResetRequest. */
    public systemFactoryResetRequest?: PB_System.IFactoryResetRequest | null;

    /** Main systemGetDatetimeRequest. */
    public systemGetDatetimeRequest?: PB_System.IGetDateTimeRequest | null;

    /** Main systemGetDatetimeResponse. */
    public systemGetDatetimeResponse?: PB_System.IGetDateTimeResponse | null;

    /** Main systemSetDatetimeRequest. */
    public systemSetDatetimeRequest?: PB_System.ISetDateTimeRequest | null;

    /** Main systemPlayAudiovisualAlertRequest. */
    public systemPlayAudiovisualAlertRequest?: PB_System.IPlayAudiovisualAlertRequest | null;

    /** Main systemProtobufVersionRequest. */
    public systemProtobufVersionRequest?: PB_System.IProtobufVersionRequest | null;

    /** Main systemProtobufVersionResponse. */
    public systemProtobufVersionResponse?: PB_System.IProtobufVersionResponse | null;

    /** Main systemUpdateRequest. */
    public systemUpdateRequest?: PB_System.IUpdateRequest | null;

    /** Main systemUpdateResponse. */
    public systemUpdateResponse?: PB_System.IUpdateResponse | null;

    /** Main systemPowerInfoRequest. */
    public systemPowerInfoRequest?: PB_System.IPowerInfoRequest | null;

    /** Main systemPowerInfoResponse. */
    public systemPowerInfoResponse?: PB_System.IPowerInfoResponse | null;

    /** Main storageInfoRequest. */
    public storageInfoRequest?: PB_Storage.IInfoRequest | null;

    /** Main storageInfoResponse. */
    public storageInfoResponse?: PB_Storage.IInfoResponse | null;

    /** Main storageStatRequest. */
    public storageStatRequest?: PB_Storage.IStatRequest | null;

    /** Main storageStatResponse. */
    public storageStatResponse?: PB_Storage.IStatResponse | null;

    /** Main storageListRequest. */
    public storageListRequest?: PB_Storage.IListRequest | null;

    /** Main storageListResponse. */
    public storageListResponse?: PB_Storage.IListResponse | null;

    /** Main storageReadRequest. */
    public storageReadRequest?: PB_Storage.IReadRequest | null;

    /** Main storageReadResponse. */
    public storageReadResponse?: PB_Storage.IReadResponse | null;

    /** Main storageWriteRequest. */
    public storageWriteRequest?: PB_Storage.IWriteRequest | null;

    /** Main storageDeleteRequest. */
    public storageDeleteRequest?: PB_Storage.IDeleteRequest | null;

    /** Main storageMkdirRequest. */
    public storageMkdirRequest?: PB_Storage.IMkdirRequest | null;

    /** Main storageMd5sumRequest. */
    public storageMd5sumRequest?: PB_Storage.IMd5sumRequest | null;

    /** Main storageMd5sumResponse. */
    public storageMd5sumResponse?: PB_Storage.IMd5sumResponse | null;

    /** Main storageRenameRequest. */
    public storageRenameRequest?: PB_Storage.IRenameRequest | null;

    /** Main storageBackupCreateRequest. */
    public storageBackupCreateRequest?: PB_Storage.IBackupCreateRequest | null;

    /** Main storageBackupRestoreRequest. */
    public storageBackupRestoreRequest?: PB_Storage.IBackupRestoreRequest | null;

    /** Main appStartRequest. */
    public appStartRequest?: PB_App.IStartRequest | null;

    /** Main appLockStatusRequest. */
    public appLockStatusRequest?: PB_App.ILockStatusRequest | null;

    /** Main appLockStatusResponse. */
    public appLockStatusResponse?: PB_App.ILockStatusResponse | null;

    /** Main appExitRequest. */
    public appExitRequest?: PB_App.IAppExitRequest | null;

    /** Main appLoadFileRequest. */
    public appLoadFileRequest?: PB_App.IAppLoadFileRequest | null;

    /** Main appButtonPressRequest. */
    public appButtonPressRequest?: PB_App.IAppButtonPressRequest | null;

    /** Main appButtonReleaseRequest. */
    public appButtonReleaseRequest?: PB_App.IAppButtonReleaseRequest | null;

    /** Main guiStartScreenStreamRequest. */
    public guiStartScreenStreamRequest?: PB_Gui.IStartScreenStreamRequest | null;

    /** Main guiStopScreenStreamRequest. */
    public guiStopScreenStreamRequest?: PB_Gui.IStopScreenStreamRequest | null;

    /** Main guiScreenFrame. */
    public guiScreenFrame?: PB_Gui.IScreenFrame | null;

    /** Main guiSendInputEventRequest. */
    public guiSendInputEventRequest?: PB_Gui.ISendInputEventRequest | null;

    /** Main guiStartVirtualDisplayRequest. */
    public guiStartVirtualDisplayRequest?: PB_Gui.IStartVirtualDisplayRequest | null;

    /** Main guiStopVirtualDisplayRequest. */
    public guiStopVirtualDisplayRequest?: PB_Gui.IStopVirtualDisplayRequest | null;

    /** Main gpioSetPinMode. */
    public gpioSetPinMode?: PB_Gpio.ISetPinMode | null;

    /** Main gpioSetInputPull. */
    public gpioSetInputPull?: PB_Gpio.ISetInputPull | null;

    /** Main gpioGetPinMode. */
    public gpioGetPinMode?: PB_Gpio.IGetPinMode | null;

    /** Main gpioGetPinModeResponse. */
    public gpioGetPinModeResponse?: PB_Gpio.IGetPinModeResponse | null;

    /** Main gpioReadPin. */
    public gpioReadPin?: PB_Gpio.IReadPin | null;

    /** Main gpioReadPinResponse. */
    public gpioReadPinResponse?: PB_Gpio.IReadPinResponse | null;

    /** Main gpioWritePin. */
    public gpioWritePin?: PB_Gpio.IWritePin | null;

    /** Main appStateResponse. */
    public appStateResponse?: PB_App.IAppStateResponse | null;

    /** Main content. */
    public content?:
      | 'empty'
      | 'stopSession'
      | 'systemPingRequest'
      | 'systemPingResponse'
      | 'systemRebootRequest'
      | 'systemDeviceInfoRequest'
      | 'systemDeviceInfoResponse'
      | 'systemFactoryResetRequest'
      | 'systemGetDatetimeRequest'
      | 'systemGetDatetimeResponse'
      | 'systemSetDatetimeRequest'
      | 'systemPlayAudiovisualAlertRequest'
      | 'systemProtobufVersionRequest'
      | 'systemProtobufVersionResponse'
      | 'systemUpdateRequest'
      | 'systemUpdateResponse'
      | 'systemPowerInfoRequest'
      | 'systemPowerInfoResponse'
      | 'storageInfoRequest'
      | 'storageInfoResponse'
      | 'storageStatRequest'
      | 'storageStatResponse'
      | 'storageListRequest'
      | 'storageListResponse'
      | 'storageReadRequest'
      | 'storageReadResponse'
      | 'storageWriteRequest'
      | 'storageDeleteRequest'
      | 'storageMkdirRequest'
      | 'storageMd5sumRequest'
      | 'storageMd5sumResponse'
      | 'storageRenameRequest'
      | 'storageBackupCreateRequest'
      | 'storageBackupRestoreRequest'
      | 'appStartRequest'
      | 'appLockStatusRequest'
      | 'appLockStatusResponse'
      | 'appExitRequest'
      | 'appLoadFileRequest'
      | 'appButtonPressRequest'
      | 'appButtonReleaseRequest'
      | 'guiStartScreenStreamRequest'
      | 'guiStopScreenStreamRequest'
      | 'guiScreenFrame'
      | 'guiSendInputEventRequest'
      | 'guiStartVirtualDisplayRequest'
      | 'guiStopVirtualDisplayRequest'
      | 'gpioSetPinMode'
      | 'gpioSetInputPull'
      | 'gpioGetPinMode'
      | 'gpioGetPinModeResponse'
      | 'gpioReadPin'
      | 'gpioReadPinResponse'
      | 'gpioWritePin'
      | 'appStateResponse';

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

  /** Properties of a Region. */
  interface IRegion {
    /** Region countryCode */
    countryCode?: Uint8Array | null;

    /** Region bands */
    bands?: PB.Region.IBand[] | null;
  }

  /** Represents a Region. */
  class Region implements IRegion {
    /**
     * Constructs a new Region.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB.IRegion);

    /** Region countryCode. */
    public countryCode: Uint8Array;

    /** Region bands. */
    public bands: PB.Region.IBand[];

    /**
     * Creates a new Region instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Region instance
     */
    public static create(properties?: PB.IRegion): PB.Region;

    /**
     * Encodes the specified Region message. Does not implicitly {@link PB.Region.verify|verify} messages.
     * @param message Region message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB.IRegion,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified Region message, length delimited. Does not implicitly {@link PB.Region.verify|verify} messages.
     * @param message Region message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB.IRegion,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a Region message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Region
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB.Region;

    /**
     * Decodes a Region message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Region
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB.Region;

    /**
     * Verifies a Region message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Region message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Region
     */
    public static fromObject(object: { [k: string]: any }): PB.Region;

    /**
     * Creates a plain object from a Region message. Also converts values to other types if specified.
     * @param message Region
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB.Region,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this Region to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Region
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  namespace Region {
    /** Properties of a Band. */
    interface IBand {
      /** Band start */
      start?: number | null;

      /** Band end */
      end?: number | null;

      /** Band powerLimit */
      powerLimit?: number | null;

      /** Band dutyCycle */
      dutyCycle?: number | null;
    }

    /** Represents a Band. */
    class Band implements IBand {
      /**
       * Constructs a new Band.
       * @param [properties] Properties to set
       */
      constructor(properties?: PB.Region.IBand);

      /** Band start. */
      public start: number;

      /** Band end. */
      public end: number;

      /** Band powerLimit. */
      public powerLimit: number;

      /** Band dutyCycle. */
      public dutyCycle: number;

      /**
       * Creates a new Band instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Band instance
       */
      public static create(properties?: PB.Region.IBand): PB.Region.Band;

      /**
       * Encodes the specified Band message. Does not implicitly {@link PB.Region.Band.verify|verify} messages.
       * @param message Band message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: PB.Region.IBand,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Encodes the specified Band message, length delimited. Does not implicitly {@link PB.Region.Band.verify|verify} messages.
       * @param message Band message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: PB.Region.IBand,
        writer?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a Band message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns Band
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number,
      ): PB.Region.Band;

      /**
       * Decodes a Band message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns Band
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array,
      ): PB.Region.Band;

      /**
       * Verifies a Band message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates a Band message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns Band
       */
      public static fromObject(object: { [k: string]: any }): PB.Region.Band;

      /**
       * Creates a plain object from a Band message. Also converts values to other types if specified.
       * @param message Band
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: PB.Region.Band,
        options?: $protobuf.IConversionOptions,
      ): { [k: string]: any };

      /**
       * Converts this Band to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };

      /**
       * Gets the default type url for Band
       * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
       * @returns The default type url
       */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }
  }
}

/** Namespace PB_Storage. */
export namespace PB_Storage {
  /** Properties of a File. */
  interface IFile {
    /** File type */
    type?: PB_Storage.File.FileType | null;

    /** File name */
    name?: string | null;

    /** File size */
    size?: number | null;

    /** File data */
    data?: Uint8Array | null;
  }

  /** Represents a File. */
  class File implements IFile {
    /**
     * Constructs a new File.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IFile);

    /** File type. */
    public type: PB_Storage.File.FileType;

    /** File name. */
    public name: string;

    /** File size. */
    public size: number;

    /** File data. */
    public data: Uint8Array;

    /**
     * Creates a new File instance using the specified properties.
     * @param [properties] Properties to set
     * @returns File instance
     */
    public static create(properties?: PB_Storage.IFile): PB_Storage.File;

    /**
     * Encodes the specified File message. Does not implicitly {@link PB_Storage.File.verify|verify} messages.
     * @param message File message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IFile,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified File message, length delimited. Does not implicitly {@link PB_Storage.File.verify|verify} messages.
     * @param message File message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IFile,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a File message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns File
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.File;

    /**
     * Decodes a File message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns File
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.File;

    /**
     * Verifies a File message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a File message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns File
     */
    public static fromObject(object: { [k: string]: any }): PB_Storage.File;

    /**
     * Creates a plain object from a File message. Also converts values to other types if specified.
     * @param message File
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.File,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this File to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for File
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  namespace File {
    /** FileType enum. */
    enum FileType {
      FILE = 0,
      DIR = 1,
    }
  }

  /** Properties of an InfoRequest. */
  interface IInfoRequest {
    /** InfoRequest path */
    path?: string | null;
  }

  /** Represents an InfoRequest. */
  class InfoRequest implements IInfoRequest {
    /**
     * Constructs a new InfoRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IInfoRequest);

    /** InfoRequest path. */
    public path: string;

    /**
     * Creates a new InfoRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns InfoRequest instance
     */
    public static create(
      properties?: PB_Storage.IInfoRequest,
    ): PB_Storage.InfoRequest;

    /**
     * Encodes the specified InfoRequest message. Does not implicitly {@link PB_Storage.InfoRequest.verify|verify} messages.
     * @param message InfoRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IInfoRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified InfoRequest message, length delimited. Does not implicitly {@link PB_Storage.InfoRequest.verify|verify} messages.
     * @param message InfoRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IInfoRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an InfoRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns InfoRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.InfoRequest;

    /**
     * Decodes an InfoRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns InfoRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.InfoRequest;

    /**
     * Verifies an InfoRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an InfoRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns InfoRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.InfoRequest;

    /**
     * Creates a plain object from an InfoRequest message. Also converts values to other types if specified.
     * @param message InfoRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.InfoRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this InfoRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for InfoRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of an InfoResponse. */
  interface IInfoResponse {
    /** InfoResponse totalSpace */
    totalSpace?: number | Long | null;

    /** InfoResponse freeSpace */
    freeSpace?: number | Long | null;
  }

  /** Represents an InfoResponse. */
  class InfoResponse implements IInfoResponse {
    /**
     * Constructs a new InfoResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IInfoResponse);

    /** InfoResponse totalSpace. */
    public totalSpace: number | Long;

    /** InfoResponse freeSpace. */
    public freeSpace: number | Long;

    /**
     * Creates a new InfoResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns InfoResponse instance
     */
    public static create(
      properties?: PB_Storage.IInfoResponse,
    ): PB_Storage.InfoResponse;

    /**
     * Encodes the specified InfoResponse message. Does not implicitly {@link PB_Storage.InfoResponse.verify|verify} messages.
     * @param message InfoResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IInfoResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified InfoResponse message, length delimited. Does not implicitly {@link PB_Storage.InfoResponse.verify|verify} messages.
     * @param message InfoResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IInfoResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an InfoResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns InfoResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.InfoResponse;

    /**
     * Decodes an InfoResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns InfoResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.InfoResponse;

    /**
     * Verifies an InfoResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an InfoResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns InfoResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.InfoResponse;

    /**
     * Creates a plain object from an InfoResponse message. Also converts values to other types if specified.
     * @param message InfoResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.InfoResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this InfoResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for InfoResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a StatRequest. */
  interface IStatRequest {
    /** StatRequest path */
    path?: string | null;
  }

  /** Represents a StatRequest. */
  class StatRequest implements IStatRequest {
    /**
     * Constructs a new StatRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IStatRequest);

    /** StatRequest path. */
    public path: string;

    /**
     * Creates a new StatRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StatRequest instance
     */
    public static create(
      properties?: PB_Storage.IStatRequest,
    ): PB_Storage.StatRequest;

    /**
     * Encodes the specified StatRequest message. Does not implicitly {@link PB_Storage.StatRequest.verify|verify} messages.
     * @param message StatRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IStatRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified StatRequest message, length delimited. Does not implicitly {@link PB_Storage.StatRequest.verify|verify} messages.
     * @param message StatRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IStatRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a StatRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns StatRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.StatRequest;

    /**
     * Decodes a StatRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns StatRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.StatRequest;

    /**
     * Verifies a StatRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a StatRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns StatRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.StatRequest;

    /**
     * Creates a plain object from a StatRequest message. Also converts values to other types if specified.
     * @param message StatRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.StatRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this StatRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for StatRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a StatResponse. */
  interface IStatResponse {
    /** StatResponse file */
    file?: PB_Storage.IFile | null;
  }

  /** Represents a StatResponse. */
  class StatResponse implements IStatResponse {
    /**
     * Constructs a new StatResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IStatResponse);

    /** StatResponse file. */
    public file?: PB_Storage.IFile | null;

    /**
     * Creates a new StatResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StatResponse instance
     */
    public static create(
      properties?: PB_Storage.IStatResponse,
    ): PB_Storage.StatResponse;

    /**
     * Encodes the specified StatResponse message. Does not implicitly {@link PB_Storage.StatResponse.verify|verify} messages.
     * @param message StatResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IStatResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified StatResponse message, length delimited. Does not implicitly {@link PB_Storage.StatResponse.verify|verify} messages.
     * @param message StatResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IStatResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a StatResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns StatResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.StatResponse;

    /**
     * Decodes a StatResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns StatResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.StatResponse;

    /**
     * Verifies a StatResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a StatResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns StatResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.StatResponse;

    /**
     * Creates a plain object from a StatResponse message. Also converts values to other types if specified.
     * @param message StatResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.StatResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this StatResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for StatResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a ListRequest. */
  interface IListRequest {
    /** ListRequest path */
    path?: string | null;
  }

  /** Represents a ListRequest. */
  class ListRequest implements IListRequest {
    /**
     * Constructs a new ListRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IListRequest);

    /** ListRequest path. */
    public path: string;

    /**
     * Creates a new ListRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ListRequest instance
     */
    public static create(
      properties?: PB_Storage.IListRequest,
    ): PB_Storage.ListRequest;

    /**
     * Encodes the specified ListRequest message. Does not implicitly {@link PB_Storage.ListRequest.verify|verify} messages.
     * @param message ListRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IListRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified ListRequest message, length delimited. Does not implicitly {@link PB_Storage.ListRequest.verify|verify} messages.
     * @param message ListRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IListRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a ListRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ListRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.ListRequest;

    /**
     * Decodes a ListRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ListRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.ListRequest;

    /**
     * Verifies a ListRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ListRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ListRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.ListRequest;

    /**
     * Creates a plain object from a ListRequest message. Also converts values to other types if specified.
     * @param message ListRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.ListRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this ListRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ListRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a ListResponse. */
  interface IListResponse {
    /** ListResponse file */
    file?: PB_Storage.IFile[] | null;
  }

  /** Represents a ListResponse. */
  class ListResponse implements IListResponse {
    /**
     * Constructs a new ListResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IListResponse);

    /** ListResponse file. */
    public file: PB_Storage.IFile[];

    /**
     * Creates a new ListResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ListResponse instance
     */
    public static create(
      properties?: PB_Storage.IListResponse,
    ): PB_Storage.ListResponse;

    /**
     * Encodes the specified ListResponse message. Does not implicitly {@link PB_Storage.ListResponse.verify|verify} messages.
     * @param message ListResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IListResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified ListResponse message, length delimited. Does not implicitly {@link PB_Storage.ListResponse.verify|verify} messages.
     * @param message ListResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IListResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a ListResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ListResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.ListResponse;

    /**
     * Decodes a ListResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ListResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.ListResponse;

    /**
     * Verifies a ListResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ListResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ListResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.ListResponse;

    /**
     * Creates a plain object from a ListResponse message. Also converts values to other types if specified.
     * @param message ListResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.ListResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this ListResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ListResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a ReadRequest. */
  interface IReadRequest {
    /** ReadRequest path */
    path?: string | null;
  }

  /** Represents a ReadRequest. */
  class ReadRequest implements IReadRequest {
    /**
     * Constructs a new ReadRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IReadRequest);

    /** ReadRequest path. */
    public path: string;

    /**
     * Creates a new ReadRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ReadRequest instance
     */
    public static create(
      properties?: PB_Storage.IReadRequest,
    ): PB_Storage.ReadRequest;

    /**
     * Encodes the specified ReadRequest message. Does not implicitly {@link PB_Storage.ReadRequest.verify|verify} messages.
     * @param message ReadRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IReadRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified ReadRequest message, length delimited. Does not implicitly {@link PB_Storage.ReadRequest.verify|verify} messages.
     * @param message ReadRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IReadRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a ReadRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ReadRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.ReadRequest;

    /**
     * Decodes a ReadRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ReadRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.ReadRequest;

    /**
     * Verifies a ReadRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ReadRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ReadRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.ReadRequest;

    /**
     * Creates a plain object from a ReadRequest message. Also converts values to other types if specified.
     * @param message ReadRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.ReadRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this ReadRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ReadRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a ReadResponse. */
  interface IReadResponse {
    /** ReadResponse file */
    file?: PB_Storage.IFile | null;
  }

  /** Represents a ReadResponse. */
  class ReadResponse implements IReadResponse {
    /**
     * Constructs a new ReadResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IReadResponse);

    /** ReadResponse file. */
    public file?: PB_Storage.IFile | null;

    /**
     * Creates a new ReadResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ReadResponse instance
     */
    public static create(
      properties?: PB_Storage.IReadResponse,
    ): PB_Storage.ReadResponse;

    /**
     * Encodes the specified ReadResponse message. Does not implicitly {@link PB_Storage.ReadResponse.verify|verify} messages.
     * @param message ReadResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IReadResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified ReadResponse message, length delimited. Does not implicitly {@link PB_Storage.ReadResponse.verify|verify} messages.
     * @param message ReadResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IReadResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a ReadResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ReadResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.ReadResponse;

    /**
     * Decodes a ReadResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ReadResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.ReadResponse;

    /**
     * Verifies a ReadResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ReadResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ReadResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.ReadResponse;

    /**
     * Creates a plain object from a ReadResponse message. Also converts values to other types if specified.
     * @param message ReadResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.ReadResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this ReadResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ReadResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a WriteRequest. */
  interface IWriteRequest {
    /** WriteRequest path */
    path?: string | null;

    /** WriteRequest file */
    file?: PB_Storage.IFile | null;
  }

  /** Represents a WriteRequest. */
  class WriteRequest implements IWriteRequest {
    /**
     * Constructs a new WriteRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IWriteRequest);

    /** WriteRequest path. */
    public path: string;

    /** WriteRequest file. */
    public file?: PB_Storage.IFile | null;

    /**
     * Creates a new WriteRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns WriteRequest instance
     */
    public static create(
      properties?: PB_Storage.IWriteRequest,
    ): PB_Storage.WriteRequest;

    /**
     * Encodes the specified WriteRequest message. Does not implicitly {@link PB_Storage.WriteRequest.verify|verify} messages.
     * @param message WriteRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IWriteRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified WriteRequest message, length delimited. Does not implicitly {@link PB_Storage.WriteRequest.verify|verify} messages.
     * @param message WriteRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IWriteRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a WriteRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns WriteRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.WriteRequest;

    /**
     * Decodes a WriteRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns WriteRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.WriteRequest;

    /**
     * Verifies a WriteRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a WriteRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns WriteRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.WriteRequest;

    /**
     * Creates a plain object from a WriteRequest message. Also converts values to other types if specified.
     * @param message WriteRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.WriteRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this WriteRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for WriteRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a DeleteRequest. */
  interface IDeleteRequest {
    /** DeleteRequest path */
    path?: string | null;

    /** DeleteRequest recursive */
    recursive?: boolean | null;
  }

  /** Represents a DeleteRequest. */
  class DeleteRequest implements IDeleteRequest {
    /**
     * Constructs a new DeleteRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IDeleteRequest);

    /** DeleteRequest path. */
    public path: string;

    /** DeleteRequest recursive. */
    public recursive: boolean;

    /**
     * Creates a new DeleteRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DeleteRequest instance
     */
    public static create(
      properties?: PB_Storage.IDeleteRequest,
    ): PB_Storage.DeleteRequest;

    /**
     * Encodes the specified DeleteRequest message. Does not implicitly {@link PB_Storage.DeleteRequest.verify|verify} messages.
     * @param message DeleteRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IDeleteRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified DeleteRequest message, length delimited. Does not implicitly {@link PB_Storage.DeleteRequest.verify|verify} messages.
     * @param message DeleteRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IDeleteRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a DeleteRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DeleteRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.DeleteRequest;

    /**
     * Decodes a DeleteRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DeleteRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.DeleteRequest;

    /**
     * Verifies a DeleteRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a DeleteRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DeleteRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.DeleteRequest;

    /**
     * Creates a plain object from a DeleteRequest message. Also converts values to other types if specified.
     * @param message DeleteRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.DeleteRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this DeleteRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for DeleteRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a MkdirRequest. */
  interface IMkdirRequest {
    /** MkdirRequest path */
    path?: string | null;
  }

  /** Represents a MkdirRequest. */
  class MkdirRequest implements IMkdirRequest {
    /**
     * Constructs a new MkdirRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IMkdirRequest);

    /** MkdirRequest path. */
    public path: string;

    /**
     * Creates a new MkdirRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MkdirRequest instance
     */
    public static create(
      properties?: PB_Storage.IMkdirRequest,
    ): PB_Storage.MkdirRequest;

    /**
     * Encodes the specified MkdirRequest message. Does not implicitly {@link PB_Storage.MkdirRequest.verify|verify} messages.
     * @param message MkdirRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IMkdirRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified MkdirRequest message, length delimited. Does not implicitly {@link PB_Storage.MkdirRequest.verify|verify} messages.
     * @param message MkdirRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IMkdirRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a MkdirRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MkdirRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.MkdirRequest;

    /**
     * Decodes a MkdirRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MkdirRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.MkdirRequest;

    /**
     * Verifies a MkdirRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a MkdirRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MkdirRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.MkdirRequest;

    /**
     * Creates a plain object from a MkdirRequest message. Also converts values to other types if specified.
     * @param message MkdirRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.MkdirRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this MkdirRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for MkdirRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a Md5sumRequest. */
  interface IMd5sumRequest {
    /** Md5sumRequest path */
    path?: string | null;
  }

  /** Represents a Md5sumRequest. */
  class Md5sumRequest implements IMd5sumRequest {
    /**
     * Constructs a new Md5sumRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IMd5sumRequest);

    /** Md5sumRequest path. */
    public path: string;

    /**
     * Creates a new Md5sumRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Md5sumRequest instance
     */
    public static create(
      properties?: PB_Storage.IMd5sumRequest,
    ): PB_Storage.Md5sumRequest;

    /**
     * Encodes the specified Md5sumRequest message. Does not implicitly {@link PB_Storage.Md5sumRequest.verify|verify} messages.
     * @param message Md5sumRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IMd5sumRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified Md5sumRequest message, length delimited. Does not implicitly {@link PB_Storage.Md5sumRequest.verify|verify} messages.
     * @param message Md5sumRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IMd5sumRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a Md5sumRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Md5sumRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.Md5sumRequest;

    /**
     * Decodes a Md5sumRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Md5sumRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.Md5sumRequest;

    /**
     * Verifies a Md5sumRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Md5sumRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Md5sumRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.Md5sumRequest;

    /**
     * Creates a plain object from a Md5sumRequest message. Also converts values to other types if specified.
     * @param message Md5sumRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.Md5sumRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this Md5sumRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Md5sumRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a Md5sumResponse. */
  interface IMd5sumResponse {
    /** Md5sumResponse md5sum */
    md5sum?: string | null;
  }

  /** Represents a Md5sumResponse. */
  class Md5sumResponse implements IMd5sumResponse {
    /**
     * Constructs a new Md5sumResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IMd5sumResponse);

    /** Md5sumResponse md5sum. */
    public md5sum: string;

    /**
     * Creates a new Md5sumResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Md5sumResponse instance
     */
    public static create(
      properties?: PB_Storage.IMd5sumResponse,
    ): PB_Storage.Md5sumResponse;

    /**
     * Encodes the specified Md5sumResponse message. Does not implicitly {@link PB_Storage.Md5sumResponse.verify|verify} messages.
     * @param message Md5sumResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IMd5sumResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified Md5sumResponse message, length delimited. Does not implicitly {@link PB_Storage.Md5sumResponse.verify|verify} messages.
     * @param message Md5sumResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IMd5sumResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a Md5sumResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Md5sumResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.Md5sumResponse;

    /**
     * Decodes a Md5sumResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Md5sumResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.Md5sumResponse;

    /**
     * Verifies a Md5sumResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Md5sumResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Md5sumResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.Md5sumResponse;

    /**
     * Creates a plain object from a Md5sumResponse message. Also converts values to other types if specified.
     * @param message Md5sumResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.Md5sumResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this Md5sumResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Md5sumResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a RenameRequest. */
  interface IRenameRequest {
    /** RenameRequest oldPath */
    oldPath?: string | null;

    /** RenameRequest newPath */
    newPath?: string | null;
  }

  /** Represents a RenameRequest. */
  class RenameRequest implements IRenameRequest {
    /**
     * Constructs a new RenameRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IRenameRequest);

    /** RenameRequest oldPath. */
    public oldPath: string;

    /** RenameRequest newPath. */
    public newPath: string;

    /**
     * Creates a new RenameRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RenameRequest instance
     */
    public static create(
      properties?: PB_Storage.IRenameRequest,
    ): PB_Storage.RenameRequest;

    /**
     * Encodes the specified RenameRequest message. Does not implicitly {@link PB_Storage.RenameRequest.verify|verify} messages.
     * @param message RenameRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IRenameRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified RenameRequest message, length delimited. Does not implicitly {@link PB_Storage.RenameRequest.verify|verify} messages.
     * @param message RenameRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IRenameRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a RenameRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RenameRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.RenameRequest;

    /**
     * Decodes a RenameRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RenameRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.RenameRequest;

    /**
     * Verifies a RenameRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a RenameRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RenameRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.RenameRequest;

    /**
     * Creates a plain object from a RenameRequest message. Also converts values to other types if specified.
     * @param message RenameRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.RenameRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this RenameRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RenameRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a BackupCreateRequest. */
  interface IBackupCreateRequest {
    /** BackupCreateRequest archivePath */
    archivePath?: string | null;
  }

  /** Represents a BackupCreateRequest. */
  class BackupCreateRequest implements IBackupCreateRequest {
    /**
     * Constructs a new BackupCreateRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IBackupCreateRequest);

    /** BackupCreateRequest archivePath. */
    public archivePath: string;

    /**
     * Creates a new BackupCreateRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns BackupCreateRequest instance
     */
    public static create(
      properties?: PB_Storage.IBackupCreateRequest,
    ): PB_Storage.BackupCreateRequest;

    /**
     * Encodes the specified BackupCreateRequest message. Does not implicitly {@link PB_Storage.BackupCreateRequest.verify|verify} messages.
     * @param message BackupCreateRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IBackupCreateRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified BackupCreateRequest message, length delimited. Does not implicitly {@link PB_Storage.BackupCreateRequest.verify|verify} messages.
     * @param message BackupCreateRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IBackupCreateRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a BackupCreateRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns BackupCreateRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.BackupCreateRequest;

    /**
     * Decodes a BackupCreateRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns BackupCreateRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.BackupCreateRequest;

    /**
     * Verifies a BackupCreateRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a BackupCreateRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns BackupCreateRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.BackupCreateRequest;

    /**
     * Creates a plain object from a BackupCreateRequest message. Also converts values to other types if specified.
     * @param message BackupCreateRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.BackupCreateRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this BackupCreateRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for BackupCreateRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a BackupRestoreRequest. */
  interface IBackupRestoreRequest {
    /** BackupRestoreRequest archivePath */
    archivePath?: string | null;
  }

  /** Represents a BackupRestoreRequest. */
  class BackupRestoreRequest implements IBackupRestoreRequest {
    /**
     * Constructs a new BackupRestoreRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Storage.IBackupRestoreRequest);

    /** BackupRestoreRequest archivePath. */
    public archivePath: string;

    /**
     * Creates a new BackupRestoreRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns BackupRestoreRequest instance
     */
    public static create(
      properties?: PB_Storage.IBackupRestoreRequest,
    ): PB_Storage.BackupRestoreRequest;

    /**
     * Encodes the specified BackupRestoreRequest message. Does not implicitly {@link PB_Storage.BackupRestoreRequest.verify|verify} messages.
     * @param message BackupRestoreRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Storage.IBackupRestoreRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified BackupRestoreRequest message, length delimited. Does not implicitly {@link PB_Storage.BackupRestoreRequest.verify|verify} messages.
     * @param message BackupRestoreRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Storage.IBackupRestoreRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a BackupRestoreRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns BackupRestoreRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Storage.BackupRestoreRequest;

    /**
     * Decodes a BackupRestoreRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns BackupRestoreRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Storage.BackupRestoreRequest;

    /**
     * Verifies a BackupRestoreRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a BackupRestoreRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns BackupRestoreRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Storage.BackupRestoreRequest;

    /**
     * Creates a plain object from a BackupRestoreRequest message. Also converts values to other types if specified.
     * @param message BackupRestoreRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Storage.BackupRestoreRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this BackupRestoreRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for BackupRestoreRequest
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

  /** Properties of a RebootRequest. */
  interface IRebootRequest {
    /** RebootRequest mode */
    mode?: PB_System.RebootRequest.RebootMode | null;
  }

  /** Represents a RebootRequest. */
  class RebootRequest implements IRebootRequest {
    /**
     * Constructs a new RebootRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IRebootRequest);

    /** RebootRequest mode. */
    public mode: PB_System.RebootRequest.RebootMode;

    /**
     * Creates a new RebootRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns RebootRequest instance
     */
    public static create(
      properties?: PB_System.IRebootRequest,
    ): PB_System.RebootRequest;

    /**
     * Encodes the specified RebootRequest message. Does not implicitly {@link PB_System.RebootRequest.verify|verify} messages.
     * @param message RebootRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IRebootRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified RebootRequest message, length delimited. Does not implicitly {@link PB_System.RebootRequest.verify|verify} messages.
     * @param message RebootRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IRebootRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a RebootRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns RebootRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.RebootRequest;

    /**
     * Decodes a RebootRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns RebootRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.RebootRequest;

    /**
     * Verifies a RebootRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a RebootRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns RebootRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.RebootRequest;

    /**
     * Creates a plain object from a RebootRequest message. Also converts values to other types if specified.
     * @param message RebootRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.RebootRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this RebootRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for RebootRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  namespace RebootRequest {
    /** RebootMode enum. */
    enum RebootMode {
      OS = 0,
      DFU = 1,
      UPDATE = 2,
    }
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

  /** Properties of a FactoryResetRequest. */
  interface IFactoryResetRequest {}

  /** Represents a FactoryResetRequest. */
  class FactoryResetRequest implements IFactoryResetRequest {
    /**
     * Constructs a new FactoryResetRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IFactoryResetRequest);

    /**
     * Creates a new FactoryResetRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns FactoryResetRequest instance
     */
    public static create(
      properties?: PB_System.IFactoryResetRequest,
    ): PB_System.FactoryResetRequest;

    /**
     * Encodes the specified FactoryResetRequest message. Does not implicitly {@link PB_System.FactoryResetRequest.verify|verify} messages.
     * @param message FactoryResetRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IFactoryResetRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified FactoryResetRequest message, length delimited. Does not implicitly {@link PB_System.FactoryResetRequest.verify|verify} messages.
     * @param message FactoryResetRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IFactoryResetRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a FactoryResetRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns FactoryResetRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.FactoryResetRequest;

    /**
     * Decodes a FactoryResetRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns FactoryResetRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.FactoryResetRequest;

    /**
     * Verifies a FactoryResetRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a FactoryResetRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns FactoryResetRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.FactoryResetRequest;

    /**
     * Creates a plain object from a FactoryResetRequest message. Also converts values to other types if specified.
     * @param message FactoryResetRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.FactoryResetRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this FactoryResetRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for FactoryResetRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a GetDateTimeRequest. */
  interface IGetDateTimeRequest {}

  /** Represents a GetDateTimeRequest. */
  class GetDateTimeRequest implements IGetDateTimeRequest {
    /**
     * Constructs a new GetDateTimeRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IGetDateTimeRequest);

    /**
     * Creates a new GetDateTimeRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GetDateTimeRequest instance
     */
    public static create(
      properties?: PB_System.IGetDateTimeRequest,
    ): PB_System.GetDateTimeRequest;

    /**
     * Encodes the specified GetDateTimeRequest message. Does not implicitly {@link PB_System.GetDateTimeRequest.verify|verify} messages.
     * @param message GetDateTimeRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IGetDateTimeRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified GetDateTimeRequest message, length delimited. Does not implicitly {@link PB_System.GetDateTimeRequest.verify|verify} messages.
     * @param message GetDateTimeRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IGetDateTimeRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a GetDateTimeRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GetDateTimeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.GetDateTimeRequest;

    /**
     * Decodes a GetDateTimeRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GetDateTimeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.GetDateTimeRequest;

    /**
     * Verifies a GetDateTimeRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a GetDateTimeRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GetDateTimeRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.GetDateTimeRequest;

    /**
     * Creates a plain object from a GetDateTimeRequest message. Also converts values to other types if specified.
     * @param message GetDateTimeRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.GetDateTimeRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this GetDateTimeRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for GetDateTimeRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a GetDateTimeResponse. */
  interface IGetDateTimeResponse {
    /** GetDateTimeResponse datetime */
    datetime?: PB_System.IDateTime | null;
  }

  /** Represents a GetDateTimeResponse. */
  class GetDateTimeResponse implements IGetDateTimeResponse {
    /**
     * Constructs a new GetDateTimeResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IGetDateTimeResponse);

    /** GetDateTimeResponse datetime. */
    public datetime?: PB_System.IDateTime | null;

    /**
     * Creates a new GetDateTimeResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GetDateTimeResponse instance
     */
    public static create(
      properties?: PB_System.IGetDateTimeResponse,
    ): PB_System.GetDateTimeResponse;

    /**
     * Encodes the specified GetDateTimeResponse message. Does not implicitly {@link PB_System.GetDateTimeResponse.verify|verify} messages.
     * @param message GetDateTimeResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IGetDateTimeResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified GetDateTimeResponse message, length delimited. Does not implicitly {@link PB_System.GetDateTimeResponse.verify|verify} messages.
     * @param message GetDateTimeResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IGetDateTimeResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a GetDateTimeResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GetDateTimeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.GetDateTimeResponse;

    /**
     * Decodes a GetDateTimeResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GetDateTimeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.GetDateTimeResponse;

    /**
     * Verifies a GetDateTimeResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a GetDateTimeResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GetDateTimeResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.GetDateTimeResponse;

    /**
     * Creates a plain object from a GetDateTimeResponse message. Also converts values to other types if specified.
     * @param message GetDateTimeResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.GetDateTimeResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this GetDateTimeResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for GetDateTimeResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a SetDateTimeRequest. */
  interface ISetDateTimeRequest {
    /** SetDateTimeRequest datetime */
    datetime?: PB_System.IDateTime | null;
  }

  /** Represents a SetDateTimeRequest. */
  class SetDateTimeRequest implements ISetDateTimeRequest {
    /**
     * Constructs a new SetDateTimeRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.ISetDateTimeRequest);

    /** SetDateTimeRequest datetime. */
    public datetime?: PB_System.IDateTime | null;

    /**
     * Creates a new SetDateTimeRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SetDateTimeRequest instance
     */
    public static create(
      properties?: PB_System.ISetDateTimeRequest,
    ): PB_System.SetDateTimeRequest;

    /**
     * Encodes the specified SetDateTimeRequest message. Does not implicitly {@link PB_System.SetDateTimeRequest.verify|verify} messages.
     * @param message SetDateTimeRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.ISetDateTimeRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified SetDateTimeRequest message, length delimited. Does not implicitly {@link PB_System.SetDateTimeRequest.verify|verify} messages.
     * @param message SetDateTimeRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.ISetDateTimeRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a SetDateTimeRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SetDateTimeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.SetDateTimeRequest;

    /**
     * Decodes a SetDateTimeRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SetDateTimeRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.SetDateTimeRequest;

    /**
     * Verifies a SetDateTimeRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a SetDateTimeRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SetDateTimeRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.SetDateTimeRequest;

    /**
     * Creates a plain object from a SetDateTimeRequest message. Also converts values to other types if specified.
     * @param message SetDateTimeRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.SetDateTimeRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this SetDateTimeRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for SetDateTimeRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a DateTime. */
  interface IDateTime {
    /** DateTime hour */
    hour?: number | null;

    /** DateTime minute */
    minute?: number | null;

    /** DateTime second */
    second?: number | null;

    /** DateTime day */
    day?: number | null;

    /** DateTime month */
    month?: number | null;

    /** DateTime year */
    year?: number | null;

    /** DateTime weekday */
    weekday?: number | null;
  }

  /** Represents a DateTime. */
  class DateTime implements IDateTime {
    /**
     * Constructs a new DateTime.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IDateTime);

    /** DateTime hour. */
    public hour: number;

    /** DateTime minute. */
    public minute: number;

    /** DateTime second. */
    public second: number;

    /** DateTime day. */
    public day: number;

    /** DateTime month. */
    public month: number;

    /** DateTime year. */
    public year: number;

    /** DateTime weekday. */
    public weekday: number;

    /**
     * Creates a new DateTime instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DateTime instance
     */
    public static create(properties?: PB_System.IDateTime): PB_System.DateTime;

    /**
     * Encodes the specified DateTime message. Does not implicitly {@link PB_System.DateTime.verify|verify} messages.
     * @param message DateTime message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IDateTime,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified DateTime message, length delimited. Does not implicitly {@link PB_System.DateTime.verify|verify} messages.
     * @param message DateTime message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IDateTime,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a DateTime message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns DateTime
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.DateTime;

    /**
     * Decodes a DateTime message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns DateTime
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.DateTime;

    /**
     * Verifies a DateTime message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a DateTime message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns DateTime
     */
    public static fromObject(object: { [k: string]: any }): PB_System.DateTime;

    /**
     * Creates a plain object from a DateTime message. Also converts values to other types if specified.
     * @param message DateTime
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.DateTime,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this DateTime to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for DateTime
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a PlayAudiovisualAlertRequest. */
  interface IPlayAudiovisualAlertRequest {}

  /** Represents a PlayAudiovisualAlertRequest. */
  class PlayAudiovisualAlertRequest implements IPlayAudiovisualAlertRequest {
    /**
     * Constructs a new PlayAudiovisualAlertRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IPlayAudiovisualAlertRequest);

    /**
     * Creates a new PlayAudiovisualAlertRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PlayAudiovisualAlertRequest instance
     */
    public static create(
      properties?: PB_System.IPlayAudiovisualAlertRequest,
    ): PB_System.PlayAudiovisualAlertRequest;

    /**
     * Encodes the specified PlayAudiovisualAlertRequest message. Does not implicitly {@link PB_System.PlayAudiovisualAlertRequest.verify|verify} messages.
     * @param message PlayAudiovisualAlertRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IPlayAudiovisualAlertRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified PlayAudiovisualAlertRequest message, length delimited. Does not implicitly {@link PB_System.PlayAudiovisualAlertRequest.verify|verify} messages.
     * @param message PlayAudiovisualAlertRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IPlayAudiovisualAlertRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a PlayAudiovisualAlertRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PlayAudiovisualAlertRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.PlayAudiovisualAlertRequest;

    /**
     * Decodes a PlayAudiovisualAlertRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PlayAudiovisualAlertRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.PlayAudiovisualAlertRequest;

    /**
     * Verifies a PlayAudiovisualAlertRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a PlayAudiovisualAlertRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PlayAudiovisualAlertRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.PlayAudiovisualAlertRequest;

    /**
     * Creates a plain object from a PlayAudiovisualAlertRequest message. Also converts values to other types if specified.
     * @param message PlayAudiovisualAlertRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.PlayAudiovisualAlertRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this PlayAudiovisualAlertRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for PlayAudiovisualAlertRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a ProtobufVersionRequest. */
  interface IProtobufVersionRequest {}

  /** Represents a ProtobufVersionRequest. */
  class ProtobufVersionRequest implements IProtobufVersionRequest {
    /**
     * Constructs a new ProtobufVersionRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IProtobufVersionRequest);

    /**
     * Creates a new ProtobufVersionRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ProtobufVersionRequest instance
     */
    public static create(
      properties?: PB_System.IProtobufVersionRequest,
    ): PB_System.ProtobufVersionRequest;

    /**
     * Encodes the specified ProtobufVersionRequest message. Does not implicitly {@link PB_System.ProtobufVersionRequest.verify|verify} messages.
     * @param message ProtobufVersionRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IProtobufVersionRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified ProtobufVersionRequest message, length delimited. Does not implicitly {@link PB_System.ProtobufVersionRequest.verify|verify} messages.
     * @param message ProtobufVersionRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IProtobufVersionRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a ProtobufVersionRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ProtobufVersionRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.ProtobufVersionRequest;

    /**
     * Decodes a ProtobufVersionRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ProtobufVersionRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.ProtobufVersionRequest;

    /**
     * Verifies a ProtobufVersionRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ProtobufVersionRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ProtobufVersionRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.ProtobufVersionRequest;

    /**
     * Creates a plain object from a ProtobufVersionRequest message. Also converts values to other types if specified.
     * @param message ProtobufVersionRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.ProtobufVersionRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this ProtobufVersionRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ProtobufVersionRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a ProtobufVersionResponse. */
  interface IProtobufVersionResponse {
    /** ProtobufVersionResponse major */
    major?: number | null;

    /** ProtobufVersionResponse minor */
    minor?: number | null;
  }

  /** Represents a ProtobufVersionResponse. */
  class ProtobufVersionResponse implements IProtobufVersionResponse {
    /**
     * Constructs a new ProtobufVersionResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IProtobufVersionResponse);

    /** ProtobufVersionResponse major. */
    public major: number;

    /** ProtobufVersionResponse minor. */
    public minor: number;

    /**
     * Creates a new ProtobufVersionResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ProtobufVersionResponse instance
     */
    public static create(
      properties?: PB_System.IProtobufVersionResponse,
    ): PB_System.ProtobufVersionResponse;

    /**
     * Encodes the specified ProtobufVersionResponse message. Does not implicitly {@link PB_System.ProtobufVersionResponse.verify|verify} messages.
     * @param message ProtobufVersionResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IProtobufVersionResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified ProtobufVersionResponse message, length delimited. Does not implicitly {@link PB_System.ProtobufVersionResponse.verify|verify} messages.
     * @param message ProtobufVersionResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IProtobufVersionResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a ProtobufVersionResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ProtobufVersionResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.ProtobufVersionResponse;

    /**
     * Decodes a ProtobufVersionResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ProtobufVersionResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.ProtobufVersionResponse;

    /**
     * Verifies a ProtobufVersionResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ProtobufVersionResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ProtobufVersionResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.ProtobufVersionResponse;

    /**
     * Creates a plain object from a ProtobufVersionResponse message. Also converts values to other types if specified.
     * @param message ProtobufVersionResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.ProtobufVersionResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this ProtobufVersionResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ProtobufVersionResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of an UpdateRequest. */
  interface IUpdateRequest {
    /** UpdateRequest updateManifest */
    updateManifest?: string | null;
  }

  /** Represents an UpdateRequest. */
  class UpdateRequest implements IUpdateRequest {
    /**
     * Constructs a new UpdateRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IUpdateRequest);

    /** UpdateRequest updateManifest. */
    public updateManifest: string;

    /**
     * Creates a new UpdateRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UpdateRequest instance
     */
    public static create(
      properties?: PB_System.IUpdateRequest,
    ): PB_System.UpdateRequest;

    /**
     * Encodes the specified UpdateRequest message. Does not implicitly {@link PB_System.UpdateRequest.verify|verify} messages.
     * @param message UpdateRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IUpdateRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified UpdateRequest message, length delimited. Does not implicitly {@link PB_System.UpdateRequest.verify|verify} messages.
     * @param message UpdateRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IUpdateRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an UpdateRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UpdateRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.UpdateRequest;

    /**
     * Decodes an UpdateRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UpdateRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.UpdateRequest;

    /**
     * Verifies an UpdateRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an UpdateRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UpdateRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.UpdateRequest;

    /**
     * Creates a plain object from an UpdateRequest message. Also converts values to other types if specified.
     * @param message UpdateRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.UpdateRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this UpdateRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for UpdateRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of an UpdateResponse. */
  interface IUpdateResponse {
    /** UpdateResponse code */
    code?: PB_System.UpdateResponse.UpdateResultCode | null;
  }

  /** Represents an UpdateResponse. */
  class UpdateResponse implements IUpdateResponse {
    /**
     * Constructs a new UpdateResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IUpdateResponse);

    /** UpdateResponse code. */
    public code: PB_System.UpdateResponse.UpdateResultCode;

    /**
     * Creates a new UpdateResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns UpdateResponse instance
     */
    public static create(
      properties?: PB_System.IUpdateResponse,
    ): PB_System.UpdateResponse;

    /**
     * Encodes the specified UpdateResponse message. Does not implicitly {@link PB_System.UpdateResponse.verify|verify} messages.
     * @param message UpdateResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IUpdateResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified UpdateResponse message, length delimited. Does not implicitly {@link PB_System.UpdateResponse.verify|verify} messages.
     * @param message UpdateResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IUpdateResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes an UpdateResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns UpdateResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.UpdateResponse;

    /**
     * Decodes an UpdateResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns UpdateResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.UpdateResponse;

    /**
     * Verifies an UpdateResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates an UpdateResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns UpdateResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.UpdateResponse;

    /**
     * Creates a plain object from an UpdateResponse message. Also converts values to other types if specified.
     * @param message UpdateResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.UpdateResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this UpdateResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for UpdateResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  namespace UpdateResponse {
    /** UpdateResultCode enum. */
    enum UpdateResultCode {
      OK = 0,
      ManifestPathInvalid = 1,
      ManifestFolderNotFound = 2,
      ManifestInvalid = 3,
      StageMissing = 4,
      StageIntegrityError = 5,
      ManifestPointerError = 6,
      TargetMismatch = 7,
      OutdatedManifestVersion = 8,
      IntFull = 9,
      UnspecifiedError = 10,
    }
  }

  /** Properties of a PowerInfoRequest. */
  interface IPowerInfoRequest {}

  /** Represents a PowerInfoRequest. */
  class PowerInfoRequest implements IPowerInfoRequest {
    /**
     * Constructs a new PowerInfoRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IPowerInfoRequest);

    /**
     * Creates a new PowerInfoRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PowerInfoRequest instance
     */
    public static create(
      properties?: PB_System.IPowerInfoRequest,
    ): PB_System.PowerInfoRequest;

    /**
     * Encodes the specified PowerInfoRequest message. Does not implicitly {@link PB_System.PowerInfoRequest.verify|verify} messages.
     * @param message PowerInfoRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IPowerInfoRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified PowerInfoRequest message, length delimited. Does not implicitly {@link PB_System.PowerInfoRequest.verify|verify} messages.
     * @param message PowerInfoRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IPowerInfoRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a PowerInfoRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PowerInfoRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.PowerInfoRequest;

    /**
     * Decodes a PowerInfoRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PowerInfoRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.PowerInfoRequest;

    /**
     * Verifies a PowerInfoRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a PowerInfoRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PowerInfoRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.PowerInfoRequest;

    /**
     * Creates a plain object from a PowerInfoRequest message. Also converts values to other types if specified.
     * @param message PowerInfoRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.PowerInfoRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this PowerInfoRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for PowerInfoRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a PowerInfoResponse. */
  interface IPowerInfoResponse {
    /** PowerInfoResponse key */
    key?: string | null;

    /** PowerInfoResponse value */
    value?: string | null;
  }

  /** Represents a PowerInfoResponse. */
  class PowerInfoResponse implements IPowerInfoResponse {
    /**
     * Constructs a new PowerInfoResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_System.IPowerInfoResponse);

    /** PowerInfoResponse key. */
    public key: string;

    /** PowerInfoResponse value. */
    public value: string;

    /**
     * Creates a new PowerInfoResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PowerInfoResponse instance
     */
    public static create(
      properties?: PB_System.IPowerInfoResponse,
    ): PB_System.PowerInfoResponse;

    /**
     * Encodes the specified PowerInfoResponse message. Does not implicitly {@link PB_System.PowerInfoResponse.verify|verify} messages.
     * @param message PowerInfoResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_System.IPowerInfoResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified PowerInfoResponse message, length delimited. Does not implicitly {@link PB_System.PowerInfoResponse.verify|verify} messages.
     * @param message PowerInfoResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_System.IPowerInfoResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a PowerInfoResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PowerInfoResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_System.PowerInfoResponse;

    /**
     * Decodes a PowerInfoResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PowerInfoResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_System.PowerInfoResponse;

    /**
     * Verifies a PowerInfoResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a PowerInfoResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PowerInfoResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_System.PowerInfoResponse;

    /**
     * Creates a plain object from a PowerInfoResponse message. Also converts values to other types if specified.
     * @param message PowerInfoResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_System.PowerInfoResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this PowerInfoResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for PowerInfoResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }
}

/** Namespace PB_Gui. */
export namespace PB_Gui {
  /** InputKey enum. */
  enum InputKey {
    UP = 0,
    DOWN = 1,
    RIGHT = 2,
    LEFT = 3,
    OK = 4,
    BACK = 5,
  }

  /** InputType enum. */
  enum InputType {
    PRESS = 0,
    RELEASE = 1,
    SHORT = 2,
    LONG = 3,
    REPEAT = 4,
  }

  /** Properties of a ScreenFrame. */
  interface IScreenFrame {
    /** ScreenFrame data */
    data?: Uint8Array | null;
  }

  /** Represents a ScreenFrame. */
  class ScreenFrame implements IScreenFrame {
    /**
     * Constructs a new ScreenFrame.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gui.IScreenFrame);

    /** ScreenFrame data. */
    public data: Uint8Array;

    /**
     * Creates a new ScreenFrame instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ScreenFrame instance
     */
    public static create(properties?: PB_Gui.IScreenFrame): PB_Gui.ScreenFrame;

    /**
     * Encodes the specified ScreenFrame message. Does not implicitly {@link PB_Gui.ScreenFrame.verify|verify} messages.
     * @param message ScreenFrame message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gui.IScreenFrame,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified ScreenFrame message, length delimited. Does not implicitly {@link PB_Gui.ScreenFrame.verify|verify} messages.
     * @param message ScreenFrame message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gui.IScreenFrame,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a ScreenFrame message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ScreenFrame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gui.ScreenFrame;

    /**
     * Decodes a ScreenFrame message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ScreenFrame
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gui.ScreenFrame;

    /**
     * Verifies a ScreenFrame message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ScreenFrame message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ScreenFrame
     */
    public static fromObject(object: { [k: string]: any }): PB_Gui.ScreenFrame;

    /**
     * Creates a plain object from a ScreenFrame message. Also converts values to other types if specified.
     * @param message ScreenFrame
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gui.ScreenFrame,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this ScreenFrame to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ScreenFrame
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a StartScreenStreamRequest. */
  interface IStartScreenStreamRequest {}

  /** Represents a StartScreenStreamRequest. */
  class StartScreenStreamRequest implements IStartScreenStreamRequest {
    /**
     * Constructs a new StartScreenStreamRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gui.IStartScreenStreamRequest);

    /**
     * Creates a new StartScreenStreamRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StartScreenStreamRequest instance
     */
    public static create(
      properties?: PB_Gui.IStartScreenStreamRequest,
    ): PB_Gui.StartScreenStreamRequest;

    /**
     * Encodes the specified StartScreenStreamRequest message. Does not implicitly {@link PB_Gui.StartScreenStreamRequest.verify|verify} messages.
     * @param message StartScreenStreamRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gui.IStartScreenStreamRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified StartScreenStreamRequest message, length delimited. Does not implicitly {@link PB_Gui.StartScreenStreamRequest.verify|verify} messages.
     * @param message StartScreenStreamRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gui.IStartScreenStreamRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a StartScreenStreamRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns StartScreenStreamRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gui.StartScreenStreamRequest;

    /**
     * Decodes a StartScreenStreamRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns StartScreenStreamRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gui.StartScreenStreamRequest;

    /**
     * Verifies a StartScreenStreamRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a StartScreenStreamRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns StartScreenStreamRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Gui.StartScreenStreamRequest;

    /**
     * Creates a plain object from a StartScreenStreamRequest message. Also converts values to other types if specified.
     * @param message StartScreenStreamRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gui.StartScreenStreamRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this StartScreenStreamRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for StartScreenStreamRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a StopScreenStreamRequest. */
  interface IStopScreenStreamRequest {}

  /** Represents a StopScreenStreamRequest. */
  class StopScreenStreamRequest implements IStopScreenStreamRequest {
    /**
     * Constructs a new StopScreenStreamRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gui.IStopScreenStreamRequest);

    /**
     * Creates a new StopScreenStreamRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StopScreenStreamRequest instance
     */
    public static create(
      properties?: PB_Gui.IStopScreenStreamRequest,
    ): PB_Gui.StopScreenStreamRequest;

    /**
     * Encodes the specified StopScreenStreamRequest message. Does not implicitly {@link PB_Gui.StopScreenStreamRequest.verify|verify} messages.
     * @param message StopScreenStreamRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gui.IStopScreenStreamRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified StopScreenStreamRequest message, length delimited. Does not implicitly {@link PB_Gui.StopScreenStreamRequest.verify|verify} messages.
     * @param message StopScreenStreamRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gui.IStopScreenStreamRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a StopScreenStreamRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns StopScreenStreamRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gui.StopScreenStreamRequest;

    /**
     * Decodes a StopScreenStreamRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns StopScreenStreamRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gui.StopScreenStreamRequest;

    /**
     * Verifies a StopScreenStreamRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a StopScreenStreamRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns StopScreenStreamRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Gui.StopScreenStreamRequest;

    /**
     * Creates a plain object from a StopScreenStreamRequest message. Also converts values to other types if specified.
     * @param message StopScreenStreamRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gui.StopScreenStreamRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this StopScreenStreamRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for StopScreenStreamRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a SendInputEventRequest. */
  interface ISendInputEventRequest {
    /** SendInputEventRequest key */
    key?: PB_Gui.InputKey | null;

    /** SendInputEventRequest type */
    type?: PB_Gui.InputType | null;
  }

  /** Represents a SendInputEventRequest. */
  class SendInputEventRequest implements ISendInputEventRequest {
    /**
     * Constructs a new SendInputEventRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gui.ISendInputEventRequest);

    /** SendInputEventRequest key. */
    public key: PB_Gui.InputKey;

    /** SendInputEventRequest type. */
    public type: PB_Gui.InputType;

    /**
     * Creates a new SendInputEventRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SendInputEventRequest instance
     */
    public static create(
      properties?: PB_Gui.ISendInputEventRequest,
    ): PB_Gui.SendInputEventRequest;

    /**
     * Encodes the specified SendInputEventRequest message. Does not implicitly {@link PB_Gui.SendInputEventRequest.verify|verify} messages.
     * @param message SendInputEventRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gui.ISendInputEventRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified SendInputEventRequest message, length delimited. Does not implicitly {@link PB_Gui.SendInputEventRequest.verify|verify} messages.
     * @param message SendInputEventRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gui.ISendInputEventRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a SendInputEventRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SendInputEventRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gui.SendInputEventRequest;

    /**
     * Decodes a SendInputEventRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SendInputEventRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gui.SendInputEventRequest;

    /**
     * Verifies a SendInputEventRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a SendInputEventRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SendInputEventRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Gui.SendInputEventRequest;

    /**
     * Creates a plain object from a SendInputEventRequest message. Also converts values to other types if specified.
     * @param message SendInputEventRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gui.SendInputEventRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this SendInputEventRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for SendInputEventRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a StartVirtualDisplayRequest. */
  interface IStartVirtualDisplayRequest {
    /** StartVirtualDisplayRequest firstFrame */
    firstFrame?: PB_Gui.IScreenFrame | null;
  }

  /** Represents a StartVirtualDisplayRequest. */
  class StartVirtualDisplayRequest implements IStartVirtualDisplayRequest {
    /**
     * Constructs a new StartVirtualDisplayRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gui.IStartVirtualDisplayRequest);

    /** StartVirtualDisplayRequest firstFrame. */
    public firstFrame?: PB_Gui.IScreenFrame | null;

    /**
     * Creates a new StartVirtualDisplayRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StartVirtualDisplayRequest instance
     */
    public static create(
      properties?: PB_Gui.IStartVirtualDisplayRequest,
    ): PB_Gui.StartVirtualDisplayRequest;

    /**
     * Encodes the specified StartVirtualDisplayRequest message. Does not implicitly {@link PB_Gui.StartVirtualDisplayRequest.verify|verify} messages.
     * @param message StartVirtualDisplayRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gui.IStartVirtualDisplayRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified StartVirtualDisplayRequest message, length delimited. Does not implicitly {@link PB_Gui.StartVirtualDisplayRequest.verify|verify} messages.
     * @param message StartVirtualDisplayRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gui.IStartVirtualDisplayRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a StartVirtualDisplayRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns StartVirtualDisplayRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gui.StartVirtualDisplayRequest;

    /**
     * Decodes a StartVirtualDisplayRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns StartVirtualDisplayRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gui.StartVirtualDisplayRequest;

    /**
     * Verifies a StartVirtualDisplayRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a StartVirtualDisplayRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns StartVirtualDisplayRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Gui.StartVirtualDisplayRequest;

    /**
     * Creates a plain object from a StartVirtualDisplayRequest message. Also converts values to other types if specified.
     * @param message StartVirtualDisplayRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gui.StartVirtualDisplayRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this StartVirtualDisplayRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for StartVirtualDisplayRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a StopVirtualDisplayRequest. */
  interface IStopVirtualDisplayRequest {}

  /** Represents a StopVirtualDisplayRequest. */
  class StopVirtualDisplayRequest implements IStopVirtualDisplayRequest {
    /**
     * Constructs a new StopVirtualDisplayRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gui.IStopVirtualDisplayRequest);

    /**
     * Creates a new StopVirtualDisplayRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StopVirtualDisplayRequest instance
     */
    public static create(
      properties?: PB_Gui.IStopVirtualDisplayRequest,
    ): PB_Gui.StopVirtualDisplayRequest;

    /**
     * Encodes the specified StopVirtualDisplayRequest message. Does not implicitly {@link PB_Gui.StopVirtualDisplayRequest.verify|verify} messages.
     * @param message StopVirtualDisplayRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gui.IStopVirtualDisplayRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified StopVirtualDisplayRequest message, length delimited. Does not implicitly {@link PB_Gui.StopVirtualDisplayRequest.verify|verify} messages.
     * @param message StopVirtualDisplayRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gui.IStopVirtualDisplayRequest,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a StopVirtualDisplayRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns StopVirtualDisplayRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gui.StopVirtualDisplayRequest;

    /**
     * Decodes a StopVirtualDisplayRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns StopVirtualDisplayRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gui.StopVirtualDisplayRequest;

    /**
     * Verifies a StopVirtualDisplayRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a StopVirtualDisplayRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns StopVirtualDisplayRequest
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Gui.StopVirtualDisplayRequest;

    /**
     * Creates a plain object from a StopVirtualDisplayRequest message. Also converts values to other types if specified.
     * @param message StopVirtualDisplayRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gui.StopVirtualDisplayRequest,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this StopVirtualDisplayRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for StopVirtualDisplayRequest
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }
}

/** Namespace PB_Gpio. */
export namespace PB_Gpio {
  /** GpioPin enum. */
  enum GpioPin {
    PC0 = 0,
    PC1 = 1,
    PC3 = 2,
    PB2 = 3,
    PB3 = 4,
    PA4 = 5,
    PA6 = 6,
    PA7 = 7,
  }

  /** GpioPinMode enum. */
  enum GpioPinMode {
    OUTPUT = 0,
    INPUT = 1,
  }

  /** GpioInputPull enum. */
  enum GpioInputPull {
    NO = 0,
    UP = 1,
    DOWN = 2,
  }

  /** Properties of a SetPinMode. */
  interface ISetPinMode {
    /** SetPinMode pin */
    pin?: PB_Gpio.GpioPin | null;

    /** SetPinMode mode */
    mode?: PB_Gpio.GpioPinMode | null;
  }

  /** Represents a SetPinMode. */
  class SetPinMode implements ISetPinMode {
    /**
     * Constructs a new SetPinMode.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gpio.ISetPinMode);

    /** SetPinMode pin. */
    public pin: PB_Gpio.GpioPin;

    /** SetPinMode mode. */
    public mode: PB_Gpio.GpioPinMode;

    /**
     * Creates a new SetPinMode instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SetPinMode instance
     */
    public static create(properties?: PB_Gpio.ISetPinMode): PB_Gpio.SetPinMode;

    /**
     * Encodes the specified SetPinMode message. Does not implicitly {@link PB_Gpio.SetPinMode.verify|verify} messages.
     * @param message SetPinMode message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gpio.ISetPinMode,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified SetPinMode message, length delimited. Does not implicitly {@link PB_Gpio.SetPinMode.verify|verify} messages.
     * @param message SetPinMode message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gpio.ISetPinMode,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a SetPinMode message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SetPinMode
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gpio.SetPinMode;

    /**
     * Decodes a SetPinMode message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SetPinMode
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gpio.SetPinMode;

    /**
     * Verifies a SetPinMode message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a SetPinMode message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SetPinMode
     */
    public static fromObject(object: { [k: string]: any }): PB_Gpio.SetPinMode;

    /**
     * Creates a plain object from a SetPinMode message. Also converts values to other types if specified.
     * @param message SetPinMode
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gpio.SetPinMode,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this SetPinMode to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for SetPinMode
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a SetInputPull. */
  interface ISetInputPull {
    /** SetInputPull pin */
    pin?: PB_Gpio.GpioPin | null;

    /** SetInputPull pullMode */
    pullMode?: PB_Gpio.GpioInputPull | null;
  }

  /** Represents a SetInputPull. */
  class SetInputPull implements ISetInputPull {
    /**
     * Constructs a new SetInputPull.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gpio.ISetInputPull);

    /** SetInputPull pin. */
    public pin: PB_Gpio.GpioPin;

    /** SetInputPull pullMode. */
    public pullMode: PB_Gpio.GpioInputPull;

    /**
     * Creates a new SetInputPull instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SetInputPull instance
     */
    public static create(
      properties?: PB_Gpio.ISetInputPull,
    ): PB_Gpio.SetInputPull;

    /**
     * Encodes the specified SetInputPull message. Does not implicitly {@link PB_Gpio.SetInputPull.verify|verify} messages.
     * @param message SetInputPull message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gpio.ISetInputPull,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified SetInputPull message, length delimited. Does not implicitly {@link PB_Gpio.SetInputPull.verify|verify} messages.
     * @param message SetInputPull message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gpio.ISetInputPull,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a SetInputPull message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns SetInputPull
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gpio.SetInputPull;

    /**
     * Decodes a SetInputPull message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns SetInputPull
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gpio.SetInputPull;

    /**
     * Verifies a SetInputPull message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a SetInputPull message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns SetInputPull
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Gpio.SetInputPull;

    /**
     * Creates a plain object from a SetInputPull message. Also converts values to other types if specified.
     * @param message SetInputPull
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gpio.SetInputPull,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this SetInputPull to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for SetInputPull
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a GetPinMode. */
  interface IGetPinMode {
    /** GetPinMode pin */
    pin?: PB_Gpio.GpioPin | null;
  }

  /** Represents a GetPinMode. */
  class GetPinMode implements IGetPinMode {
    /**
     * Constructs a new GetPinMode.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gpio.IGetPinMode);

    /** GetPinMode pin. */
    public pin: PB_Gpio.GpioPin;

    /**
     * Creates a new GetPinMode instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GetPinMode instance
     */
    public static create(properties?: PB_Gpio.IGetPinMode): PB_Gpio.GetPinMode;

    /**
     * Encodes the specified GetPinMode message. Does not implicitly {@link PB_Gpio.GetPinMode.verify|verify} messages.
     * @param message GetPinMode message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gpio.IGetPinMode,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified GetPinMode message, length delimited. Does not implicitly {@link PB_Gpio.GetPinMode.verify|verify} messages.
     * @param message GetPinMode message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gpio.IGetPinMode,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a GetPinMode message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GetPinMode
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gpio.GetPinMode;

    /**
     * Decodes a GetPinMode message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GetPinMode
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gpio.GetPinMode;

    /**
     * Verifies a GetPinMode message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a GetPinMode message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GetPinMode
     */
    public static fromObject(object: { [k: string]: any }): PB_Gpio.GetPinMode;

    /**
     * Creates a plain object from a GetPinMode message. Also converts values to other types if specified.
     * @param message GetPinMode
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gpio.GetPinMode,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this GetPinMode to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for GetPinMode
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a GetPinModeResponse. */
  interface IGetPinModeResponse {
    /** GetPinModeResponse mode */
    mode?: PB_Gpio.GpioPinMode | null;
  }

  /** Represents a GetPinModeResponse. */
  class GetPinModeResponse implements IGetPinModeResponse {
    /**
     * Constructs a new GetPinModeResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gpio.IGetPinModeResponse);

    /** GetPinModeResponse mode. */
    public mode: PB_Gpio.GpioPinMode;

    /**
     * Creates a new GetPinModeResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GetPinModeResponse instance
     */
    public static create(
      properties?: PB_Gpio.IGetPinModeResponse,
    ): PB_Gpio.GetPinModeResponse;

    /**
     * Encodes the specified GetPinModeResponse message. Does not implicitly {@link PB_Gpio.GetPinModeResponse.verify|verify} messages.
     * @param message GetPinModeResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gpio.IGetPinModeResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified GetPinModeResponse message, length delimited. Does not implicitly {@link PB_Gpio.GetPinModeResponse.verify|verify} messages.
     * @param message GetPinModeResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gpio.IGetPinModeResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a GetPinModeResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns GetPinModeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gpio.GetPinModeResponse;

    /**
     * Decodes a GetPinModeResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns GetPinModeResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gpio.GetPinModeResponse;

    /**
     * Verifies a GetPinModeResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a GetPinModeResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns GetPinModeResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Gpio.GetPinModeResponse;

    /**
     * Creates a plain object from a GetPinModeResponse message. Also converts values to other types if specified.
     * @param message GetPinModeResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gpio.GetPinModeResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this GetPinModeResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for GetPinModeResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a ReadPin. */
  interface IReadPin {
    /** ReadPin pin */
    pin?: PB_Gpio.GpioPin | null;
  }

  /** Represents a ReadPin. */
  class ReadPin implements IReadPin {
    /**
     * Constructs a new ReadPin.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gpio.IReadPin);

    /** ReadPin pin. */
    public pin: PB_Gpio.GpioPin;

    /**
     * Creates a new ReadPin instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ReadPin instance
     */
    public static create(properties?: PB_Gpio.IReadPin): PB_Gpio.ReadPin;

    /**
     * Encodes the specified ReadPin message. Does not implicitly {@link PB_Gpio.ReadPin.verify|verify} messages.
     * @param message ReadPin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gpio.IReadPin,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified ReadPin message, length delimited. Does not implicitly {@link PB_Gpio.ReadPin.verify|verify} messages.
     * @param message ReadPin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gpio.IReadPin,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a ReadPin message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ReadPin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gpio.ReadPin;

    /**
     * Decodes a ReadPin message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ReadPin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gpio.ReadPin;

    /**
     * Verifies a ReadPin message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ReadPin message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ReadPin
     */
    public static fromObject(object: { [k: string]: any }): PB_Gpio.ReadPin;

    /**
     * Creates a plain object from a ReadPin message. Also converts values to other types if specified.
     * @param message ReadPin
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gpio.ReadPin,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this ReadPin to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ReadPin
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a ReadPinResponse. */
  interface IReadPinResponse {
    /** ReadPinResponse value */
    value?: number | null;
  }

  /** Represents a ReadPinResponse. */
  class ReadPinResponse implements IReadPinResponse {
    /**
     * Constructs a new ReadPinResponse.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gpio.IReadPinResponse);

    /** ReadPinResponse value. */
    public value: number;

    /**
     * Creates a new ReadPinResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ReadPinResponse instance
     */
    public static create(
      properties?: PB_Gpio.IReadPinResponse,
    ): PB_Gpio.ReadPinResponse;

    /**
     * Encodes the specified ReadPinResponse message. Does not implicitly {@link PB_Gpio.ReadPinResponse.verify|verify} messages.
     * @param message ReadPinResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gpio.IReadPinResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified ReadPinResponse message, length delimited. Does not implicitly {@link PB_Gpio.ReadPinResponse.verify|verify} messages.
     * @param message ReadPinResponse message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gpio.IReadPinResponse,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a ReadPinResponse message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns ReadPinResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gpio.ReadPinResponse;

    /**
     * Decodes a ReadPinResponse message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns ReadPinResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gpio.ReadPinResponse;

    /**
     * Verifies a ReadPinResponse message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a ReadPinResponse message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns ReadPinResponse
     */
    public static fromObject(object: {
      [k: string]: any;
    }): PB_Gpio.ReadPinResponse;

    /**
     * Creates a plain object from a ReadPinResponse message. Also converts values to other types if specified.
     * @param message ReadPinResponse
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gpio.ReadPinResponse,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this ReadPinResponse to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for ReadPinResponse
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  /** Properties of a WritePin. */
  interface IWritePin {
    /** WritePin pin */
    pin?: PB_Gpio.GpioPin | null;

    /** WritePin value */
    value?: number | null;
  }

  /** Represents a WritePin. */
  class WritePin implements IWritePin {
    /**
     * Constructs a new WritePin.
     * @param [properties] Properties to set
     */
    constructor(properties?: PB_Gpio.IWritePin);

    /** WritePin pin. */
    public pin: PB_Gpio.GpioPin;

    /** WritePin value. */
    public value: number;

    /**
     * Creates a new WritePin instance using the specified properties.
     * @param [properties] Properties to set
     * @returns WritePin instance
     */
    public static create(properties?: PB_Gpio.IWritePin): PB_Gpio.WritePin;

    /**
     * Encodes the specified WritePin message. Does not implicitly {@link PB_Gpio.WritePin.verify|verify} messages.
     * @param message WritePin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: PB_Gpio.IWritePin,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Encodes the specified WritePin message, length delimited. Does not implicitly {@link PB_Gpio.WritePin.verify|verify} messages.
     * @param message WritePin message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: PB_Gpio.IWritePin,
      writer?: $protobuf.Writer,
    ): $protobuf.Writer;

    /**
     * Decodes a WritePin message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns WritePin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number,
    ): PB_Gpio.WritePin;

    /**
     * Decodes a WritePin message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns WritePin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array,
    ): PB_Gpio.WritePin;

    /**
     * Verifies a WritePin message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a WritePin message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns WritePin
     */
    public static fromObject(object: { [k: string]: any }): PB_Gpio.WritePin;

    /**
     * Creates a plain object from a WritePin message. Also converts values to other types if specified.
     * @param message WritePin
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: PB_Gpio.WritePin,
      options?: $protobuf.IConversionOptions,
    ): { [k: string]: any };

    /**
     * Converts this WritePin to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for WritePin
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }
}
