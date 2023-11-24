import {
  VersionRange,
  RpcApi,
  AllVersionsInRange,
  ParseVersionRange,
  DefaultMainParams,
  ResolveOptions,
  matchProtobufVersion,
  ResolveMain,
  FIRST_VERSION,
  LATEST_VERSION,
  PROTOBUF_VERSION,
  ResolveVersion,
  ScreenFrame,
} from '@flipper-rpc-client/core';
import RpcWebSerialPort from './RpcWebSerialPort.js';
import RpcApiWebEvent from './RtcApiWebEvent.js';

class RpcApiWebEventEmitter<Version extends VersionRange>
  extends RpcApi<Version>
  implements EventTarget
{
  constructor(
    ...args: [
      port: RpcWebSerialPort,
      version: AllVersionsInRange<ParseVersionRange<Version>>,
      pbModule: ResolveVersion<Version>,
      matchMode: matchProtobufVersion.Mode,
      ...defaultMainProperties: DefaultMainParams<Version>,
    ]
  ) {
    super(...args);
    const eventTarget = new EventTarget();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    function addEventListener<
      const Type extends RpcApiWebEvent.AnyEvent<Version>['type'],
    >(
      type: Type,
      callback:
        | ((evt: RpcApiWebEvent.EventMap<Version>[Type]) => void)
        | {
            handleEvent(object: RpcApiWebEvent.EventMap<Version>[Type]): void;
          }
        | null,
      options?: boolean | AddEventListenerOptions | undefined,
    ): void;
    function addEventListener(
      this: RpcApiWebEventEmitter<Version> | EventTarget,
      ...args: [
        type: string,
        callback: EventListenerOrEventListenerObject | null,
        options?: boolean | AddEventListenerOptions | undefined,
      ]
    ) {
      return eventTarget.addEventListener.call(
        this === self ? eventTarget : this,
        ...args,
      );
    }
    this.addEventListener = addEventListener;
    function dispatchEvent(
      this: RpcApiWebEventEmitter<Version> | EventTarget,
      ...args: [event: Event]
    ) {
      return eventTarget.dispatchEvent.call(
        this === self ? eventTarget : this,
        ...args,
      );
    }
    this.dispatchEvent = dispatchEvent;
    function removeEventListener<
      const Type extends RpcApiWebEvent.AnyEvent<Version>['type'],
    >(
      type: Type,
      callback:
        | ((evt: RpcApiWebEvent.EventMap<Version>[Type]) => void)
        | {
            handleEvent(object: RpcApiWebEvent.EventMap<Version>[Type]): void;
          }
        | null,
      options?: boolean | EventListenerOptions | undefined,
    ): void;
    function removeEventListener(
      this: RpcApiWebEventEmitter<Version> | EventTarget,
      ...args: [
        type: string,
        callback: EventListenerOrEventListenerObject | null,
        options?: boolean | EventListenerOptions | undefined,
      ]
    ) {
      return eventTarget.removeEventListener.call(
        this === self ? eventTarget : this,
        ...args,
      );
    }
    this.removeEventListener = removeEventListener;
  }

  addEventListener: <
    const Type extends RpcApiWebEvent.AnyEvent<Version>['type'],
  >(
    type: Type,
    callback:
      | ((evt: RpcApiWebEvent.EventMap<Version>[Type]) => void)
      | {
          handleEvent(object: RpcApiWebEvent.EventMap<Version>[Type]): void;
        }
      | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ) => void;

  dispatchEvent: (event: RpcApiWebEvent.AnyEvent<Version>) => boolean;

  removeEventListener: <
    const Type extends RpcApiWebEvent.AnyEvent<Version>['type'],
  >(
    type: Type,
    callback:
      | ((evt: RpcApiWebEvent.EventMap<Version>[Type]) => void)
      | {
          handleEvent(object: RpcApiWebEvent.EventMap<Version>[Type]): void;
        }
      | null,
    options?: boolean | EventListenerOptions | undefined,
  ) => void;
}

type CreateArgs<
  Version extends VersionRange,
  Options,
  // eslint-disable-next-line @typescript-eslint/ban-types
> = {} extends ResolveOptions<Version>
  ? Options extends undefined
    ? [
        options?: Options,
        defaultMainProperties?: {
          [key in keyof Omit<
            ResolveOptions<Version>,
            'commandId' | 'hasNext'
          >]: ResolveOptions<Version>[key];
        },
      ]
    : [
        options: Options,
        defaultMainProperties?: {
          [key in keyof Omit<
            ResolveOptions<Version>,
            'commandId' | 'hasNext'
          >]: ResolveOptions<Version>[key];
        },
      ]
  : [
      options: Options,
      defaultMainProperties: {
        [key in keyof Omit<
          ResolveOptions<Version>,
          'commandId' | 'hasNext'
        >]: ResolveOptions<Version>[key];
      },
    ];

class RpcApiWeb<
  Version extends VersionRange,
