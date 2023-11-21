import { RpcSerialPort } from '@flipper-rpc-client/core';
import RpcWebSerialPort from './RpcWebSerialPort';

const portById = new Map<string, RpcUsbSerialPort>();

function getId() {
  let id: string;
  do {
    id = Math.random().toString(36).slice(2, 13).padEnd(11, '0');
  } while (portById.has(id));
  return id;
}

const startRpcSession = new Uint8Array([
  115, 116, 97, 114, 116, 95, 114, 112, 99, 95, 115, 101, 115, 115, 105, 111,
  110, 13, 10,
]);

export class RpcUsbSerialPort extends RpcWebSerialPort {
  static byId(id: string): RpcUsbSerialPort | null {
    return portById.get(id) ?? null;
  }
  static async prune() {
    const ports = await navigator.serial.getPorts();
    for (const [id, port] of portById) {
      if (!ports.some(port.wrapsPort, port)) {
        portById.delete(id);
      }
    }
  }
  static resolve(basePort: SerialPort) {
    for (const port of portById.values()) {
      if (port.wrapsPort(basePort)) {
        return port;
      }
    }
    if (basePort instanceof SerialPort) {
      return new RpcUsbSerialPort(basePort);
    }
    throw new Error('Invalid port');
  }

  #base: SerialPort;
  #id = getId();

  wrapsPort(base: SerialPort) {
    return this.#base === base;
  }

  constructor(base: SerialPort) {
    super();
    this.#base = base;
    portById.set(this.#id, this);
  }

  get id(): string {
    return this.#id;
  }

  async getStreams(): Promise<
    [readable: ReadableStream<Uint8Array>, WritableStream<Uint8Array>]
  > {
    return new Promise<
      [
        readable: ReadableStream<Uint8Array>,
        writable: WritableStream<Uint8Array>,
      ]
    >((resolve, reject) => {
      let prevChunk = new Uint8Array(0);
      let isClosed = false;
      const { readable, writable } = this.#base;
      if (readable == null) {
        reject(new Error('No readable stream'));
        return;
      }
      if (writable == null) {
        reject(new Error('No writable stream'));
        return;
      }
      const transformStream = new TransformStream<Uint8Array>({
        transform: (chunk, controller) => {
          if (isClosed) {
            controller.enqueue(chunk);
            return;
          }
          const fullChunk = new Uint8Array(prevChunk.length + chunk.length);
          fullChunk.set(prevChunk);
          fullChunk.set(chunk, prevChunk.length);
          for (let i = 0, needleIndex = 0; i < fullChunk.length; i++) {
            if (fullChunk[i] === startRpcSession[needleIndex]) {
              needleIndex++;
            } else {
              needleIndex = 0;
            }
            if (needleIndex === startRpcSession.length) {
              isClosed = true;
              if (fullChunk.length > i + 1) {
                controller.enqueue(fullChunk.slice(i + 1));
              }
              return;
            }
          }
          prevChunk = new Uint8Array(
            Math.min(startRpcSession.length, fullChunk.length),
          );
          prevChunk.set(fullChunk.slice(fullChunk.length - prevChunk.length));
        },
      });
      if (writable == null) {
        throw new Error('No writable stream');
      }
      readable.pipeTo(transformStream.writable);
      const writer = writable.getWriter();
      writer.write(startRpcSession.slice(0, -1)).then(() => {
        writer.releaseLock();
        resolve([transformStream.readable, writable]);
      }, reject);
    });
  }

  /**
   * @override
   */
  protected async doOpen(): Promise<void> {
    this._state = RpcSerialPort.State.CONNECTING;
    await this.#base.open({
      baudRate: 1,
    });
    try {
      return await super.doOpen();
    } catch (err) {
      await this.#base
        .close()
        .catch((err) => console.error('ERROR WHILE CLOSING', err));
      throw err;
    }
  }

  /**
   * @override
   */
  protected async doClose(): Promise<void> {
    try {
      return await super.doClose();
    } finally {
      await this.#base
        .close()
        .catch((err) => console.error('ERROR WHILE CLOSING', err));
    }
  }
}

export default RpcUsbSerialPort;
