import {
  PROTOBUF_VERSION,
  PROTOBUF_VERSION_MAP,
  RpcSerialPort,
  loadVersion,
} from '@';
import deviceInfoData from '@mocks/device_info_data';
import $protobuf from 'protobufjs/minimal';
import EventEmitter from 'events';

const protoCache = new WeakMap<object, any>();

abstract class EventSerialPort<T = never>
  extends RpcSerialPort
  implements EventEmitter
{
  constructor(...args: ConstructorParameters<typeof RpcSerialPort>) {
    let ctor: any = RpcSerialPort;
    do {
      const nextCtor = Object.getPrototypeOf(ctor);
      if (nextCtor === Function.prototype) {
        break;
      }
      ctor = nextCtor;
    } while (ctor !== null);
    if (!ctor) {
      throw new Error('No constructor found');
    }
    if (Object.getPrototypeOf(ctor.prototype) !== Object.prototype) {
      throw new Error('Invalid base constructor prototype');
    }
    try {
      Object.setPrototypeOf(ctor, EventEmitter);
      Object.setPrototypeOf(ctor.prototype, EventEmitter.prototype);
      const o = Reflect.construct(RpcSerialPort, args, new.target);
      const oldProto = Object.getPrototypeOf(o);
      let newProto = protoCache.get(oldProto);
      if (!newProto) {
        newProto = Object.create(
          oldProto,
          Object.getOwnPropertyDescriptors(EventEmitter.prototype),
        );
        protoCache.set(oldProto, newProto);
      }
      Object.setPrototypeOf(o, newProto);
      return o;
    } finally {
      Object.setPrototypeOf(ctor, Function.prototype);
      Object.setPrototypeOf(ctor.prototype, Object.prototype);
    }
    super(...args);
  }
  [EventEmitter.captureRejectionSymbol]?(
    error: Error,
    event: string,
    ...args: any[]
  ): void;
  [EventEmitter.captureRejectionSymbol]?(): void {
    throw new Error('Method not implemented.');
  }
  addListener(eventName: 'message', listener: (msg: T) => void): this;
  addListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this;
  addListener(): this {
    throw new TypeError(
      `Method EventSerialPort.addListener called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  on(eventName: 'message', listener: (msg: T) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(): this {
    throw new TypeError(
      `Method EventSerialPort.on called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  once(eventName: 'message', listener: (msg: T) => void): this;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  once(): this {
    throw new TypeError(
      `Method EventSerialPort.once called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  removeListener(eventName: 'message', listener: (msg: T) => void): this;
  removeListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this;
  removeListener(): this {
    throw new TypeError(
      `Method EventSerialPort.removeListener called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  off(eventName: 'message', listener: (msg: T) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(): this {
    throw new TypeError(
      `Method EventSerialPort.off called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  removeAllListeners(event?: string | symbol | undefined): this;
  removeAllListeners(): this {
    throw new TypeError(
      `Method EventSerialPort.removeAllListeners called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  setMaxListeners(n: number): this;
  setMaxListeners(): this {
    throw new TypeError(
      `Method EventSerialPort.setMaxListeners called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  getMaxListeners(): number;
  getMaxListeners(): number {
    throw new TypeError(
      `Method EventSerialPort.getMaxListeners called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  listeners(eventName: 'message'): ((msg: T) => void)[];
  listeners(eventName: string | symbol): Function[];
  listeners(): Function[] {
    throw new TypeError(
      `Method EventSerialPort.listeners called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  rawListeners(eventName: string | symbol): Function[];
  rawListeners(): Function[] {
    throw new TypeError(
      `Method EventSerialPort.rawListeners called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  emit(eventName: string | symbol, ...args: any[]): boolean;
  emit(): boolean {
    throw new TypeError(
      `Method EventSerialPort.emit called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  listenerCount(
    eventName: string | symbol,
    listener?: Function | undefined,
  ): number;
  listenerCount(): number {
    throw new TypeError(
      `Method EventSerialPort.listenerCount called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  prependListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this;
  prependListener(): this {
    throw new TypeError(
      `Method EventSerialPort.prependListener called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  prependOnceListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this;
  prependOnceListener(): this {
    throw new TypeError(
      `Method EventSerialPort.prependOnceListener called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
  eventNames(): (string | symbol)[];
  eventNames(): (string | symbol)[] {
    throw new TypeError(
      `Method EventSerialPort.eventNames called on an incompatible receiver ${Object.prototype.toString.call(
        this,
      )}`,
    );
  }
}
Reflect.ownKeys(EventSerialPort.prototype).forEach((key) => {
  if (Object.prototype.hasOwnProperty.call(EventSerialPort.prototype, key)) {
    delete (EventSerialPort.prototype as any)[key];
  }
});

export class MockRpcSerialPort<
  T extends {
    PB: {
      Main: {
        decodeDelimited(data: Uint8Array, reader?: $protobuf.Reader): any;
      };
    };
  } = never,
> extends EventSerialPort<
  T extends {
    PB: {
      Main: {
        decodeDelimited(data: Uint8Array, reader?: $protobuf.Reader): infer U;
      };
    };
  }
    ? U
    : never
> {
  readonly ProtoModule: T = null as never;

  registerDecoder(newProtoModule: T): this;
  registerDecoder<
    U extends {
      PB: {
        Main: {
          decodeDelimited(data: Uint8Array, reader?: $protobuf.Reader): any;
        };
      };
    },
  >(newProtoModule: U): MockRpcSerialPort<U>;
  registerDecoder(newProtoModule: {
    PB: {
      Main: {
        decodeDelimited(data: Uint8Array, reader?: $protobuf.Reader): any;
      };
    };
  }): this {
    Object.assign(this, { ProtoModule: newProtoModule });
    return this;
  }

  prevChunk = new Uint8Array(0);

  write(chunk: Uint8Array) {
    const oldPrevChunk = this.prevChunk;
    this.prevChunk = new Uint8Array(this.prevChunk.length + chunk.length);
    this.prevChunk.set(oldPrevChunk);
    this.prevChunk.set(chunk, oldPrevChunk.length);
    if (this.ProtoModule === null) {
      throw new Error('MainClass not registered');
    }
    try {
      const reader = $protobuf.Reader.create(this.prevChunk);
      const data = this.ProtoModule.PB.Main.decodeDelimited(
        this.prevChunk,
        reader,
      );
      this.prevChunk = reader.buf.slice(reader.pos);
      this.emit('message', data);
    } catch (err) {
      if (
        err instanceof RangeError &&
        err.message.startsWith('index out of range:')
      ) {
        // ignore
      }
      throw err;
    }
  }

  doOpen() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this._state = RpcSerialPort.State.CONNECTED;
        resolve();
      }, 100);
    });
  }
  doClose() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this._state = RpcSerialPort.State.DISCONNECTED;
        resolve();
      }, 100);
    });
  }
}

async function createMock<Version extends PROTOBUF_VERSION>(
  version: Version,
): Promise<
  MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
    registeredMocks: Set<Function>;
  }
>;
async function createMock<Version extends PROTOBUF_VERSION>(
  version: MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
  },
): Promise<
  MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
    registeredMocks: Set<Function>;
  }
>;
async function createMock<Version extends PROTOBUF_VERSION>(
  versionOrMock:
    | Version
    | (MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
        version: Version;
        registeredMocks?: Set<Function>;
      }),
): Promise<
  MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
    registeredMocks: Set<Function>;
  }
