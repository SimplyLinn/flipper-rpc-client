import {
  VersionRange,
  RpcApi,
  AllVersionsInRange,
  ParseVersionRange,
  DefaultMainParams,
  ResolveMainCtor,
  ResolveOptions,
  matchProtobufVersion,
  ResolveMain,
} from '@flipper-rpc-client/core';
import EventEmitter from 'events';
import {
  FIRST_VERSION,
  LATEST_VERSION,
  PROTOBUF_VERSION,
} from '@flipper-rpc-client/versioned-protobuf';
import RpcWebSerialPort from 'RpcWebSerialPort';

interface EventMap<Version extends VersionRange> {
  connect: [];
  disconnect: [];
  rpcCommandResponse: [messagess: ResolveMain<Version>[]];
  rpcMessage: [messages: ResolveMain<Version>[]];
  rpcReceived: [messages: ResolveMain<Version>[]];
  rpcPartialReceived: [message: ResolveMain<Version>];
}

interface Emitter<Version extends VersionRange> extends EventEmitter {
  addListener<Event extends keyof EventMap<Version>>(
    eventName: Event,
    listener: (...args: EventMap<Version>[Event]) => void,
  ): this;
  on<Event extends keyof EventMap<Version>>(
    eventName: Event,
    listener: (...args: EventMap<Version>[Event]) => void,
  ): this;
  once<Event extends keyof EventMap<Version>>(
    eventName: Event,
    listener: (...args: EventMap<Version>[Event]) => void,
  ): this;
  removeListener<Event extends keyof EventMap<Version>>(
    eventName: Event,
    listener: (...args: EventMap<Version>[Event]) => void,
  ): this;
  off<Event extends keyof EventMap<Version>>(
    eventName: Event,
    listener: (...args: EventMap<Version>[Event]) => void,
  ): this;
  removeAllListeners(event?: keyof EventMap<Version>): this;
  setMaxListeners(n: number): this;
  getMaxListeners(): number;
  listeners<Event extends keyof EventMap<Version>>(
    eventName: Event,
  ): ((...args: EventMap<Version>[Event]) => void)[];
  rawListeners<Event extends keyof EventMap<Version>>(
    eventName: Event,
  ): ((...args: EventMap<Version>[Event]) => void)[];
  emit<Event extends keyof EventMap<Version>>(
    eventName: Event,
    ...args: EventMap<Version>[Event]
  ): boolean;
  listenerCount<Event extends keyof EventMap<Version>>(
    eventName: Event,
    listener?: (...args: EventMap<Version>[Event]) => void,
  ): number;
  prependListener<Event extends keyof EventMap<Version>>(
    eventName: Event,
    listener: (...args: EventMap<Version>[Event]) => void,
  ): this;
  prependOnceListener<Event extends keyof EventMap<Version>>(
    eventName: Event,
    listener: (...args: EventMap<Version>[Event]) => void,
  ): this;
  eventNames(): (keyof EventMap<Version>)[];
}

