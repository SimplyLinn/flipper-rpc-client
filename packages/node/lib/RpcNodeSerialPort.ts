import { EventEmitter } from 'node:events';
import { RpcSerialPort } from '@flipper-rpc-client/core';
import { Duplex } from 'node:stream';

interface EventMap {
  connect: [];
  disconnect: [];
}

interface Emitter extends EventEmitter {
  addListener<Event extends keyof EventMap>(
    eventName: Event,
    listener: (...args: EventMap[Event]) => void,
  ): this;
  on<Event extends keyof EventMap>(
    eventName: Event,
    listener: (...args: EventMap[Event]) => void,
  ): this;
  once<Event extends keyof EventMap>(
    eventName: Event,
    listener: (...args: EventMap[Event]) => void,
  ): this;
  removeListener<Event extends keyof EventMap>(
    eventName: Event,
    listener: (...args: EventMap[Event]) => void,
  ): this;
  off<Event extends keyof EventMap>(
    eventName: Event,
    listener: (...args: EventMap[Event]) => void,
  ): this;
  removeAllListeners(event?: keyof EventMap): this;
  setMaxListeners(n: number): this;
  getMaxListeners(): number;
  listeners<Event extends keyof EventMap>(
    eventName: Event,
  ): ((...args: EventMap[Event]) => void)[];
  rawListeners<Event extends keyof EventMap>(
    eventName: Event,
  ): ((...args: EventMap[Event]) => void)[];
  emit<Event extends keyof EventMap>(
    eventName: Event,
    ...args: EventMap[Event]
  ): boolean;
  listenerCount<Event extends keyof EventMap>(
    eventName: Event,
    listener?: (...args: EventMap[Event]) => void,
  ): number;
  prependListener<Event extends keyof EventMap>(
    eventName: Event,
    listener: (...args: EventMap[Event]) => void,
  ): this;
  prependOnceListener<Event extends keyof EventMap>(
    eventName: Event,
    listener: (...args: EventMap[Event]) => void,
  ): this;
  eventNames(): (keyof EventMap)[];
}

abstract class RpcNodeSerialEventEmitter
  extends RpcSerialPort
  implements Emitter
{
  #emitter: Emitter;
  constructor(...args: []) {
    super(...args);
    this.#emitter = new EventEmitter() as Emitter;
    if (EventEmitter.captureRejectionSymbol in this.#emitter) {
      this[EventEmitter.captureRejectionSymbol] = function (
        ...args: Parameters<
          NonNullable<Emitter[typeof EventEmitter.captureRejectionSymbol]>
        >
      ) {
        this.#emitter[EventEmitter.captureRejectionSymbol]!(...args);
      };
    }
  }

  [EventEmitter.captureRejectionSymbol]?(
    error: Error,
    event: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ): void;

  addListener<Event extends keyof EventMap>(
    ...args: [eventName: Event, listener: (...args: EventMap[Event]) => void]
  ): this {
    this.#emitter.addListener(...args);
    return this;
  }
  on<Event extends keyof EventMap>(
    ...args: [eventName: Event, listener: (...args: EventMap[Event]) => void]
  ): this {
    this.#emitter.on(...args);
    return this;
  }
  once<Event extends keyof EventMap>(
    ...args: [eventName: Event, listener: (...args: EventMap[Event]) => void]
  ): this {
    this.#emitter.once(...args);
    return this;
  }
  removeListener<Event extends keyof EventMap>(
    ...args: [eventName: Event, listener: (...args: EventMap[Event]) => void]
  ): this {
    this.#emitter.removeListener(...args);
    return this;
  }
  off<Event extends keyof EventMap>(
    ...args: [eventName: Event, listener: (...args: EventMap[Event]) => void]
  ): this {
    this.#emitter.off(...args);
    return this;
  }
  removeAllListeners(...args: [event?: keyof EventMap | undefined]): this {
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
  listeners<Event extends keyof EventMap>(
    ...args: [eventName: Event]
  ): ((...args: EventMap[Event]) => void)[] {
    return this.#emitter.listeners(...args);
  }
  rawListeners<Event extends keyof EventMap>(
    ...args: [eventName: Event]
  ): ((...args: EventMap[Event]) => void)[] {
    return this.#emitter.rawListeners(...args);
  }
  emit<Event extends keyof EventMap>(
    ...args: [eventName: Event, ...args: EventMap[Event]]
  ): boolean {
    return this.#emitter.emit(...args);
  }
  listenerCount<Event extends keyof EventMap>(
    ...args: [
      eventName: Event,
      listener?: ((...args: EventMap[Event]) => void) | undefined,
    ]
  ): number {
    return this.#emitter.listenerCount(...args);
  }
  prependListener<Event extends keyof EventMap>(
    ...args: [eventName: Event, listener: (...args: EventMap[Event]) => void]
  ): this {
    this.#emitter.prependListener(...args);
    return this;
  }
  prependOnceListener<Event extends keyof EventMap>(
    ...args: [eventName: Event, listener: (...args: EventMap[Event]) => void]
  ): this {
    this.#emitter.prependOnceListener(...args);
    return this;
  }
  eventNames(...args: []): (keyof EventMap)[] {
    return this.#emitter.eventNames(...args);
  }
}

abstract class RpcNodeSerialPort extends RpcNodeSerialEventEmitter {
  #stream: Duplex | null = null;

  constructor() {
    super();
    this.onData = this.pushData.bind(this);
  }

  onData: (data: Uint8Array) => void;

  abstract getStream(): Promise<Duplex> | Duplex;

  write(chunk: Uint8Array, cb?: (error: Error | null | undefined) => void) {
    if (!this.isConnected) {
      throw new Error('Port not open');
    }
    if (this.#stream == null) {
      throw new Error('Port not writable');
    }
    this.#stream.write(chunk, cb);
  }

  async #makeDataStream() {
    if (this.#stream != null) {
      throw new Error('Data stream already initialized');
    }
    this.#stream = await this.getStream();
    this.#stream.on('data', this.onData);
  }

  protected async doOpen() {
    this._state =
      this._state === RpcSerialPort.State.DISCONNECTED
        ? RpcSerialPort.State.CONNECTING
        : this._state;
    try {
      await this.#makeDataStream();
    } catch (err) {
      this._state = RpcSerialPort.State.DISCONNECTED;
      throw err;
    }
    this._state = RpcSerialPort.State.CONNECTED;
    this.emit('connect');
  }

  /**
   * @override
   */
  protected async doClose(): Promise<void> {
    this._state = RpcSerialPort.State.DISCONNECTING;
    try {
      if (this.#stream) {
        const writer = this.#stream;
        this.#stream = null;
        writer.off('data', this.onData);
        writer.destroy();
      }
    } finally {
      this._state = RpcSerialPort.State.DISCONNECTED;
      this.emit('disconnect');
    }
  }
}

export default RpcNodeSerialPort;