>;
async function createMock<Version extends PROTOBUF_VERSION>(
  versionOrMock:
    | Version
    | (MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
        version: Version;
        registeredMocks?: Set<Function>;
      }),
) {
  let port;
  if (typeof versionOrMock === 'string') {
    port = await loadVersion(versionOrMock).then((module) => {
      const port = new MockRpcSerialPort().registerDecoder<
        PROTOBUF_VERSION_MAP[Version]
      >(module);
      const extendedPort = Object.assign(port, {
        version: versionOrMock,
        registeredMocks: new Set<Function>(),
      });
      return createMock(extendedPort);
    });
  } else {
    port = versionOrMock;
  }
  if (port.registeredMocks === undefined) {
    port.registeredMocks = new Set<Function>();
  }
  return port;
}

async function systemDeviceInfoMock<Version extends PROTOBUF_VERSION>(
  version: Version,
): Promise<
  MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
  }
>;
async function systemDeviceInfoMock<Version extends PROTOBUF_VERSION>(
  version: MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
  },
): Promise<
  MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
  }
>;
async function systemDeviceInfoMock<Version extends PROTOBUF_VERSION>(
  versionOrMock:
    | Version
    | (MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
        version: Version;
      }),
) {
  const port = await createMock<Version>(versionOrMock);
  if (port.registeredMocks.has(systemDeviceInfoMock)) {
    return port;
  }
  port.registeredMocks.add(systemDeviceInfoMock);
  port.on('message', (msg) => {
    if (msg.content !== 'systemDeviceInfoRequest') return;
    const [major, minor] = port.version.split('.');
    const resData = Object.entries({
      ...deviceInfoData(),
      ...(port.version !== '0.1'
        ? {
            protobuf_version_major: major,
            protobuf_version_minor: minor,
          }
        : null),
    });
    const dataToSend: InstanceType<typeof port.ProtoModule.PB.Main>[] = [];
    const lastData = resData.pop();
    for (const [key, value] of resData) {
      dataToSend.push(
        port.ProtoModule.PB.Main.create({
          commandId: msg.commandId,
          hasNext: true,
          commandStatus: port.ProtoModule.PB.CommandStatus.OK as any,
          systemDeviceInfoResponse: {
            key,
            value,
          },
        }),
      );
    }
    if (lastData) {
      dataToSend.push(
        port.ProtoModule.PB.Main.create({
          commandId: msg.commandId,
          hasNext: false,
          commandStatus: port.ProtoModule.PB.CommandStatus.OK as any,
          systemDeviceInfoResponse: {
            key: lastData[0],
            value: lastData[1],
          },
        }),
      );
    } else {
      dataToSend.push(
        port.ProtoModule.PB.Main.create({
          commandId: msg.commandId,
          hasNext: false,
          commandStatus: port.ProtoModule.PB.CommandStatus.ERROR as any,
          empty: {},
        }),
      );
    }
    const sendData = () => {
      const data = dataToSend.shift();
      if (data == null) return;
      port.pushData(
        port.ProtoModule.PB.Main.encodeDelimited(data as any).finish(),
      );
      if (dataToSend.length > 0) setTimeout(sendData, 5);
    };
    setTimeout(sendData, 5);
  });
  return port;
}

