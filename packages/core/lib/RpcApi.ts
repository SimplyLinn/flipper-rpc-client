import protobuf from 'protobufjs/minimal.js';
import {
  PROTOBUF_VERSIONS,
  LATEST_VERSION,
  FIRST_VERSION,
  PROTOBUF_VERSION,
} from '@flipper-rpc-client/versioned-protobuf';
import {
  VersionRange,
  AllVersionsInRange,
  ParseVersionRange,
  DefaultMainParams,
  ResolveMainCtor,
  ResolveMain,
  ResolveOptions,
} from './Types.js';
import { ApiInterfaceByVersionMap, apiDefs } from './Commands/index.js';
import { SUPPORTED_VERSIONS } from './_internal/constants.js';
import RpcSerialPort from './RpcSerialPort.js';
import { PatchedMainCtor } from './_internal/types.js';
import matchProtobufVersion from './matchProtobufVersion.js';
import { appendReaderChunk, ensureError } from './_internal/utils.js';

const MAX_ID = 2 ** 32 - 1;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FnParamMap<T extends readonly ((...args: any) => any)[]> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in keyof T]: T[key] extends (this: infer This, ...args: infer A) => any
    ? [This, T[key], ...A]
    : never;
};

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function tryAllVoid<const Fns extends readonly ((...args: any[]) => any)[]>(
  ...fns: FnParamMap<Fns>
): void {
  const errors = fns
    .map((entry) => {
      try {
        const [thisArg, fn, ...args] = entry;
        fn.call(thisArg, ...args);
        return {
          status: 'fulfilled',
          value: undefined,
        };
      } catch (err) {
        return {
          status: 'rejected',
          reason: err,
        };
      }
    })
    .filter((res): res is PromiseRejectedResult => res.status === 'rejected')
    .map(({ reason }) => reason);
  if (errors.length > 0) {
    throw errors.length > 1
      ? new AggregateError(errors.map((err) => ensureError(err)))
      : ensureError(errors[0]);
  }
}

export interface BaseInFlightRpcCommand<Version extends VersionRange> {
  isExpected: boolean;
  reses: ResolveMain<Version>[];
}

export interface UnexpectedInFlightRpcCommand<Version extends VersionRange>
  extends BaseInFlightRpcCommand<Version> {
  isExpected: false;
}

export interface ExpectedInFlightRpcCommand<Version extends VersionRange>
  extends BaseInFlightRpcCommand<Version> {
  isExpected: true;
  command: ResolveMain<Version>;
  resolve(
    data: PromiseLike<ResolveMain<Version>[]> | ResolveMain<Version>[],
  ): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject(err: any): void;
}

export type InFlightRpcCommand<Version extends VersionRange> =
  | UnexpectedInFlightRpcCommand<Version>
  | ExpectedInFlightRpcCommand<Version>;

export class RpcApi<Version extends VersionRange> {
  #Main: PatchedMainCtor<Version>;
  readonly port: RpcSerialPort;
  #reader = new protobuf.Reader(new Uint8Array(0));
  #id = 1;
  #connected = false;
  #defaultMainProperties: Omit<
    NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
    'commandId' | 'hasNext'
  >;
  #commands = new Map<number, InFlightRpcCommand<Version>>();

