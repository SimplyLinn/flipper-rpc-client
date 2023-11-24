import { RpcSerialPort } from '@flipper-rpc-client/core';
import RpcNodeSerialPort from './RpcNodeSerialPort.js';
import { SerialPort } from 'serialport';
import { Duplex } from 'stream';

const startRpcSession = new Uint8Array([
  115, 116, 97, 114, 116, 95, 114, 112, 99, 95, 115, 101, 115, 115, 105, 111,
  110, 13, 10,
]);

class RpcUsbSerialPort extends RpcNodeSerialPort {
  #base: SerialPort;

  wrapsPort(base: SerialPort) {
    return this.#base === base;
  }

  constructor(base: SerialPort) {
    super();
    this.#base = base;
    const doOpen = () => {
      super.doOpen().catch((err) => {
        new Promise<void>((resolve, reject) => {
          this.#base.close((err) => {
            if (err) reject(err);
            else resolve();
          });
        }).catch((err) => console.error('ERROR WHILE CLOSING', err));
        console.error(err);
      });
    };
    if (this.#base.isOpen) {
      doOpen();
    } else if (this.#base.opening) {
      this.#base.on('open', () => {
        doOpen();
      });
    }
    this.#base.on('close', () => {
      this._state = RpcSerialPort.State.DISCONNECTED;
      this.detachConsumer();
    });
  }

  async getStream(): Promise<Duplex> {
    return new Promise<Duplex>((resolve, reject) => {
      let prevChunk = new Uint8Array(0);
      const onData = (chunk: Buffer) => {
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
            this.#base.off('data', onData);
            if (fullChunk.length > i + 1) {
              this.#base.unshift(fullChunk.slice(i + 1));
            }
            resolve(this.#base);
            return;
          }
        }
        prevChunk = new Uint8Array(
          Math.min(startRpcSession.length, fullChunk.length),
        );
        prevChunk.set(fullChunk.slice(fullChunk.length - prevChunk.length));
      };
      this.#base.write(startRpcSession.slice(0, -1), (err) => {
        if (err) reject(err);
        else this.#base.on('data', onData);
      });
    });
  }

  /**
   * @override
   */
  protected async doOpen(): Promise<void> {
    this._state = RpcSerialPort.State.CONNECTING;
    await new Promise<void>((resolve, reject) => {
      this.#base.open((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    try {
      return await super.doOpen();
    } catch (err) {
      await new Promise<void>((resolve, reject) => {
        this.#base.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      }).catch((err) => console.error('ERROR WHILE CLOSING', err));
      throw err;
    }
  }

  /**
   * @override
   */
  protected async doClose(): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        this.#base.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      }).catch((err) => console.error('ERROR WHILE CLOSING', err));
    } finally {
      await super.doClose();
    }
  }
}

export default RpcUsbSerialPort;
