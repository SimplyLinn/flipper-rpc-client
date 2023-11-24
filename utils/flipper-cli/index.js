// @ts-check
import { RpcUsbSerialPort, RpcApiNode } from '@flipper-rpc-client/node';
import { SerialPort } from 'serialport';
import { createInterface } from 'node:readline/promises';
import util from 'node:util';
import { isValidVersion } from '@flipper-rpc-client/core';

let shouldPromptOnPrint = true;
let microTask = false;
/**
 * @overload
 * @param {string | Uint8Array} buffer
 * @param {(err?: Error) => void} [cb]
 * @returns {boolean}
 */
/**
 * @overload
 * @param {string | Uint8Array} buffer
 * @param {BufferEncoding} [encoding]
 * @param {(err?: Error) => void} [cb]
 * @returns {boolean}
 */
/**
 * @param  {...any} args
 * @returns {boolean}
 */
function write(...args) {
  try {
    if (shouldPromptOnPrint && !microTask) {
      process.stdout.cork();
      process.stdout.cursorTo(0);
      process.stdout.clearLine(0);
      process.stdout.uncork();
    }
    return process.stdout.write(
      .../** @type {Parameters<import('node:stream').Writable['write']>} */ (
        args
      ),
    );
  } finally {
    if (shouldPromptOnPrint && !microTask) {
      microTask = true;
      queueMicrotask(() => {
        microTask = false;
        rl.prompt(true);
      });
    }
  }
}

/**
 * @overload
 * @param {string} line
 * @param {(err?: Error) => void} [cb]
 * @returns {boolean}
 */
/**
 * @overload
 * @param {string | Uint8Array} line
 * @param {BufferEncoding} [encoding]
 * @param {(err?: Error) => void} [cb]
 * @returns {boolean}
 */
/**
 * @param {string | Uint8Array} line
 * @param {...any} args
 * @returns {boolean}
 */
function writeLine(line, ...args) {
  return write(line + '\n', ...args);
}

/** @type {Pick<typeof console, 'log' | 'error'>} */
const Console = {
  log(...args) {
    writeLine(util.format(...args));
  },
  error(...args) {
    writeLine(util.format(...args));
  },
};

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  tabSize: 2,
  removeHistoryDuplicates: true,
});

rl.on('SIGINT', () => {
  rl.close();
  process.stdout.write('^C');
  process.kill(process.pid, 'SIGINT');
});

rl.prompt(true);

/**
 * @param {import('@flipper-rpc-client/core').ScreenFrame} frame
 */
function printFrame(frame) {
  const rows = Array(frame.width);
  for (let i = 0; i < frame.height; i++) {
    const row = frame.getRow(i);
    for (let j = 0; j < row.length; j++) {
      const index = (row.length - j - 1) * 8;
      const byte = row[j];
      rows[index] = rows[index] || new Array(frame.height);
      rows[index + 1] = rows[index + 1] || new Array(frame.height);
      rows[index + 2] = rows[index + 2] || new Array(frame.height);
      rows[index + 3] = rows[index + 3] || new Array(frame.height);
      rows[index + 4] = rows[index + 4] || new Array(frame.height);
      rows[index + 5] = rows[index + 5] || new Array(frame.height);
      rows[index + 6] = rows[index + 6] || new Array(frame.height);
      rows[index + 7] = rows[index + 7] || new Array(frame.height);
      rows[index][i] = byte & 0x01 ? '█' : ' ';
      rows[index + 1][i] = byte & 0x02 ? '█' : ' ';
      rows[index + 2][i] = byte & 0x04 ? '█' : ' ';
      rows[index + 3][i] = byte & 0x08 ? '█' : ' ';
      rows[index + 4][i] = byte & 0x10 ? '█' : ' ';
      rows[index + 5][i] = byte & 0x20 ? '█' : ' ';
      rows[index + 6][i] = byte & 0x40 ? '█' : ' ';
      rows[index + 7][i] = byte & 0x80 ? '█' : ' ';
    }
  }
  for (const row of rows) {
    writeLine(row.join(''));
  }
}
/**
 * @type {RpcApiNode<any> | undefined}
 */