> extends RpcApiWebEventEmitter<Version> {
  private constructor(
    port: RpcWebSerialPort,
    version: AllVersionsInRange<ParseVersionRange<Version>>,
    pbModule: ResolveVersion<Version>,
    matchMode: matchProtobufVersion.Mode,
    ...defaultMainProperties: DefaultMainParams<Version>
  ) {
    super(port, version, pbModule, matchMode, ...defaultMainProperties);
  }
  protected setConnectionState(connected: true): boolean;
  protected setConnectionState(
    connected: false,
    reason?: Error | null,
  ): boolean;
  protected setConnectionState(
    connected: boolean,
    reason?: Error | null,
  ): boolean;
  protected setConnectionState(connected: boolean) {
    const ret = super.setConnectionState(connected);
    if (ret === true) {
      this.dispatchEvent(new RpcApiWebEvent.ConnectEvent(this));
    } else if (ret === false) {
      this.dispatchEvent(new RpcApiWebEvent.DisconnectEvent(this, null));
    }
    return ret;
  }

  protected handleRpcData(res: ResolveMain<Version>) {
    this.dispatchEvent(new RpcApiWebEvent.RpcPartialReceived(this, res));
    const maybeReses = super.handleRpcData(res);
    if (maybeReses != null) {
      this.dispatchEvent(new RpcApiWebEvent.RpcReceivedEvent(this, maybeReses));
      if (res.commandId === 0) {
        this.dispatchEvent(
          new RpcApiWebEvent.RpcMessageEvent(this, maybeReses),
        );
        if (res.content === 'guiScreenFrame') {
          this.dispatchEvent(
            new RpcApiWebEvent.ScreenFrameEvent(
              ScreenFrame.fromMessages(maybeReses),
            ),
          );
        }
      } else {
        this.dispatchEvent(
          new RpcApiWebEvent.RpcCommandResponseEvent(this, maybeReses),
        );
      }
    }
    return maybeReses;
  }

  static async create(
    port: RpcWebSerialPort,
    ...[options, defaultMainProperties]: CreateArgs<
      [FIRST_VERSION, '...', LATEST_VERSION],
      null | undefined
    >
  ): Promise<RpcApiWeb<[FIRST_VERSION, '...', LATEST_VERSION]>>;
  static async create<const Version extends PROTOBUF_VERSION>(
    port: RpcWebSerialPort,
    ...[options, defaultMainProperties]: CreateArgs<
      Version,
      | { version: Version; force?: boolean }
      | { version: Version; requireExactMatch?: boolean }
    >
  ): Promise<RpcApiWeb<Version>>;
  static async create<const MinV extends PROTOBUF_VERSION>(
    port: RpcWebSerialPort,
    ...[options, defaultMainProperties]: CreateArgs<
      [MinV, '...', LATEST_VERSION],
      | { minVersion: MinV; requireExactMatch?: boolean }
      | {
          minVersion: MinV;
          fallbackVersion?: AllVersionsInRange<[MinV, '...', LATEST_VERSION]>;
        }
    >
  ): Promise<RpcApiWeb<[MinV, '...', LATEST_VERSION]>>;
  static async create<const MaxV extends PROTOBUF_VERSION>(
    port: RpcWebSerialPort,
    ...[options, defaultMainProperties]: CreateArgs<
      [FIRST_VERSION, '...', MaxV],
      | { maxVersion: MaxV; requireExactMatch?: boolean }
      | {
          maxVersion: MaxV;
          fallbackVersion?: AllVersionsInRange<[FIRST_VERSION, '...', MaxV]>;
        }
    >
  ): Promise<RpcApiWeb<[FIRST_VERSION, '...', MaxV]>>;
  static async create<
    const MinV extends PROTOBUF_VERSION,
    const MaxV extends PROTOBUF_VERSION,
  >(
    port: RpcWebSerialPort,
    ...[options, defaultMainProperties]: CreateArgs<
      [MinV, '...', MaxV],
      | { minVersion: MinV; maxVersion: MaxV; requireExactMatch?: boolean }
      | {
          maxVersion: MaxV;
          fallbackVersion?: AllVersionsInRange<[MinV, '...', MaxV]>;
        }
    >
  ): Promise<RpcApiWeb<[MinV, '...', MaxV]>>;
  static async create(
    port: RpcWebSerialPort,
    ...[options, ...defaultMainProperties]: CreateArgs<
      [FIRST_VERSION, '...', LATEST_VERSION],
      | {
          requireExactMatch?: boolean;
          fallbackVersion?: PROTOBUF_VERSION;
        }
      | null
      | undefined
    >
  ): Promise<RpcApiWeb<[FIRST_VERSION, '...', LATEST_VERSION]>>;
  static async create(
    port: RpcWebSerialPort,
    ...[options, ...defaultMainProperties]: CreateArgs<
      [FIRST_VERSION, '...', LATEST_VERSION],
      | { version: PROTOBUF_VERSION; force?: boolean }
      | { version: PROTOBUF_VERSION; requireExactMatch?: boolean }
      | {
          minVersion?: PROTOBUF_VERSION;
          maxVersion?: PROTOBUF_VERSION;
          requireExactMatch?: boolean;
          fallbackVersion?: PROTOBUF_VERSION;
        }
      | null
      | undefined
    >
  ): Promise<RpcApiWeb<[FIRST_VERSION, '...', LATEST_VERSION]>> {
    const { version, protobuf, matchMode } = await matchProtobufVersion(
      port,
      options,
    );
    return new RpcApiWeb<[FIRST_VERSION, '...', LATEST_VERSION]>(
      port,
      version,
      protobuf,
      matchMode,
      ...defaultMainProperties,
    );
  }
}

export default RpcApiWeb;