  #nextId() {
    if (this.#id === MAX_ID) {
      this.#id = 1;
    }
    return this.#id++;
  }

  get isReady() {
    return this.port.isConnected;
  }

  protected constructor(
    port: RpcSerialPort,
    readonly version: AllVersionsInRange<ParseVersionRange<Version>>,
    Main: ResolveMainCtor<Version>,
    matchMode: matchProtobufVersion.Mode,
    ...[defaultMainProperties]: DefaultMainParams<Version>
  ) {
    this.#defaultMainProperties = (defaultMainProperties ?? {}) as Omit<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
      'commandId' | 'hasNext'
    >;
    this.#Main = Main as PatchedMainCtor<Version>;
    this.port = port;
    this.onData = this.onData.bind(this);
  }

  #rejectAllInflight(
    mkError: (inFlight: ExpectedInFlightRpcCommand<Version>) => Error,
  ) {
    const errors: Error[] = [];
    const oldCommands = [...this.#commands.values()];
    this.#commands.clear();
    for (const command of oldCommands) {
      try {
        if (command.isExpected) {
          command.reject(mkError(command));
        }
      } catch (err) {
        errors.push(ensureError(err));
      }
    }
    if (errors.length === 1) {
      throw errors[0];
    }
    if (errors.length > 1) {
      throw new AggregateError(
        errors,
        'Error when rejecting in flight commands',
      );
    }
  }

  protected setConnectionState(connected: boolean): boolean | undefined {
    if (this.#connected === connected) {
      return undefined;
    }
    if (this.#connected) {
      this.#connected = false;
    } else {
      this.#connected = true;
    }
    return this.#connected;
  }

  async #closeAndReset() {
    try {
      await this.port.close();
    } finally {
      tryAllVoid(
        [this.port, this.port.detachConsumer, this.onData],
        [this, () => (this.#reader = new protobuf.Reader(new Uint8Array(0)))],
        [this, this.#rejectAllInflight, () => new Error('Connection closed')],
        [this, this.setConnectionState, false],
      );
    }
  }

  protected handleRpcData(
    res: ResolveMain<Version>,
  ): ResolveMain<Version>[] | undefined {
    const commandEntry = this.#commands.get(res.commandId) ?? {
      isExpected: false,
      reses: [],
    };
    commandEntry.reses.push(res);
    if (!res.hasNext) {
      this.#commands.delete(res.commandId);
      if (res.commandId !== 0) {
        if (!commandEntry.isExpected && res.commandId !== 0) {
          console.log('Received unsolicited message', commandEntry.reses);
        }
      }
      if (commandEntry.isExpected) {
        commandEntry.resolve(commandEntry.reses);
      }
      return commandEntry.reses;
    } else if (!this.#commands.has(res.commandId)) {
      this.#commands.set(res.commandId, commandEntry);
    }
    return undefined;
  }

  private onData(chunk: Uint8Array) {
    appendReaderChunk(this.#reader, chunk);
    let shouldBreak = false;
    while (this.#reader.pos < this.#reader.len && !shouldBreak) {
      try {
        const res = (() => {
          const oldPos = this.#reader.pos;
          try {
            return this.#Main.decodeDelimited(this.#reader);
          } catch (err) {
            shouldBreak = true;
            this.#reader.pos = oldPos;
            throw err;
          }
        })();
        this.handleRpcData(res);
      } catch (err) {
        if (
          err instanceof RangeError &&
          err.message.startsWith('index out of range: ') &&
          this.#reader.len < 16384
        ) {
          return;
        }
        const toConsume = this.#reader.buf.slice(this.#reader.pos);
        console.log(
          'onData',
          `[0x${[...toConsume]
            .map((n) => n.toString(16).padStart(2, '0'))
            .join(',0x')}]`,
          String.fromCharCode(...toConsume),
        );
        throw err;
      }
    }
  }

  private enqueue<
    const CMD extends NonNullable<
      InstanceType<ResolveMainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
  >(
    commandName: CMD,
    properties: NonNullable<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>[CMD]
    >[],
    mainProperties: Omit<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
      'commandId' | 'hasNext'
    >,
  ) {
    return new Promise<InstanceType<ResolveMainCtor<Version>>[]>(
      (resolve, reject) => {
        const lastProps = properties.pop();
        const commandId = this.#nextId();
        const rootProps: NonNullable<
          ConstructorParameters<ResolveMainCtor<Version>>[0]
        > = {
          ...mainProperties,
          commandId,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any;
        const toWrite = properties.map((props) => {
          return this.#Main
            .encodeDelimited({
              ...rootProps,
              hasNext: true,
              [commandName]: props,
            })
            .finish();
        });
        const command = this.#Main.create({
          ...rootProps,
          hasNext: true,
          [commandName]: lastProps,
        });
        this.#commands.set(commandId, {
          isExpected: true,
          command,
          reses: [],
          resolve,
          reject,
        });
        try {
          toWrite.push(this.#Main.encodeDelimited(command).finish());
          toWrite.forEach((chunk) => {
            this.port.write(chunk);
          });
        } catch (err) {
          this.#commands.delete(commandId);
          reject(err);
        }
      },
    );
  }

  rawCommandExt<
    const CMD extends NonNullable<
      InstanceType<ResolveMainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
  >(
    command: CMD,
    mainProperties: Omit<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
      'commandId' | 'hasNext'
    > | null,
    properties: NonNullable<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>[CMD]
    >,
  ): Promise<InstanceType<ResolveMainCtor<Version>>[]>;
  rawCommandExt<
    const CMD extends NonNullable<
      InstanceType<ResolveMainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
  >(
    command: CMD,
    mainProperties: Omit<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
      'commandId' | 'hasNext'
    > | null,

    properties: NonNullable<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>[CMD]
    >,
    ...extraProperties: NonNullable<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>[CMD]
    >[]
  ): Promise<InstanceType<ResolveMainCtor<Version>>[]>;
  rawCommandExt<
    const CMD extends NonNullable<
      InstanceType<ResolveMainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
  >(
    command: CMD,
    mainProperties: Omit<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
      'commandId' | 'hasNext'
    > | null,
    ...properties: NonNullable<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>[CMD]
    >[]
  ): Promise<InstanceType<ResolveMainCtor<Version>>[]> {
    return this.enqueue(
      command,
      properties,
      mainProperties ?? this.#defaultMainProperties,
    );
  }

  rawCommand<
    const CMD extends NonNullable<
      InstanceType<ResolveMainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
  >(
    command: CMD,
    properties: NonNullable<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>[CMD]
    >,
  ): Promise<InstanceType<ResolveMainCtor<Version>>[]>;
  rawCommand<
    const CMD extends NonNullable<
      InstanceType<ResolveMainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
  >(
    command: CMD,
    properties: NonNullable<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>[CMD]
    >,
    ...extraProperties: NonNullable<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>[CMD]
    >[]
  ): Promise<InstanceType<ResolveMainCtor<Version>>[]>;
  rawCommand<
    const CMD extends NonNullable<
      InstanceType<ResolveMainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>,
  >(
    command: CMD,
    ...properties: NonNullable<
      NonNullable<ConstructorParameters<ResolveMainCtor<Version>>[0]>[CMD]
    >[]
  ): Promise<InstanceType<ResolveMainCtor<Version>>[]> {
    return this.enqueue(command, properties, this.#defaultMainProperties);
  }

  async connect() {
    this.port.attachConsumer(this.onData);
    try {
      await this.port.open();
      this.setConnectionState(true);
      return this;
    } catch (err) {
      await this.#closeAndReset();
      throw err;
    }
  }

  get cmds(): {
    [key in keyof ApiInterfaceByVersionMap[AllVersionsInRange<
      ParseVersionRange<Version>
    >]]: ApiInterfaceByVersionMap[AllVersionsInRange<
      ParseVersionRange<Version>
    >][key];
  } {
    if (this === RpcApi.prototype || !(this instanceof RpcApi)) {
      throw new TypeError(
        `Method get FlipperRPCApi.prototype.cmds called on incompatible receiver ${String(
          this,
        )}`,
      );
    }
    const { version } = this;
    const cmds = Object.fromEntries(
      apiDefs
        .filter((f) => {
          const versionRange = f[SUPPORTED_VERSIONS] as VersionRange;
          if (typeof versionRange === 'string') {
            return versionRange === version;
          }
          const targetIndex = PROTOBUF_VERSIONS.indexOf(version);
          if (targetIndex < 0) {
            return false;
          }
          const minIndex = PROTOBUF_VERSIONS.indexOf(versionRange[0]);
          const maxIndex = PROTOBUF_VERSIONS.indexOf(
            versionRange[2] ?? LATEST_VERSION,
          );
          if (minIndex < 0 || maxIndex < 0) {
            return false;
          }
          return targetIndex >= minIndex && targetIndex <= maxIndex;
        })
        .flatMap((f) =>
          Object.entries(f).map(([key, val]) => [key, val.bind(this)] as const),
        ),
    ) as ApiInterfaceByVersionMap[AllVersionsInRange<
      ParseVersionRange<Version>
    >];
    Object.defineProperty(this, 'cmds', {
      value: cmds,
      writable: true,
      enumerable: false,
      configurable: true,
    });
    return cmds;
  }

  static async create(
    port: RpcSerialPort,
    ...[options, defaultMainProperties]: CreateArgs<
      [FIRST_VERSION, '...', LATEST_VERSION],
      null | undefined
    >
  ): Promise<RpcApi<[FIRST_VERSION, '...', LATEST_VERSION]>>;
  static async create<const Version extends PROTOBUF_VERSION>(
    port: RpcSerialPort,
    ...[options, defaultMainProperties]: CreateArgs<
      Version,
      | { version: Version; force?: boolean }
      | { version: Version; requireExactMatch?: boolean }
    >
  ): Promise<RpcApi<Version>>;
  static async create<const MinV extends PROTOBUF_VERSION>(
    port: RpcSerialPort,
    ...[options, defaultMainProperties]: CreateArgs<
      [MinV, '...', LATEST_VERSION],
      | { minVersion: MinV; requireExactMatch?: boolean }
      | {
          minVersion: MinV;
          fallbackVersion?: AllVersionsInRange<[MinV, '...', LATEST_VERSION]>;
        }
    >
  ): Promise<RpcApi<[MinV, '...', LATEST_VERSION]>>;
  static async create<const MaxV extends PROTOBUF_VERSION>(
    port: RpcSerialPort,
    ...[options, defaultMainProperties]: CreateArgs<
      [FIRST_VERSION, '...', MaxV],
      | { maxVersion: MaxV; requireExactMatch?: boolean }
      | {
          maxVersion: MaxV;
          fallbackVersion?: AllVersionsInRange<[FIRST_VERSION, '...', MaxV]>;
        }
    >
  ): Promise<RpcApi<[FIRST_VERSION, '...', MaxV]>>;
  static async create<
    const MinV extends PROTOBUF_VERSION,
    const MaxV extends PROTOBUF_VERSION,
  >(
    port: RpcSerialPort,
    ...[options, defaultMainProperties]: CreateArgs<
      [MinV, '...', MaxV],
      | { minVersion: MinV; maxVersion: MaxV; requireExactMatch?: boolean }
      | {
          maxVersion: MaxV;
          fallbackVersion?: AllVersionsInRange<[MinV, '...', MaxV]>;
        }
    >
  ): Promise<RpcApi<[MinV, '...', MaxV]>>;
  static async create(
    port: RpcSerialPort,
    ...[options, ...defaultMainProperties]: CreateArgs<
      [FIRST_VERSION, '...', LATEST_VERSION],
      | {
          requireExactMatch?: boolean;
          fallbackVersion?: PROTOBUF_VERSION;
        }
      | null
      | undefined
    >
  ): Promise<RpcApi<[FIRST_VERSION, '...', LATEST_VERSION]>>;
  static async create(
    port: RpcSerialPort,
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
  ): Promise<RpcApi<[FIRST_VERSION, '...', LATEST_VERSION]>> {
    const { version, protobuf, matchMode } = await matchProtobufVersion(
      port,
      options,
    );
    return new RpcApi<[FIRST_VERSION, '...', LATEST_VERSION]>(
      port,
      version,
      protobuf.PB.Main,
      matchMode,
      ...defaultMainProperties,
    );
  }
}
const cmdGetter = Object.getOwnPropertyDescriptor(RpcApi.prototype, 'cmds')!
  .get!;
Object.defineProperty(cmdGetter, 'name', {
  value: 'cmds',
  writable: false,
  enumerable: false,
  configurable: true,
});
Object.defineProperty(RpcApi.prototype, Symbol.toStringTag, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(this: RpcApi<any>) {
    if (this === RpcApi.prototype || !(this instanceof RpcApi)) {
      return undefined;
    }
    return RpcApi.name;
  },
  enumerable: false,
  configurable: true,
});

export default RpcApi;
