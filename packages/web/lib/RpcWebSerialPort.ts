import { RpcSerialPort } from '@flipper-rpc-client/core';

interface WebSerialEventTarget extends EventTarget {
  addEventListener(
    type: 'connect' | 'disconnect',
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: 'connect' | 'disconnect',
    callback: EventListenerOrEventListenerObject,
    options?: EventListenerOptions | boolean,
  ): void;
}

export abstract class RpcWebSerialPort
  extends RpcSerialPort
  implements WebSerialEventTarget
{
  #writer: WritableStreamDefaultWriter<Uint8Array> | null = null;
  #dstStream: WritableStream<Uint8Array> | null = null;

  constructor() {
    super();
  }

  #eventTarget = new EventTarget();

  abstract getStreams():
    | Promise<
        [
          readable: ReadableStream<Uint8Array>,
          writable: WritableStream<Uint8Array>,
        ]
      >
    | [
        readable: ReadableStream<Uint8Array>,
        writable: WritableStream<Uint8Array>,
      ];

  dispatchEvent(event: Event): boolean {
    return this.#eventTarget.dispatchEvent(event);
  }

  addEventListener(
    type: 'connect' | 'disconnect',
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    this.#eventTarget.addEventListener(type, listener, options);
  }

  removeEventListener(
    type: 'connect' | 'disconnect',
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    this.#eventTarget.removeEventListener(type, listener, options);
  }

  write(...args: Parameters<WritableStreamDefaultWriter<Uint8Array>['write']>) {
    if (!this.isConnected) {
      throw new Error('Port not open');
    }
    if (this.#writer == null) {
      throw new Error('Port not writable');
    }
    this.#writer.write(...args);
  }

  async #makeDataStream() {
    if (this.#dstStream != null) {
      throw new Error('Data stream already initialized');
    }
    const [readable, writable] = await this.getStreams();
    this.#writer = writable.getWriter();
    const dstStream = (this.#dstStream = new WritableStream<Uint8Array>({
      write: (chunk) => {
        this.pushData(chunk);
      },
    }));
    readable.pipeTo(dstStream);
  }

  protected async doOpen() {
    this._state = RpcSerialPort.State.CONNECTING;
    try {
      await this.#makeDataStream();
    } catch (err) {
      this._state = RpcSerialPort.State.DISCONNECTED;
      throw err;
    }
    this._state = RpcSerialPort.State.CONNECTED;
    this.dispatchEvent(new Event('connect'));
  }

  /**
   * @override
   */
  protected async doClose(): Promise<void> {
    this._state = RpcSerialPort.State.DISCONNECTING;
    try {
      this.#removeDataStream();
      if (this.#writer) {
        const writer = this.#writer;
        this.#writer = null;
        await writer.close();
      }
    } finally {
      this._state = RpcSerialPort.State.DISCONNECTED;
      this.dispatchEvent(new Event('disconnect'));
    }
  }

  async #removeDataStream() {
    if (this.#dstStream != null) {
      const dstStream = this.#dstStream;
      this.#dstStream = null;
      return dstStream.close();
    }
  }
}

export default RpcWebSerialPort;