class RpcApiEventEmitter<Version extends VersionRange>
  extends RpcApi<Version>
  implements Emitter<Version>
{
  #emitter: Emitter<Version>;
  constructor(
    ...args: [
      port: RpcWebSerialPort,
      version: AllVersionsInRange<ParseVersionRange<Version>>,
      Main: ResolveMainCtor<Version>,
      matchMode: matchProtobufVersion.Mode,
      ...defaultMainProperties: DefaultMainParams<Version>,
    ]
  ) {
    super(...args);
    this.#emitter = new EventEmitter() as Emitter<Version>;
    if (EventEmitter.captureRejectionSymbol in this.#emitter) {
      Object.assign(this, {
        [EventEmitter.captureRejectionSymbol](
          this: RpcApiEventEmitter<Version>,
          ...args: Parameters<
            NonNullable<
              Emitter<Version>[typeof EventEmitter.captureRejectionSymbol]
            >
          >
        ) {
          this.#emitter[EventEmitter.captureRejectionSymbol]?.(...args);
        },
      });
    }
  }

  [EventEmitter.captureRejectionSymbol]?(
    error: Error,
    event: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ): void;

  addListener<Event extends keyof EventMap<Version>>(
    ...args: [
      eventName: Event,
      listener: (...args: EventMap<Version>[Event]) => void,
    ]
  ): this {
    this.#emitter.addListener(...args);
    return this;
  }
  on<Event extends keyof EventMap<Version>>(
    ...args: [
      eventName: Event,
      listener: (...args: EventMap<Version>[Event]) => void,
    ]
  ): this {
    this.#emitter.on(...args);
    return this;
  }
  once<Event extends keyof EventMap<Version>>(
    ...args: [
      eventName: Event,
      listener: (...args: EventMap<Version>[Event]) => void,
    ]
  ): this {
    this.#emitter.once(...args);
    return this;
  }
  removeListener<Event extends keyof EventMap<Version>>(
    ...args: [
      eventName: Event,
      listener: (...args: EventMap<Version>[Event]) => void,
    ]
  ): this {
    this.#emitter.removeListener(...args);
    return this;
  }
  off<Event extends keyof EventMap<Version>>(
    ...args: [
      eventName: Event,
      listener: (...args: EventMap<Version>[Event]) => void,
    ]
  ): this {
    this.#emitter.off(...args);
    return this;
  }
  removeAllListeners(
    ...args: [event?: keyof EventMap<Version> | undefined]
  ): this {
    this.#emitter.removeAllListeners(...args);
    return this;
  }
  setMaxListeners(...args: [n: number]): this {
    this.#emitter.setMaxListeners(...args);
    return this;
  }
  getMaxListeners(...args: []): number {
    return this.#emitter.getMaxListeners(...args);
  }
  listeners<Event extends keyof EventMap<Version>>(
    ...args: [eventName: Event]
  ): ((...args: EventMap<Version>[Event]) => void)[] {
    return this.#emitter.listeners(...args);
  }
  rawListeners<Event extends keyof EventMap<Version>>(
    ...args: [eventName: Event]
  ): ((...args: EventMap<Version>[Event]) => void)[] {
    return this.#emitter.rawListeners(...args);
  }
  emit<Event extends keyof EventMap<Version>>(
    ...args: [eventName: Event, ...args: EventMap<Version>[Event]]
  ): boolean {
    return this.#emitter.emit(...args);
  }
  listenerCount<Event extends keyof EventMap<Version>>(
    ...args: [
      eventName: Event,
      listener?: ((...args: EventMap<Version>[Event]) => void) | undefined,
    ]
  ): number {
    return this.#emitter.listenerCount(...args);
  }
  prependListener<Event extends keyof EventMap<Version>>(
    ...args: [
      eventName: Event,
      listener: (...args: EventMap<Version>[Event]) => void,
    ]
  ): this {
    this.#emitter.prependListener(...args);
    return this;
  }
  prependOnceListener<Event extends keyof EventMap<Version>>(
    ...args: [
      eventName: Event,
      listener: (...args: EventMap<Version>[Event]) => void,
    ]
  ): this {
    this.#emitter.prependOnceListener(...args);
    return this;
  }
  eventNames(...args: []): (keyof EventMap<Version>)[] {
    return this.#emitter.eventNames(...args);
  }
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

export class RpcApiNode<
  Version extends VersionRange,
> extends RpcApiEventEmitter<Version> {
  private constructor(
    port: RpcWebSerialPort,
    version: AllVersionsInRange<ParseVersionRange<Version>>,
    Main: ResolveMainCtor<Version>,
    matchMode: matchProtobufVersion.Mode,
    ...defaultMainProperties: DefaultMainParams<Version>
  ) {
    super(port, version, Main, matchMode, ...defaultMainProperties);
  }

  protected setConnectionState(connected: boolean) {
    const ret = super.setConnectionState(connected);
    if (ret === true) {
      this.emit('connect');
    } else if (ret === false) {
      this.emit('disconnect');
    }
    return ret;
  }

  protected handleRpcData(res: ResolveMain<Version>) {
    this.emit('rpcPartialReceived', res);
    const maybeReses = super.handleRpcData(res);
    if (maybeReses != null) {
      this.emit('rpcReceived', maybeReses);
      if (res.commandId === 0) {
        this.emit('rpcMessage', maybeReses);
      } else {
        this.emit('rpcCommandResponse', maybeReses);
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
  ): Promise<RpcApiNode<[FIRST_VERSION, '...', LATEST_VERSION]>>;
  static async create<const Version extends PROTOBUF_VERSION>(
    port: RpcWebSerialPort,
    ...[options, defaultMainProperties]: CreateArgs<
      Version,
      | { version: Version; force?: boolean }
      | { version: Version; requireExactMatch?: boolean }
    >
  ): Promise<RpcApiNode<Version>>;
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
  ): Promise<RpcApiNode<[MinV, '...', LATEST_VERSION]>>;
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
  ): Promise<RpcApiNode<[FIRST_VERSION, '...', MaxV]>>;
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
  ): Promise<RpcApiNode<[MinV, '...', MaxV]>>;
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
  ): Promise<RpcApiNode<[FIRST_VERSION, '...', LATEST_VERSION]>>;
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
  ): Promise<RpcApiNode<[FIRST_VERSION, '...', LATEST_VERSION]>> {
    const { version, protobuf, matchMode } = await matchProtobufVersion(
      port,
      options,
    );
    return new RpcApiNode<[FIRST_VERSION, '...', LATEST_VERSION]>(
      port,
      version,
      protobuf.PB.Main,
      matchMode,
      ...defaultMainProperties,
    );
  }
}
