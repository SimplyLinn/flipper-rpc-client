import type * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import {
  PROTOBUF_VERSION,
  loadVersion,
} from '@flipper-rpc-client/versioned-protobuf';
import { PatchedMainCtor, Resolve, ResolveOrBootstrap } from './Types.js';
import { ApiInterfaceByVersionMap, apiDefs } from './Commands.js';
import RpcSerialPort from './RpcSerialPort.js';
import matchProtobufVersion, {
  makeCreateFunction,
} from './MatchProtobufVersion.js';
import { ensureError } from './Utils.js';
import { CommandError } from './Errors/CommandError.js';
import { StreamProtobufReader } from './StreamProtobufReader.js';

const MAX_ID = 2 ** 32 - 1;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FnParamMap<T extends readonly ((...args: any) => any)[]> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in keyof T]: T[key] extends (this: infer This, ...args: infer A) => any
    ? [This, T[key], ...A]
    : never;
};

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

export interface BaseInFlightRpcCommand<Version extends PROTOBUF_VERSION> {
  isExpected: boolean;
  reses: Resolve.Main<Version>[];
}

export interface UnexpectedInFlightRpcCommand<Version extends PROTOBUF_VERSION>
  extends BaseInFlightRpcCommand<Version> {
  isExpected: false;
}

export interface ExpectedInFlightRpcCommand<Version extends PROTOBUF_VERSION>
  extends BaseInFlightRpcCommand<Version> {
  isExpected: true;
  request: [Resolve.Main<Version>, ...Resolve.Main<Version>[]];
  resolve(
    data:
      | PromiseLike<
          [Resolve.Main<Version>, ...Resolve.Main<Version>[]] & {
            request: [
              InstanceType<Resolve.MainCtor<Version>>,
              ...InstanceType<Resolve.MainCtor<Version>>[],
            ];
          }
        >
      | ([Resolve.Main<Version>, ...Resolve.Main<Version>[]] & {
          request: [
            InstanceType<Resolve.MainCtor<Version>>,
            ...InstanceType<Resolve.MainCtor<Version>>[],
          ];
        }),
  ): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject(err: any): void;
}

export type InFlightRpcCommand<Version extends PROTOBUF_VERSION> =
  | UnexpectedInFlightRpcCommand<Version>
  | ExpectedInFlightRpcCommand<Version>;

export class RpcApi<Version extends PROTOBUF_VERSION> {
  #pbModule: Resolve.Version<Version>;
  #Main: PatchedMainCtor<Version>;
  readonly port: RpcSerialPort;
  #reader: StreamProtobufReader<Resolve.Main<Version>>;
  #id = 1;
  #connected = false;
  #defaultMainProperties: Omit<
    NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
    'commandId' | 'hasNext'
  >;
  #commands = new Map<number, InFlightRpcCommand<Version>>();
  #closingPromise: Promise<void> | undefined;