let rpcApi;

class FriendlyError extends Error {}

/**
 * @type {<T>(i: T) => asserts i is Exclude<T, null | undefined>}
 */
const assertNonNull = function assertNonNull(i) {
  if (i == null) {
    throw new FriendlyError(
      "Not connected to device, please use the 'connect' command",
    );
  }
};

/**
 * @type {Record<string, { (...args: string[]): unknown; description?: string }>}
 */
const cmds = {
  async help() {
    writeLine(
      'Commands:\n' +
        Object.entries(cmds)
          .map(
            ([cmd, fn]) =>
              `  ${cmd}${fn.description ? ` - ${fn.description}` : ''}`,
          )
          .join('\n'),
    );
  },
  async screenshot() {
    await /** @type {Promise<void>} */ (
      new Promise((resolve, reject) => {
        const api = (assertNonNull(rpcApi), rpcApi);
        api.once('guiScreenFrame', (frame) => {
          api.cmds
            .guiStopScreenStream()
            .then(() => {
              printFrame(frame);
              resolve();
            })
            .catch(reject);
        });
        api.cmds.guiStartScreenStream().catch(reject);
      })
    );
  },
  async device_info() {
    const api = (assertNonNull(rpcApi), rpcApi);
    const info = await api.cmds.systemDeviceInfo();
    const keys = Object.keys(info);
    const maxKeyLength = Math.max(...keys.map((k) => k.length));
    writeLine(
      keys.map((k) => `${k.padEnd(maxKeyLength)} : ${info[k]}`).join('\n'),
    );
  },
  async list() {
    const ports = await SerialPort.list();
    writeLine(
      ports
        .map(
          (port) =>
            `${port.path} - ${port.manufacturer ?? port.serialNumber ?? ''}`,
        )
        .join('\n'),
    );
  },
  async connect(path, version) {
    if (rpcApi) {
      throw new FriendlyError(
        'Already connected to device, please disconnect before connecting to another device',
      );
    }
    if (path == null) {
      throw new FriendlyError('No path specified');
    }
    const portList = await SerialPort.list();
    const portDetails = portList.find((p) => p.path === path);
    if (!portDetails) {
      throw new FriendlyError(`Unable to find device at ${path}`);
    }
    if (version) {
      if (!isValidVersion(version)) {
        throw new FriendlyError(
          `Invalid version specified, must be in the format of ${isValidVersion(
            '',
          )}`,
        );
      }
      const port = new RpcUsbSerialPort(
        new SerialPort({
          ...portDetails,
          baudRate: 115200,
          autoOpen: false,
        }),
      );
      rpcApi = await RpcApiNode.create(port, {
        version,
      });
    } else {
      const port = new RpcUsbSerialPort(
        new SerialPort({
          ...portDetails,
          baudRate: 115200,
          autoOpen: false,
        }),
      );
      rpcApi = await RpcApiNode.create(port);
    }
    await rpcApi.connect();
  },
  async disconnect() {
    const api = (assertNonNull(rpcApi), rpcApi);
    await api.disconnect();
    rpcApi = undefined;
    rl.close();
  },
};

cmds.help.description = 'Prints this help message';

rl.on(
  'line',
  /** @this {import('node:readline/promises').Interface} */
  async function (line) {
    shouldPromptOnPrint = false;
    rl.pause();
    try {
      line = line.trim();
      if (line === '') {
        return;
      }
      const [cmd, ...args] = line.split(/\s+/);
      const lCmd = cmd.toLowerCase();
      if (cmds[lCmd]) {
        try {
          await cmds[lCmd](...args.filter((s) => s.trim() !== ''));
        } catch (e) {
          if (e instanceof FriendlyError) Console.error(e.message);
          else Console.error(e);
        }
      } else {
        Console.log('Unknown command: %s', cmd);
        await cmds.help();
      }
    } finally {
      shouldPromptOnPrint = true;
      rl.resume();
      this.prompt(true);
    }
  },
);
