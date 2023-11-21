import { ensureError } from './_internal/utils.js';
import protobuf from 'protobufjs';
import {
  FIRST_VERSION,
  LATEST_VERSION,
  PROTOBUF_VERSION,
  PROTOBUF_VERSIONS,
  loadVersion,
} from '@flipper-rpc-client/versioned-protobuf';
import { PB as BootstrapPB } from '@flipper-rpc-client/versioned-protobuf/bootstrap';
import RpcSerialPort from './RpcSerialPort.js';
import { AllVersionsInRange, ResolveVersion } from './Types.js';
import { ContextualizeError } from './_internal/utils.js';

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
  if (byMajorVersion[deviceMajor] != null) {
    return new Error(
      `Failed to find a suitable match for device protocol version v${deviceMajor.toFixed(
        0,
      )}.${deviceMinor.toFixed(
        0,
      )}. Needs to have a major version matching of ${Object.keys(
        byMajorVersion.keys,
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

function matchProtobufVersion(port: RpcSerialPort): Promise<{
  protobuf: ResolveVersion<[FIRST_VERSION, '...', LATEST_VERSION]>;
  version: AllVersionsInRange<[FIRST_VERSION, '...', LATEST_VERSION]>;
  matchMode: matchProtobufVersion.Mode;
}>;
function matchProtobufVersion<const Version extends PROTOBUF_VERSION>(
  port: RpcSerialPort,
  options:
    | { version: Version; force?: boolean }
    | { version: Version; requireExactMatch?: boolean },
): Promise<{
  protobuf: ResolveVersion<Version>;
  version: Version;
  matchMode: matchProtobufVersion.Mode;
}>;
function matchProtobufVersion<const MinV extends PROTOBUF_VERSION>(
  port: RpcSerialPort,
  options:
    | { minVersion: MinV; requireExactMatch?: boolean }
    | {
        minVersion: MinV;
        fallbackVersion?: AllVersionsInRange<[MinV, '...', LATEST_VERSION]>;
      },
): Promise<{
  protobuf: ResolveVersion<[MinV, '...', LATEST_VERSION]>;
  version: AllVersionsInRange<[MinV, '...', LATEST_VERSION]>;
  matchMode: matchProtobufVersion.Mode;
}>;
function matchProtobufVersion<const MaxV extends PROTOBUF_VERSION>(
  port: RpcSerialPort,
  options:
    | { maxVersion: MaxV; requireExactMatch?: boolean }
    | {
        maxVersion: MaxV;
        fallbackVersion?: AllVersionsInRange<[FIRST_VERSION, '...', MaxV]>;
      },
): Promise<{
  protobuf: ResolveVersion<[FIRST_VERSION, '...', MaxV]>;
  version: AllVersionsInRange<[FIRST_VERSION, '...', MaxV]>;
  matchMode: matchProtobufVersion.Mode;
}>;
function matchProtobufVersion<
  const MinV extends PROTOBUF_VERSION,
  const MaxV extends PROTOBUF_VERSION,
>(
  port: RpcSerialPort,
  options:
    | { minVersion: MinV; maxVersion: MaxV; requireExactMatch?: boolean }
    | {
        maxVersion: MaxV;
        fallbackVersion?: AllVersionsInRange<[MinV, '...', MaxV]>;
      },
): Promise<{
  protobuf: ResolveVersion<[MinV, '...', MaxV]>;
  version: AllVersionsInRange<[MinV, '...', MaxV]>;
  matchMode: matchProtobufVersion.Mode;
}>;
function matchProtobufVersion(
  port: RpcSerialPort,
  options?: {
    requireExactMatch?: boolean;
    fallbackVersion?: PROTOBUF_VERSION;
  } | null,
): Promise<{
  protobuf: ResolveVersion<[FIRST_VERSION, '...', LATEST_VERSION]>;
  version: AllVersionsInRange<[FIRST_VERSION, '...', LATEST_VERSION]>;
  matchMode: matchProtobufVersion.Mode;
}>;
function matchProtobufVersion<
  const Version extends PROTOBUF_VERSION,
  const MinV extends PROTOBUF_VERSION,
  const MaxV extends PROTOBUF_VERSION,
>(
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
): Promise<
  | {
      protobuf: ResolveVersion<[MinV, '...', MaxV]>;
      version: AllVersionsInRange<[MinV, '...', MaxV]>;
      matchMode: matchProtobufVersion.Mode;
    }
  | {
      protobuf: ResolveVersion<Version>;
      version: Version;
      matchMode: matchProtobufVersion.Mode;
    }
  | {
      protobuf: ResolveVersion<[FIRST_VERSION, '...', LATEST_VERSION]>;
      version: AllVersionsInRange<[FIRST_VERSION, '...', LATEST_VERSION]>;
      matchMode: matchProtobufVersion.Mode;
    }
>;
function matchProtobufVersion(
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
): Promise<{
  protobuf: ResolveVersion<[FIRST_VERSION, '...', LATEST_VERSION]>;
  version: AllVersionsInRange<[FIRST_VERSION, '...', LATEST_VERSION]>;
  matchMode: matchProtobufVersion.Mode;
}> {
  return new Promise<{
    protobuf: ResolveVersion<[FIRST_VERSION, '...', LATEST_VERSION]>;
    version: AllVersionsInRange<[FIRST_VERSION, '...', LATEST_VERSION]>;
    matchMode: matchProtobufVersion.Mode;
  }>((_resolve, _reject) => {
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
            protobuf: ResolveVersion<[FIRST_VERSION, '...', LATEST_VERSION]>;
            version: AllVersionsInRange<[FIRST_VERSION, '...', LATEST_VERSION]>;
            matchMode: matchProtobufVersion.Mode;
          }
        | PromiseLike<{
            protobuf: ResolveVersion<[FIRST_VERSION, '...', LATEST_VERSION]>;
            version: AllVersionsInRange<[FIRST_VERSION, '...', LATEST_VERSION]>;
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
    let remainder: Uint8Array | null = null;
    const commandId = 0xbabe;
    const messages: BootstrapPB.Main[] = [];
    async function tryClose() {
      if (port.state !== RpcSerialPort.State.DISCONNECTED) {
        return port.close().catch((err) => {
          throw ContextualizeError('ERROR WHEN CLOSING PORT', err);
        });
      }
      try {
        console.warn('Consumer already detached');
      } catch (err) {
        throw ContextualizeError('ERROR WHEN DETACHING CONSUMER', err);
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
          console.error(err);
        }
        if (err) {
          console.error(detachErr);
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
            console.error(err);
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
          console.warn('Command failed', message);
          continue;
        }
        if (message.content !== 'systemDeviceInfoResponse') {
          console.warn('Unexpected response', message);
          continue;
        }
        if (message.systemDeviceInfoResponse == null) {
          console.warn('Missing systemDeviceInfoResponse in response', message);
          continue;
        }
        if (message.systemDeviceInfoResponse.key === 'protobuf_version_major') {
          if (message.systemDeviceInfoResponse.value == null) {
            console.warn(
              'Missing protobuf_version_major value in response',
              message,
            );
            continue;
          }
          if (!/^\d+$/.test(message.systemDeviceInfoResponse.value)) {
            console.warn(
              'Invalid protobuf_version_major value in response',
              message.systemDeviceInfoResponse.value,
            );
            continue;
          }
          const numMajor = parseInt(message.systemDeviceInfoResponse.value, 10);
          if (protobufVersionMajor != null) {
            console.warn(
              'Duplicate protobuf_version_major in response %d -> %d. Picking the latter.',
              protobufVersionMajor,
              numMajor,
            );
          }
          protobufVersionMajor = numMajor;
        }
        if (message.systemDeviceInfoResponse.key === 'protobuf_version_minor') {
          if (message.systemDeviceInfoResponse.value == null) {
            console.warn('Missing protobuf_version_minor value', message);
            continue;
          }
          if (!/^\d+$/.test(message.systemDeviceInfoResponse.value)) {
            console.warn(
              'Invalid protobuf_version_minor value in response',
              message.systemDeviceInfoResponse.value,
            );
            continue;
          }
          const numMinor = parseInt(message.systemDeviceInfoResponse.value, 10);
          if (protobufVersionMinor != null) {
            console.warn(
              'Duplicate protobuf_version_minor in response %d -> %d. Picking the latter.',
              protobufVersionMinor,
              numMinor,
            );
          }
          protobufVersionMinor = numMinor;
        }
      }
      if (protobufVersionMajor == null && protobufVersionMinor == null) {
        console.warn(
          'Missing protocol version in response, assuming 0.1 (protobuf version response got introduced in 0.2)',
        );
        protobufVersionMajor = 0;
        protobufVersionMinor = 1;
      }
      if (protobufVersionMajor == null) {
        if (fallbackVersion != null) {
          console.warn(
            'Missing protocol major version, falling back to v%s',
            fallbackVersion,
          );
          return resolve(
            loadVersion(fallbackVersion).then((protobuf) => ({
              protobuf,
              version: fallbackVersion,
              matchMode: matchProtobufVersion.Mode.FALLBACK,
            })),
          );
        }
        return reject(new Error('Missing protocol major version'));
      }
      if (protobufVersionMinor == null) {
        if (fallbackVersion != null) {
          console.warn(
            'Missing protocol minor version, falling back to v%s',
            fallbackVersion,
          );
          return resolve(
            loadVersion(fallbackVersion).then((protobuf) => ({
              protobuf,
              version: fallbackVersion,
              matchMode: matchProtobufVersion.Mode.FALLBACK,
            })),
          );
        }
        return reject(new Error('Missing protobuf minor version'));
      }
      const maybeProtobufVersion = `${protobufVersionMajor}.${protobufVersionMinor}`;
      if (isAcceptedVersion(maybeProtobufVersion)) {
        console.log(
          'Loading protocol version v%s, exact match with device protocol version',
          maybeProtobufVersion,
          maybeProtobufVersion,
        );
        return resolve(
          loadVersion(maybeProtobufVersion).then((protobuf) => ({
            protobuf,
            version: maybeProtobufVersion,
            matchMode: matchProtobufVersion.Mode.EXACT,
          })),
        );
      } else if (!requireExactMatch) {
        console.warn(
          'Non-matching device protocol version v%s, attempting to find closest acceptable match...',
          maybeProtobufVersion,
        );
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
          console.warn(
            'Using protocol version v%s closest match for device protocol version v%s',
            bestMatch,
            maybeProtobufVersion,
          );
          return resolve(
            loadVersion(bestMatch).then((protobuf) => ({
              protobuf,
              version: bestMatch!,
              matchMode: matchProtobufVersion.Mode.CLOSEST,
            })),
          );
        }
        if (fallbackVersion != null) {
          console.warn(
            'No suitable match for device protocol version v%s, falling back to protocol version v%s',
            maybeProtobufVersion,
            fallbackVersion,
          );
          return resolve(
            loadVersion(fallbackVersion).then((protobuf) => ({
              protobuf,
              version: fallbackVersion,
              matchMode: matchProtobufVersion.Mode.FALLBACK,
            })),
          );
        }
        return reject(
          makeNonMatchingError(
            ACCEPTED_VERSIONS,
            protobufVersionMajor,
            protobufVersionMinor,
            false,
          ),
        );
      } else if (fallbackVersion) {
        console.warn(
          'Non-matching device protocol version v%s, falling back to protocol version v%s',
          maybeProtobufVersion,
          fallbackVersion,
        );
        return resolve(
          loadVersion(fallbackVersion).then((protobuf) => ({
            protobuf,
            version: fallbackVersion,
            matchMode: matchProtobufVersion.Mode.FALLBACK,
          })),
        );
      }
      return reject(
        makeNonMatchingError(
          ACCEPTED_VERSIONS,
          protobufVersionMajor,
          protobufVersionMinor,
          true,
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
          if (res.commandId === commandId) {
            messages.push(res);
            if (!res.hasNext) {
              finish(null);
            }
          } else if (res.commandId !== 0) {
            console.error(
              'Unexpected command response to command id',
              res.commandId,
            );
          } else {
            console.log(
              'Received event',
              res.content,
              res.content && res[res.content],
            );
          }
        } catch (err) {
          if (
            err instanceof RangeError &&
            err.message.startsWith('index out of range: ')
          ) {
            if (remainder.length < 16384) return;
            console.error('Refusing to parse message larger than 16kb');
          }
          finish(ensureError(err));
        }
      }
    }
    function onConnect() {
      const cmd = BootstrapPB.Main.create({
        commandId,
        hasNext: false,
        systemDeviceInfoRequest: {},
      });
      port.write(BootstrapPB.Main.encodeDelimited(cmd).finish());
    }
    if (forceVersion != null) {
      console.warn(
        'Forcing protocol version %s, without checking device version',
        forceVersion,
      );
      return resolve(
        loadVersion(forceVersion).then((protobuf) => ({
          protobuf,
          version: forceVersion,
          matchMode: matchProtobufVersion.Mode.FORCED,
        })),
      );
    } else {
      port.attachConsumer(onData);
      console.log(port.isConnected);
      if (port.isConnected) {
        onConnect();
      } else {
        port.open().then(onConnect);
      }
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace matchProtobufVersion {
  export enum Mode {
    FALLBACK = 'fallback',
    CLOSEST = 'closest',
    EXACT = 'exact',
    FORCED = 'forced',
  }
}

export default matchProtobufVersion;