async function systemFakeVersionDeviceInfoMock<
  Version extends PROTOBUF_VERSION,
>(
  realVersion: Version,
  fakeVersion: `${number}.${number}`,
): Promise<
  MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
  }
>;
async function systemFakeVersionDeviceInfoMock<
  Version extends PROTOBUF_VERSION,
>(
  port: MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
  },
  fakeVersion: `${number}.${number}`,
): Promise<
  MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
  }
>;
async function systemFakeVersionDeviceInfoMock<
  Version extends PROTOBUF_VERSION,
>(
  versionOrMock:
    | Version
    | (MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
        version: Version;
      }),
  fakeVersion: `${number}.${number}`,
) {
  const port = await createMock<Version>(versionOrMock);
  if (port.registeredMocks.has(systemFakeVersionDeviceInfoMock)) {
    return port;
  }
  port.registeredMocks.add(systemFakeVersionDeviceInfoMock);
  port.on('message', (msg) => {
    if (msg.content !== 'systemDeviceInfoRequest') return;
    const [major, minor] = fakeVersion.split('.');
    const resData = Object.entries({
      ...deviceInfoData(),
      protobuf_version_major: major,
      protobuf_version_minor: minor,
    });
    const dataToSend: InstanceType<typeof port.ProtoModule.PB.Main>[] = [];
    const lastData = resData.pop();
    for (const [key, value] of resData) {
      dataToSend.push(
        port.ProtoModule.PB.Main.create({
          commandId: msg.commandId,
          hasNext: true,
          commandStatus: port.ProtoModule.PB.CommandStatus.OK as any,
          systemDeviceInfoResponse: {
            key,
            value,
          },
        }),
      );
    }
    if (lastData) {
      dataToSend.push(
        port.ProtoModule.PB.Main.create({
          commandId: msg.commandId,
          hasNext: false,
          commandStatus: port.ProtoModule.PB.CommandStatus.OK as any,
          systemDeviceInfoResponse: {
            key: lastData[0],
            value: lastData[1],
          },
        }),
      );
    } else {
      dataToSend.push(
        port.ProtoModule.PB.Main.create({
          commandId: msg.commandId,
          hasNext: false,
          commandStatus: port.ProtoModule.PB.CommandStatus.ERROR as any,
          empty: {},
        }),
      );
    }
    const sendData = () => {
      const data = dataToSend.shift();
      if (data == null) return;
      port.pushData(
        port.ProtoModule.PB.Main.encodeDelimited(data as any).finish(),
      );
      if (dataToSend.length > 0) setTimeout(sendData, 5);
    };
    setTimeout(sendData, 5);
  });
  return port;
}

async function systemPingMock<Version extends PROTOBUF_VERSION>(
  version: Version,
): Promise<
  MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
  }
>;
async function systemPingMock<Version extends PROTOBUF_VERSION>(
  version: MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
  },
): Promise<
  MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
    version: Version;
  }
>;
async function systemPingMock<Version extends PROTOBUF_VERSION>(
  versionOrMock:
    | Version
    | (MockRpcSerialPort<PROTOBUF_VERSION_MAP[Version]> & {
        version: Version;
        registeredMocks?: Set<Function>;
      }),
) {
  const port = await createMock<Version>(versionOrMock);
  if (port.registeredMocks.has(systemPingMock)) {
    return port;
  }
  port.registeredMocks.add(systemPingMock);
  port.on('message', (msg) => {
    if (msg.content !== 'systemPingRequest') return;
    const data = msg.systemPingRequest?.data;
    const res = port.ProtoModule.PB.Main.create({
      commandId: msg.commandId,
      hasNext: false,
      commandStatus: port.ProtoModule.PB.CommandStatus.OK as any,
      systemPingResponse: {
        data: data && data.length > 0 ? data : null,
      },
    });
    setTimeout(() => {
      port.pushData(
        port.ProtoModule.PB.Main.encodeDelimited(res as any).finish(),
      );
    }, 5);
  });
  return port;
}

export {
  systemDeviceInfoMock,
  systemFakeVersionDeviceInfoMock,
  systemPingMock,
};
