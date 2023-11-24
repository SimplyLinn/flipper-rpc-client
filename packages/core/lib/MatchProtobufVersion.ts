import { ensureError } from './Utils.js';
import protobuf from 'protobufjs';
import {
  FIRST_VERSION,
  LATEST_VERSION,
  PROTOBUF_VERSION,
  PROTOBUF_VERSIONS,
} from '@flipper-rpc-client/versioned-protobuf';
import { PB as BootstrapPB } from '@flipper-rpc-client/versioned-protobuf/bootstrap';
import RpcSerialPort from './RpcSerialPort.js';
import { Resolve, Version } from './Types.js';
import { ContextualizeError } from './Utils.js';
import { ProtocolError } from './Errors/ProtocolError.js';
import { CommandError } from './Errors/CommandError.js';
import { RpcApi } from './RpcApi.js';

function makeNonMatchingError(
  acceptableVersions: readonly PROTOBUF_VERSION[],
  deviceMajor: number,
  deviceMinor: number,
  exact: boolean,
) {
  const byMajorVersion: Record<string, PROTOBUF_VERSION[]> = {};
  for (const s of acceptableVersions) {
    const [majorStr] = s.split('.');
    if (!majorStr || !/^\d+$/.test(majorStr)) {
      continue;
    }
    if (byMajorVersion[majorStr] == null) {
      byMajorVersion[majorStr] = [];
    }
    byMajorVersion[majorStr].push(s);
  }
  if (Object.keys(byMajorVersion).length === 0 || exact) {
    return new Error(
      `Failed to find a suitable match for device protocol version v${deviceMajor.toFixed(
        0,
      )}.${deviceMinor.toFixed(0)}. Needs to be one of ${acceptableVersions
        .map((s) => `v${s}`)
        .join(', ')}`,
    );
  }
  if (byMajorVersion[deviceMajor] == null) {
    return new Error(
      `Failed to find a suitable match for device protocol version v${deviceMajor.toFixed(
        0,
      )}.${deviceMinor.toFixed(
        0,
      )}. Needs to have a major version matching of ${Object.keys(
        byMajorVersion,
      )
        .map((s) => `v${s}`)
        .join(', ')}`,
    );
  }
  return new Error(
    `Failed to find a suitable match for device protocol version v${deviceMajor.toFixed(
      0,
    )}.${deviceMinor.toFixed(0)}. Needs to have a version of at least v${
      byMajorVersion[deviceMajor][0]
    }`,
  );
}

function log(level: 'debug' | 'warn' | 'error', msg: string) {
  if (matchProtobufVersion.logger == null) return;
  if (typeof matchProtobufVersion.logger === 'function') {
    matchProtobufVersion.logger(`${level.toUpperCase()}: ${msg}`);
  } else {
    matchProtobufVersion.logger[level]?.(msg);
  }
}

function stringifyThrown(thrown: unknown): string {
  if (typeof thrown === 'object' && thrown != null) {
    if (thrown instanceof Error) {
      return (
        thrown.stack ??
        `${thrown.name}${thrown.message ? `: ${thrown.message}` : ''}`
      );
    }
    if ('stack' in thrown && typeof thrown.stack === 'string') {
      return thrown.stack;
    }
    if ('message' in thrown && typeof thrown.message === 'string') {
      if (
        'name' in thrown &&
        typeof thrown.name === 'string' &&
        thrown.name !== ''
      ) {
        return `${thrown.name}${thrown.message ? `: ${thrown.message}` : ''}`;
      }
      return thrown.message;
    }
  }
  return `NON ERROR THROWN: ${String(thrown)}`;
}

export function matchProtobufVersion(port: RpcSerialPort): Promise<{
  version: PROTOBUF_VERSION;
  matchMode: matchProtobufVersion.Mode;
}>;
export function matchProtobufVersion<const Version extends PROTOBUF_VERSION>(
  port: RpcSerialPort,
  options:
    | { version: Version; force?: boolean }
    | { version: Version; requireExactMatch?: boolean },
): Promise<{
  version: Version;
  matchMode: matchProtobufVersion.Mode;
}>;
export function matchProtobufVersion<const MinV extends PROTOBUF_VERSION>(
  port: RpcSerialPort,
  options:
    | { minVersion: MinV; requireExactMatch?: boolean }
    | {
        minVersion: MinV;
        fallbackVersion?: Version.AndUp<MinV>;
      },
): Promise<{
  version: Version.AndUp<MinV>;
  matchMode: matchProtobufVersion.Mode;
}>;
export function matchProtobufVersion<const MaxV extends PROTOBUF_VERSION>(
  port: RpcSerialPort,
  options:
    | { maxVersion: MaxV; requireExactMatch?: boolean }
    | {
        maxVersion: MaxV;
        fallbackVersion?: Version.AndDown<MaxV>;
      },
): Promise<{
  version: Version.AndDown<MaxV>;
  matchMode: matchProtobufVersion.Mode;
}>;
export function matchProtobufVersion<
  const MinV extends PROTOBUF_VERSION,
  const MaxV extends PROTOBUF_VERSION,
