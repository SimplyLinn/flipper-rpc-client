abstract class RpcSerialPort {
  name?: string;
  protected _state: RpcSerialPort.State = RpcSerialPort.State.DISCONNECTED;
  protected connectionPromise: Promise<void> = Promise.resolve();
  #buffer: Uint8Array[] = [];
  #dataConsumer?: {
    consumer(chunk: Uint8Array): void | Promise<void>;
    onDetach?(): void;
  } | null = null;
  #isFlushingBuffer = false;

  get isConnected() {
    return this._state === RpcSerialPort.State.CONNECTED;
  }

  get state() {
    return this._state;
  }

  abstract write(chunk?: Uint8Array): void;

  protected maybeFlushBuffer() {
    if (this.#isFlushingBuffer || this.#dataConsumer == null) {
      return;
    }
    this.#isFlushingBuffer = true;
    (async () => {
      let i;
      try {
        for (
          i = 0;
          i < this.#buffer.length && this.#dataConsumer != null;
          i++
        ) {
          // Allow previous chunks to be garbage collected
          // if a long history is building up.
          if (i > 200) {
            this.#buffer.splice(0, i);
            i = 0;
          }
          const chunk = this.#buffer.shift()!;
          await this.#dataConsumer.consumer(chunk);
        }
      } finally {
        if (i === this.#buffer.length) {
          this.#buffer.length = 0;
        } else {
          this.#buffer.splice(0, i);
        }
      }
    })().finally(() => {
      this.#isFlushingBuffer = false;
    });
  }

  unshiftData(chunk: Uint8Array) {
    this.#buffer.unshift(chunk);
    this.maybeFlushBuffer();
  }

  pushData(chunk: Uint8Array) {
    this.#buffer.push(chunk);
    this.maybeFlushBuffer();
  }

  detachConsumer(consumer?: (chunk: Uint8Array) => void): boolean {
    if (this.#dataConsumer == null) return false;
    if (consumer && this.#dataConsumer.consumer !== consumer) return false;
    const oldConsumer = this.#dataConsumer;
    this.#dataConsumer = null;
    oldConsumer.onDetach?.();
    return true;
  }

  attachConsumer(output: (chunk: Uint8Array) => void, onDetach?: () => void) {
    const oldConsumer = this.#dataConsumer;
    this.#dataConsumer = {
      consumer: output,
      onDetach,
    };
    oldConsumer?.onDetach?.();
  }

  protected abstract doOpen(): Promise<void>;

  async open(): Promise<void> {
    if (this._state === RpcSerialPort.State.CONNECTED) {
      return;
    }
    if (this._state === RpcSerialPort.State.CONNECTING) {
      await this.connectionPromise;
      return;
    }
    if (this._state === RpcSerialPort.State.DISCONNECTING) {
      await this.connectionPromise;
      return this.open();
    }
    if (this._state !== RpcSerialPort.State.DISCONNECTED) {
      throw new Error('Invalid state');
    }
    await (this.connectionPromise = this.doOpen());
  }

  protected abstract doClose(): Promise<void>;

  async close(): Promise<void> {
    if (this._state === RpcSerialPort.State.DISCONNECTED) {
      return;
    }
    if (this._state === RpcSerialPort.State.DISCONNECTING) {
      await this.connectionPromise;
      return;
    }
    if (this._state !== RpcSerialPort.State.CONNECTED) {
      await this.connectionPromise;
      return this.close();
    }
    await (this.connectionPromise = this.doClose());
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace RpcSerialPort {
  export enum State {
    DISCONNECTING = 'Disconnecting',
    DISCONNECTED = 'Disconnected',
    CONNECTING = 'Connecting',
    CONNECTED = 'Connected',
  }
}

export default RpcSerialPort;