  #nextId() {
    if (this.#id === MAX_ID) {
      this.#id = 1;
    }
    return this.#id++;
  }

  get isReady() {
    return this.port.isConnected;
  }

  get protocolModule() {
    return this.#pbModule;
  }

  protected constructor(
    port: RpcSerialPort,
    readonly version: Version,
    pbModule: Resolve.Version<Version>,
    readonly matchMode: matchProtobufVersion.Mode,
    ...[defaultMainProperties]: Resolve.DefaultMainParams<Version>
  ) {
    this.#defaultMainProperties = (defaultMainProperties ?? {}) as Omit<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
      'commandId' | 'hasNext'
    >;
    this.#pbModule = pbModule;
    this.#Main = pbModule.PB.Main as PatchedMainCtor<Version>;
    this.#reader = new StreamProtobufReader(this.#Main);
    this.port = port;
    this.onData = this.onData.bind(this);
    if (port.isConnected) {
      queueMicrotask(() => {
        this.port.attachConsumer(this.onData, () =>
          this.setConnectionState(false),
        );
        this.setConnectionState(true);
      });
    }
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
      this.#rejectAllInflight(() => new Error('Connection closed'));
      this.#connected = false;
    } else {
      this.#connected = true;
    }
    return this.#connected;
  }

  #closeAndReset() {
    if (!this.#closingPromise) {
      this.#closingPromise = (async () => {
        try {
          await this.port.close();
        } finally {
          tryAllVoid(
            [this.port, this.port.detachConsumer, this.onData],
            [this, () => this.#reader.clear()],
            [this, this.setConnectionState, false],
          );
        }
      })().finally(() => {
        this.#closingPromise = undefined;
      });
    }
    return this.#closingPromise;
  }

  protected handleRpcData(
    res: Resolve.Main<Version>,
  ): Resolve.Main<Version>[] | undefined {
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
        if (
          commandEntry.reses.some(
            ({ commandStatus }) =>
              commandStatus !== this.#pbModule.PB.CommandStatus.OK,
          )
        ) {
          commandEntry.reject(
            new CommandError(
              this.#pbModule.PB
                .CommandStatus as ResolveOrBootstrap.Version<Version>['PB']['CommandStatus'],
              commandEntry.request,
              commandEntry.reses,
            ),
          );
        } else {
          commandEntry.resolve(
            Object.assign(
              commandEntry.reses as [
                Resolve.Main<Version>,
                ...Resolve.Main<Version>[],
              ],
              {
                request: commandEntry.request,
              },
            ),
          );
        }
      }
      return commandEntry.reses;
    } else if (!this.#commands.has(res.commandId)) {
      this.#commands.set(res.commandId, commandEntry);
    }
    return undefined;
  }

  private onData(chunk: Uint8Array) {
    this.#reader.append(chunk);
    let res: Resolve.Main<Version> | null;
    while ((res = this.#reader.next()) != null) {
      this.handleRpcData(res);
    }
  }

  private enqueue<
    const CMD extends NonNullable<
      InstanceType<Resolve.MainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
  >(
    commandName: CMD,
    properties: NonNullable<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>[CMD]
    >[],
    mainProperties: Omit<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
      'commandId' | 'hasNext'
    >,
  ) {
    return new Promise<
      [
        InstanceType<Resolve.MainCtor<Version>>,
        ...InstanceType<Resolve.MainCtor<Version>>[],
      ] & {
        request: [
          InstanceType<Resolve.MainCtor<Version>>,
          ...InstanceType<Resolve.MainCtor<Version>>[],
        ];
      }
    >((resolve, reject) => {
      const lastProps = properties.pop();
      const commandId = this.#nextId();
      const rootProps: NonNullable<
        ConstructorParameters<Resolve.MainCtor<Version>>[0]
      > = {
        ...mainProperties,
        commandId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any;
      const request = properties.map((props) =>
        this.#Main.create({
          ...rootProps,
          hasNext: true,
          [commandName]: props,
        }),
      );
      request.push(
        this.#Main.create({
          ...rootProps,
          hasNext: false,
          [commandName]: lastProps,
        }),
      );
      this.#commands.set(commandId, {
        isExpected: true,
        request: request as [Resolve.Main<Version>, ...Resolve.Main<Version>[]],
        reses: [],
        resolve,
        reject,
      });
      try {
        request.forEach((cmd) => {
          this.port.write(this.#Main.encodeDelimited(cmd).finish());
        });
      } catch (err) {
        this.#commands.delete(commandId);
        reject(err);
      }
    });
  }

  rawCommandExt<
    const CMD extends NonNullable<
      InstanceType<Resolve.MainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
  >(
    command: CMD,
    mainProperties: Omit<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
      'commandId' | 'hasNext'
    > | null,
    properties: NonNullable<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>[CMD]
    >,
  ): Promise<
    InstanceType<Resolve.MainCtor<Version>>[] & {
      request: InstanceType<Resolve.MainCtor<Version>>[];
    }
  >;
  rawCommandExt<
    const CMD extends NonNullable<
      InstanceType<Resolve.MainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
  >(
    command: CMD,
    mainProperties: Omit<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
      'commandId' | 'hasNext'
    > | null,

    properties: NonNullable<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>[CMD]
    >,
    ...extraProperties: NonNullable<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>[CMD]
    >[]
  ): Promise<
    InstanceType<Resolve.MainCtor<Version>>[] & {
      request: InstanceType<Resolve.MainCtor<Version>>[];
    }
  >;
  rawCommandExt<
    const CMD extends NonNullable<
      InstanceType<Resolve.MainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
  >(
    command: CMD,
    mainProperties: Omit<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
      'commandId' | 'hasNext'
    > | null,
    ...properties: NonNullable<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>[CMD]
    >[]
  ): Promise<
    InstanceType<Resolve.MainCtor<Version>>[] & {
      request: InstanceType<Resolve.MainCtor<Version>>[];
    }
  > {
    return this.enqueue(
      command,
      properties,
      mainProperties ?? this.#defaultMainProperties,
    );
  }

  rawCommand<
    const CMD extends NonNullable<
      InstanceType<Resolve.MainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
  >(
    command: CMD,
    properties: NonNullable<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>[CMD]
    >,
  ): Promise<
    InstanceType<Resolve.MainCtor<Version>>[] & {
      request: InstanceType<Resolve.MainCtor<Version>>[];
    }
  >;
  rawCommand<
    const CMD extends NonNullable<
      InstanceType<Resolve.MainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
  >(
    command: CMD,
    properties: NonNullable<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>[CMD]
    >,
    ...extraProperties: NonNullable<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>[CMD]
    >[]
  ): Promise<
    InstanceType<Resolve.MainCtor<Version>>[] & {
      request: InstanceType<Resolve.MainCtor<Version>>[];
    }
  >;
  rawCommand<
    const CMD extends NonNullable<
      InstanceType<Resolve.MainCtor<Version>>['content']
    > &
      keyof NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>,
  >(
    command: CMD,
    ...properties: NonNullable<
      NonNullable<ConstructorParameters<Resolve.MainCtor<Version>>[0]>[CMD]
    >[]
  ): Promise<
    InstanceType<Resolve.MainCtor<Version>>[] & {
      request: InstanceType<Resolve.MainCtor<Version>>[];
    }
  > {
    return this.enqueue(command, properties, this.#defaultMainProperties);
  }

  async connect() {
    if (this.#connected) {
      return this;
    }
    this.port.attachConsumer(this.onData, () => {
      this.setConnectionState(false);
    });
    if (this.port.isConnected) {
      this.setConnectionState(true);
      return this;
    }
    try {
      await this.port.open();
      this.setConnectionState(true);
      return this;
    } catch (err) {
      await this.#closeAndReset();
      throw err;
    }
  }

  async disconnect() {
    if (!this.#connected) {
      return;
    }
    return this.#closeAndReset();
  }

  get cmds(): {
    [key in keyof ApiInterfaceByVersionMap[Version]]: ApiInterfaceByVersionMap[Version][key];
  } {
    if (this === RpcApi.prototype || !(this instanceof RpcApi)) {
      throw new TypeError(
        `Method get FlipperRPCApi.prototype.cmds called on incompatible receiver ${String(
          this,
        )}`,
      );
    }
    const { version } = this;
    const cmds: ApiInterfaceByVersionMap[Version] = Object.fromEntries(
      apiDefs
        .map(([key, fns]) => {
          const suppertedImpl = (
            fns as readonly (readonly [
              // eslint-disable-next-line @typescript-eslint/ban-types
              Function,
              readonly PROTOBUF_VERSION[],
            ])[]
          ).find(([, supportedVersions]) =>
            supportedVersions.includes(version),
          )?.[0] as (typeof fns)[number][0] | undefined;
          if (suppertedImpl == null) {
            return null;
          }
          return [key, suppertedImpl.bind(this)] as const;
        })
        .filter((f): f is NonNullable<typeof f> => f != null),
    ) as ApiInterfaceByVersionMap[Version];
    Object.defineProperty(this, 'cmds', {
      value: cmds,
      writable: true,
      enumerable: false,
      configurable: true,
    });
    return cmds;
  }

  static create = makeCreateFunction<RpcSerialPort, typeof RpcApi>(RpcApi);

  static async instantiate<Version extends PROTOBUF_VERSION>(
    port: RpcSerialPort,
    version: Version,
    ...defaultMainProperties: Resolve.DefaultMainParams<Version>
  ): Promise<RpcApi<Version>>;
  static async instantiate<Version extends PROTOBUF_VERSION>(
    port: RpcSerialPort,
    version: Version,
    matchMode: matchProtobufVersion.Mode,
    ...defaultMainProperties: Resolve.DefaultMainParams<Version>
  ): Promise<RpcApi<Version>>;
  static async instantiate<Version extends PROTOBUF_VERSION>(
    port: RpcSerialPort,
    version: Version,
    ...[matchMode, ...defaultMainProperties]:
      | Resolve.DefaultMainParams<Version>
      | [
          matchMode: matchProtobufVersion.Mode,
          ...defaultMainProperties: Resolve.DefaultMainParams<Version>,
        ]
  ): Promise<RpcApi<Version>> {
    const pbModule = (await loadVersion(version)) as Resolve.Version<Version>;
    if (typeof matchMode === 'object' || matchMode == null) {
      return new RpcApi(
        port,
        version,
        pbModule,
        matchProtobufVersion.Mode.FORCED,
        ...((matchMode != null
          ? [matchMode]
          : []) as Resolve.DefaultMainParams<Version>),
      );
    }
    return new RpcApi(
      port,
      version,
      pbModule,
      matchMode,
      ...(defaultMainProperties as Resolve.DefaultMainParams<Version>),
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