>(
  port: RpcSerialPort,
  options:
    | { minVersion: MinV; maxVersion: MaxV; requireExactMatch?: boolean }
    | {
        maxVersion: MaxV;
        fallbackVersion?: Version.Between<MinV, MaxV>;
      },
): Promise<{
  version: Version.Between<MinV, MaxV>;
  matchMode: matchProtobufVersion.Mode;
}>;
export function matchProtobufVersion(
  port: RpcSerialPort,
  options?: {
    requireExactMatch?: boolean;
    fallbackVersion?: PROTOBUF_VERSION;
  } | null,
): Promise<{
  version: PROTOBUF_VERSION;
  matchMode: matchProtobufVersion.Mode;
}>;
export function matchProtobufVersion(
  port: RpcSerialPort,
  options?:
    | { version: PROTOBUF_VERSION; force?: boolean }
    | { version: PROTOBUF_VERSION; requireExactMatch?: boolean }
    | {
        minVersion?: PROTOBUF_VERSION;
        maxVersion?: PROTOBUF_VERSION;
        requireExactMatch?: boolean;
        fallbackVersion?: PROTOBUF_VERSION;
      }
    | null,
) {
  return new Promise<{
    version: PROTOBUF_VERSION;
    matchMode: matchProtobufVersion.Mode;
  }>((_resolve, _reject) => {
    const cmd = BootstrapPB.Main.create({
      commandId: 0xbabe,
      hasNext: false,
      systemDeviceInfoRequest: {},
    });
    const ACCEPTED_VERSIONS =
      options == null
        ? PROTOBUF_VERSIONS
        : (() => {
            if ('version' in options && options.version != null)
              return [options.version];
            const minVersion =
              options != null && 'minVersion' in options
                ? options.minVersion ?? null
                : null;
            const maxVersion =
              options != null && 'maxVersion' in options
                ? options.maxVersion ?? null
                : null;
            if (minVersion == null && maxVersion == null)
              return PROTOBUF_VERSIONS;
            const minVersionIndex = (() => {
              const index = PROTOBUF_VERSIONS.indexOf(
                minVersion ?? FIRST_VERSION,
              );
              if (index < 0)
                throw new Error(`Invalid minVersion ${minVersion}`);
              return index;
            })();
            const maxVersionIndex = (() => {
              const index = PROTOBUF_VERSIONS.indexOf(
                maxVersion ?? LATEST_VERSION,
              );
              if (index < 0)
                throw new Error(`Invalid maxVersion ${maxVersion}`);
              return index;
            })();
            if (minVersionIndex > maxVersionIndex) {
              throw new Error(
                `minVersion ${minVersion} is greater than maxVersion ${maxVersion}`,
              );
            }
            return PROTOBUF_VERSIONS.slice(
              minVersionIndex,
              maxVersionIndex + 1,
            );
          })();
    function isAcceptedVersion(
      version: string,
    ): version is (typeof ACCEPTED_VERSIONS)[number] {
      return ACCEPTED_VERSIONS.includes(version as PROTOBUF_VERSION);
    }
    const requireExactMatch =
      options != null &&
      'requireExactMatch' in options &&
      options.requireExactMatch;
    const forceVersion =
      options != null && 'force' in options ? options.version ?? null : null;
    const fallbackVersion = (() => {
      if (options == null) return null;
      if ('version' in options && options.version != null) return null;
      if ('fallbackVersion' in options && options.fallbackVersion != null)
        return options.fallbackVersion;
      return null;
    })();
    let fulfilled = false;
    function resolve(
      value:
        | {
            version: PROTOBUF_VERSION;
            matchMode: matchProtobufVersion.Mode;
          }
        | PromiseLike<{
            version: PROTOBUF_VERSION;
            matchMode: matchProtobufVersion.Mode;
          }>,
    ) {
      if (fulfilled) return;
      fulfilled = true;
      _resolve(value);
    }
    function reject(reason: unknown) {
      if (fulfilled) return;
      fulfilled = true;
      _reject(reason);
    }
    function rejectOrFallback(reason: unknown) {
      if (fulfilled) return;
      fulfilled = true;
      if (fallbackVersion != null) {
        log(
          'warn',
          `Error when matching: ${stringifyThrown(
            reason,
          )}. Falling back to fallback version v${fallbackVersion}`,
        );
        _resolve({
          version: fallbackVersion,
          matchMode: matchProtobufVersion.Mode.FALLBACK,
        });
      } else {
        _reject(reason);
      }
    }
    let remainder: Uint8Array | null = null;
    const messages: BootstrapPB.Main[] = [];
    async function tryClose() {
      if (port.state !== RpcSerialPort.State.DISCONNECTED) {
        return port.close().catch((err) => {
          throw ContextualizeError('ERROR WHEN CLOSING PORT', err);
        });
      }
    }
    function tryDetach() {
      try {
        if (!port.detachConsumer(onData)) {
          console.warn('Consumer already detached');
        }
      } catch (err) {
        throw ContextualizeError('ERROR WHEN DETACHING CONSUMER', err);
      }
    }
    async function finish(err: Error | null) {
      try {
        tryDetach();
      } catch (detachErr) {
        try {
          await tryClose();
        } catch (err) {
          log('error', stringifyThrown(err));
        }
        if (err) {
          log('error', stringifyThrown(detachErr));
          reject(err);
        } else {
          reject(detachErr);
        }
        return;
      } finally {
        if (err) {
          try {
            await tryClose();
          } catch (err) {
            log('error', stringifyThrown(err));
          }
          reject(err);
        }
      }
      if (remainder != null && remainder.length > 0) {
        port.unshiftData(remainder);
        remainder = null;
      }
      let protobufVersionMajor: number | null = null;
      let protobufVersionMinor: number | null = null;
      for (const message of messages) {
        if (message.commandStatus !== BootstrapPB.CommandStatus.OK) {
          const textStatus = BootstrapPB.CommandStatus[
            message.commandStatus
          ] as string | undefined;
          return rejectOrFallback(
            new CommandError<'bootstrap'>(
              BootstrapPB.CommandStatus,
              [cmd],
              messages,
              `Command failed with status ${message.commandStatus}${
                textStatus ? `(${textStatus})` : ''
              }`,
            ),
          );
        }
        if (
          message.content !== 'systemDeviceInfoResponse' ||
          message.systemDeviceInfoResponse == null
        ) {
          return rejectOrFallback(
            new ProtocolError(
              `Unexpected response content, got: ${
                message.content === 'systemDeviceInfoResponse'
                  ? 'null'
                  : message.content
              }, exected ${'systemDeviceInfoResponse'}`,
              BootstrapPB.CommandStatus,
              [cmd],
              messages,
            ),
          );
        }
        const { key, value } = message.systemDeviceInfoResponse;
        if (key == null) {
          return rejectOrFallback(
            new ProtocolError(
              `Missing key in systemDeviceInfoResponse`,
              BootstrapPB.CommandStatus,
              [cmd],
              messages,
            ),
          );
        }
        if (value == null) {
          return rejectOrFallback(
            new ProtocolError(
              `Missing value in systemDeviceInfoResponse`,
              BootstrapPB.CommandStatus,
              [cmd],
              messages,
            ),
          );
        }
        if (key === 'protobuf_version_major') {
          if (!/^\d+$/.test(value)) {
            return rejectOrFallback(
              new ProtocolError(
                `Invalid ${key} in response: ${value}`,
                BootstrapPB.CommandStatus,
                [cmd],
                messages,
              ),
            );
          }
          const numMajor = parseInt(value, 10);
          if (protobufVersionMajor != null) {
            return rejectOrFallback(
              new ProtocolError(
                `Duplicate protobuf_version_major in response ${protobufVersionMajor} -> ${numMajor}.`,
                BootstrapPB.CommandStatus,
                [cmd],
                messages,
              ),
            );
          }
          protobufVersionMajor = numMajor;
        }
        if (key === 'protobuf_version_minor') {
          if (!/^\d+$/.test(value)) {
            return rejectOrFallback(
              new ProtocolError(
                `Invalid ${key} in response: ${value}`,
                BootstrapPB.CommandStatus,
                [cmd],
                messages,
              ),
            );
          }
          const numMinor = parseInt(value, 10);
          if (protobufVersionMinor != null) {
            return rejectOrFallback(
              new ProtocolError(
                `Duplicate protobuf_version_minor in response ${protobufVersionMinor} -> ${numMinor}.`,
                BootstrapPB.CommandStatus,
                [cmd],
                messages,
              ),
            );
          }
          protobufVersionMinor = numMinor;
        }
      }
      if (protobufVersionMajor == null && protobufVersionMinor == null) {
        log(
          'warn',
          'Missing protocol version in response, assuming 0.1 (protobuf version response got introduced in 0.2)',
        );
        protobufVersionMajor = 0;
        protobufVersionMinor = 1;
      }
      if (protobufVersionMajor == null) {
        return rejectOrFallback(
          new ProtocolError(
            'Missing protocol major version',
            BootstrapPB.CommandStatus,
            [cmd],
            messages,
          ),
        );
      }
      if (protobufVersionMinor == null) {
        return rejectOrFallback(
          new ProtocolError(
            'Missing protocol minor version',
            BootstrapPB.CommandStatus,
            [cmd],
            messages,
          ),
        );
      }
      const maybeProtobufVersion = `${protobufVersionMajor}.${protobufVersionMinor}`;
      if (isAcceptedVersion(maybeProtobufVersion)) {
        return resolve({
          version: maybeProtobufVersion,
          matchMode: matchProtobufVersion.Mode.EXACT,
        });
      } else if (!requireExactMatch) {
        let bestMatch: PROTOBUF_VERSION | null = null;
        for (const s of ACCEPTED_VERSIONS) {
          const [majorStr, minorStr] = s.split('.');
          if (
            !majorStr ||
            !/^\d+$/.test(majorStr) ||
            !minorStr ||
            !/^\d+$/.test(minorStr)
          ) {
            continue;
          }
          const major = parseInt(majorStr, 10);
          const minor = parseInt(minorStr, 10);
          if (major < protobufVersionMajor!) {
            continue;
          }
          if (major > protobufVersionMajor!) {
            break;
          }
          if (minor > protobufVersionMinor!) {
            break;
          }
          bestMatch = s;
        }
        if (bestMatch != null) {
          return resolve({
            version: bestMatch!,
            matchMode: matchProtobufVersion.Mode.CLOSEST,
          });
        }
      }
      return rejectOrFallback(
        makeNonMatchingError(
          ACCEPTED_VERSIONS,
          protobufVersionMajor,
          protobufVersionMinor,
          requireExactMatch ?? false,
        ),
      );
    }
    function onData(chunk: Uint8Array) {
      if (!remainder) {
        remainder = chunk;
      } else {
        const newRemainder = new Uint8Array(remainder.length + chunk.length);
        newRemainder.set(remainder);
        newRemainder.set(chunk, remainder.length);
        remainder = newRemainder;
      }
      while (remainder != null) {
        const reader: protobuf.Reader = new protobuf.Reader(remainder);
        try {
          const res = BootstrapPB.Main.decodeDelimited(reader);
          remainder = reader.buf.slice(reader.pos);
          if (res.commandId === cmd.commandId) {
            messages.push(res);
            if (!res.hasNext) {
              finish(null);
            }
          } else if (res.commandId !== 0) {
            finish(
              new ProtocolError(
                'Unexpected command id',
                BootstrapPB.CommandStatus,
                [cmd],
                [res],
              ),
            );
          } else {
            log('warn', `Received unexpected event ${res.content}`);
          }
        } catch (err) {
          if (
            err instanceof RangeError &&
            err.message.startsWith('index out of range: ')
          ) {
            if (remainder.length >= 16384) {
              finish(
                ContextualizeError(
                  'Refusing to parse message larger than 16kb',
                  ensureError(err),
                ),
              );
            }
            return;
          }
          finish(ensureError(err));
        }
      }
    }
    function onConnect() {
      port.write(BootstrapPB.Main.encodeDelimited(cmd).finish());
    }
    if (forceVersion != null) {
      return resolve({
        version: forceVersion,
        matchMode: matchProtobufVersion.Mode.FORCED,
      });
    } else {
      port.attachConsumer(onData);
      if (port.isConnected) {
        onConnect();
      } else {
        port.open().then(onConnect);
      }
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace matchProtobufVersion {
  export enum Mode {
    FALLBACK = 'fallback',
    CLOSEST = 'closest',
    EXACT = 'exact',
    FORCED = 'forced',
  }
  // eslint-disable-next-line prefer-const
  export let logger:
    | {
        debug?(msg: string): void;
        warn?(msg: string): void;
        error?(msg: string): void;
      }
    | ((msg: string) => void)
    | null = {
    warn: console.warn.bind(console),
    error: console.error.bind(console),
  };
}

export default matchProtobufVersion;

export type CreateArgs<
  Version extends PROTOBUF_VERSION,
  Options,
  // eslint-disable-next-line @typescript-eslint/ban-types
> = {} extends Resolve.Options<Version>
  ? Options extends undefined
    ? [
        options?: Options,
        defaultMainProperties?: {
          [key in keyof Omit<
            Resolve.Options<Version>,
            'commandId' | 'hasNext'
          >]: Resolve.Options<Version>[key];
        },
      ]
    : [
        options: Options,
        defaultMainProperties?: {
          [key in keyof Omit<
            Resolve.Options<Version>,
            'commandId' | 'hasNext'
          >]: Resolve.Options<Version>[key];
        },
      ]
  : [
      options: Options,
      defaultMainProperties: {
        [key in keyof Omit<
          Resolve.Options<Version>,
          'commandId' | 'hasNext'
        >]: Resolve.Options<Version>[key];
      },
    ];

export function makeCreateFunction<
  PortType extends RpcSerialPort,
  ApiType extends {
    instantiate<Version extends PROTOBUF_VERSION>(
      port: PortType,
      version: Version,
      matchMode: matchProtobufVersion.Mode,
      ...defaultMainProperties: Resolve.DefaultMainParams<Version>
    ): Promise<RpcApi<Version>>;
  },
>(Ctor: ApiType) {
  type PB_Main<Version extends PROTOBUF_VERSION> = Awaited<
    ReturnType<typeof Ctor.instantiate<Version>>
  >;
  async function create(
    port: PortType,
    ...[options, defaultMainProperties]: CreateArgs<
      PROTOBUF_VERSION,
      null | undefined
    >
  ): Promise<PB_Main<PROTOBUF_VERSION>>;
  async function create<const Version extends PROTOBUF_VERSION>(
    port: PortType,
    ...[options, defaultMainProperties]: CreateArgs<
      Version,
      | { version: Version; force?: boolean }
      | { version: Version; requireExactMatch?: boolean }
    >
  ): Promise<PB_Main<Version>>;
  async function create<const MinV extends PROTOBUF_VERSION>(
    port: PortType,
    ...[options, defaultMainProperties]: CreateArgs<
      Version.AndUp<MinV>,
      | { minVersion: MinV; requireExactMatch?: boolean }
      | {
          minVersion: MinV;
          fallbackVersion?: Version.AndUp<MinV>;
        }
    >
  ): Promise<PB_Main<Version.AndUp<MinV>>>;
  async function create<const MaxV extends PROTOBUF_VERSION>(
    port: PortType,
    ...[options, defaultMainProperties]: CreateArgs<
      Version.AndDown<MaxV>,
      | { maxVersion: MaxV; requireExactMatch?: boolean }
      | {
          maxVersion: MaxV;
          fallbackVersion?: Version.AndDown<MaxV>;
        }
    >
  ): Promise<PB_Main<Version.AndDown<MaxV>>>;
  async function create<
    const MinV extends PROTOBUF_VERSION,
    const MaxV extends PROTOBUF_VERSION,
  >(
    port: PortType,
    ...[options, defaultMainProperties]: CreateArgs<
      Version.Between<MinV, MaxV>,
      | { minVersion: MinV; maxVersion: MaxV; requireExactMatch?: boolean }
      | {
          maxVersion: MaxV;
          fallbackVersion?: Version.Between<MinV, MaxV>;
        }
    >
  ): Promise<PB_Main<Version.Between<MinV, MaxV>>>;
  async function create(
    port: PortType,
    ...[options, ...defaultMainProperties]: CreateArgs<
      PROTOBUF_VERSION,
      | {
          requireExactMatch?: boolean;
          fallbackVersion?: PROTOBUF_VERSION;
        }
      | null
      | undefined
    >
  ): Promise<PB_Main<PROTOBUF_VERSION>>;
  async function create(
    port: PortType,
    ...[options, ...defaultMainProperties]: CreateArgs<
      PROTOBUF_VERSION,
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
  ): Promise<PB_Main<PROTOBUF_VERSION>>;
  async function create(
    this: ApiType,
    port: PortType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...[options, ...defaultMainProperties]: CreateArgs<LATEST_VERSION, any>
  ): Promise<unknown> {
    const { version, matchMode } = await matchProtobufVersion<LATEST_VERSION>(
      port,
      options,
    );
    return Ctor.instantiate(port, version, matchMode, ...defaultMainProperties);
  }

  return create;
}
