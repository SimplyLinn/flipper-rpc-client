import url from 'node:url';
import path from 'node:path';
import child_process from 'node:child_process';
import pbjs from 'protobufjs-cli/pbjs.js';
import fs from 'node:fs/promises';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import prettier from 'prettier';
import typeName from './typeName.js';

export async function doPrettier(data, filePath) {
  const config = await prettier.resolveConfig(filePath);
  return prettier.format(data, {
    ...config,
    filepath: filePath,
  });
}

const validVersionRegex =
  /^(?:[1-9]\d*|0)\.(?:[1-9]\d*|0)(?:\.(?:[1-9]\d*|0)(?:[-_.].*)?)?(?:[-_].*)?$/;

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export const argv = await yargs(hideBin(process.argv)).argv;

if ('root' in argv && typeof argv.root !== 'string') {
  console.error(
    'Invalid root argument, expected string got %s',
    typeName(argv.root),
  );
  process.exit(1);
}

export const OUTPUT_ROOT =
  typeof argv.root !== 'string'
    ? process.cwd()
    : path.resolve(process.cwd(), argv.root);

export const VERSIONS_DIR = path.join(OUTPUT_ROOT, 'v');

class CmdError extends Error {
  /**
   * @readonly
   * @type {readonly (readonly [buffer: 'stderr' | 'stdout', data: Buffer])[]}
   */
  output;
  /**
   * @readonly
   * @type {number | null}
   */
  code;
  /**
   * @readonly
   * @type {NodeJS.Signals | null}
   */
  signal;
  /**
   * @readonly
   * @type {string}
   */
  cmd;
  /**
   * @readonly
   * @type {string}
   */
  cwd;
  /**
   * @readonly
   * @type {readonly string[]}
   */
  args;

  /**
   * @overload
   * @param {string} msg
   * @param {{ cwd: string; cmd: string; args: readonly string[]; code?: number | null; signal?: NodeJS.Signals | null; output: readonly (readonly [buffer: 'stderr' | 'stdout', data: Buffer])[] }} opts
   */
  /**
   * @overload
   * @param {Error} err
   * @param {{ cwd: string; cmd: string; args: readonly string[]; code?: number | null; signal?: NodeJS.Signals | null; output: readonly (readonly [buffer: 'stderr' | 'stdout', data: Buffer])[] }} opts
   */
  /**
   * @param {string | Error} msgOrError
   * @param {{ cwd: string; cmd: string; args: readonly string[]; code?: number | null; signal?: NodeJS.Signals | null; output: readonly (readonly [buffer: 'stderr' | 'stdout', data: Buffer])[] }} opts
   */
  constructor(msgOrError, opts) {
    if (msgOrError instanceof Error) {
      super(msgOrError.message, { cause: msgOrError });
    } else {
      super(msgOrError);
    }
    ({
      output: this.output,
      code: this.code = null,
      signal: this.signal = null,
      cmd: this.cmd,
      cwd: this.cwd,
      args: this.args,
    } = opts);
  }
}

/**
 * @param {string[]} [extraTags]
 */
export async function* loadTags(extraTags) {
  // Init the git submodule stuff
  let fetchError;
  await Loader('Initializing git submodule', () =>
    runCmd('git', ['submodule', 'init', 'flipperzero-protobuf']).then(() =>
      runCmd(
        'git',
        ['fetch', '--tags', '--force', '--recurse-submodules=no'],
        null,
        path.join(process.cwd(), 'flipperzero-protobuf'),
      ).catch((err) => {
        fetchError = err ?? null;
      }),
    ),
  ).then(
    () => {
      if (typeof fetchError === 'undefined') return;
      // Not a fatal error, report it and continue
      console.error('Failed to fetch tags from upstream flipperzero-protobuf');
      if (fetchError instanceof CmdError) {
        const stderr = [];
        for (const [buffer, data] of fetchError.output) {
          if (buffer === 'stderr') {
            stderr.push(data.toString('utf8'));
          }
        }
        if (stderr.length > 0) {
          console.error(stderr.join(''));
        }
      } else {
        console.error(fetchError);
      }
    },
    /** @param {unknown} err */
    (err) => {
      console.error('Failed to init git submodule');
      if (err instanceof CmdError) {
        const stderr = [];
        for (const [buffer, data] of err.output) {
          if (buffer === 'stderr') {
            stderr.push(data.toString('utf8'));
          }
        }
        if (stderr.length > 0) {
          console.error(stderr.join(''));
        }
        if (err) console.error(err);
      } else {
        console.error(err);
      }
      process.exit(1);
    },
  );
  const [tagMap, tagsToFetch] = await Loader('Getting git tags', async () => {
    await runCmd(
      'git',
      ['update-index', '--really-refresh'],
      null,
      path.join(process.cwd(), 'flipperzero-protobuf'),
    );
    const output = await runCmd(
      'git',
      ['status', '--porcelain=v1'],
      null,
      path.join(process.cwd(), 'flipperzero-protobuf'),
    );
    if (output.some(([, data]) => data.length > 0)) {
      console.warn(
        'flipperzero-protobuf is not clean! Refusing fetch upstream for build.',
      );
      return [Object.create(null), []];
    }
    return mapGitTags(extraTags);
  });
  for (const tagName of tagsToFetch) {
    if (!Object.hasOwn(tagMap, tagName)) {
      throw new Error(`Unknown version ${tagName}`);
    }
    const version = tagMap[tagName];
    const tagCommit = await runCmd(
      'git',
      ['rev-list', '-n', '1', `tags/${tagName}`],
      null,
      path.join(process.cwd(), 'flipperzero-protobuf'),
    ).then((output) =>
      Buffer.concat(output.map(([, data]) => data))
        .toString('utf8')
        .trim(),
    );
    const outDir = path.join(VERSIONS_DIR, version);
    if (!(await needsCompile(tagCommit, outDir))) {
      console.info('~~ Version %s already compiled, skipping', version);
      continue;
    }
    console.info('\n~~ Compiling protobuf version %s', version);
    console.info('Compiling protobuf version %s...', version);
    const srcFiles = await loadProtobufTag(tagName);
    yield {
      commit: tagCommit,
      version,
      outDir,
      srcFiles,
    };
    console.info('Compiling protobuf version %s: DONE', version);
  }
}

/**
 * @param {string} tagName
 * @returns {Promise<string[]>}
 */
function loadProtobufTag(tagName) {
  return Loader(`Checking out flipperzero-protobuf#tags/${tagName}`, () =>
    runCmd(
      'git',
      ['checkout', `tags/${tagName}`],
      null,
      path.join(process.cwd(), 'flipperzero-protobuf'),
    )
      .then(() =>
        fs.readdir(path.join(process.cwd(), 'flipperzero-protobuf'), {
          withFileTypes: true,
        }),
      )
      .then((files) =>
        files
          .filter((f) => f.isFile() && f.name.endsWith('.proto'))
          .sort(({ name: a }, { name: b }) => (a < b ? -1 : a > b ? 1 : 0))
          .map(({ name }) =>
            path.join(process.cwd(), 'flipperzero-protobuf', name),
          ),
      ),
  );
}

export async function needsCompile(tagCommit, outDir) {
  if (
    !(await fs.stat(outDir).then(
      (s) => s.isDirectory(),
      (e) => {
        if (
          typeof e === 'object' &&
          e != null &&
          e instanceof Error &&
          'code' in e &&
          e.code === 'ENOENT'
        ) {
          return false;
        }
        throw e;
      },
    ))
  )
    return true;
  const hasAllFiles = await Promise.all([
    fs.stat(path.join(outDir, 'index.js')).then(
      (s) => s.isFile(),
      (e) => {
        if (
          typeof e === 'object' &&
          e != null &&
          e instanceof Error &&
          'code' in e &&
          e.code === 'ENOENT'
        ) {
          return false;
        }
        throw e;
      },
    ),
    fs.stat(path.join(outDir, 'index.cjs')).then(
      (s) => s.isFile(),
      (e) => {
        if (
          typeof e === 'object' &&
          e != null &&
          e instanceof Error &&
          'code' in e &&
          e.code === 'ENOENT'
        ) {
          return false;
        }
        throw e;
      },
    ),
    fs.stat(path.join(outDir, 'index.d.ts')).then(
      (s) => s.isFile(),
      (e) => {
        if (
          typeof e === 'object' &&
          e != null &&
          e instanceof Error &&
          'code' in e &&
          e.code === 'ENOENT'
        ) {
          return false;
        }
        throw e;
      },
    ),
    fs.stat(path.join(outDir, '.git_commit')).then(
      (s) => s.isFile(),
      (e) => {
        if (
          typeof e === 'object' &&
          e != null &&
          e instanceof Error &&
          'code' in e &&
          e.code === 'ENOENT'
        ) {
          return false;
        }
        throw e;
      },
    ),
  ]).then((results) => results.every((b) => b));
  if (!hasAllFiles) return true;
  const existingCommit = await fs
    .readFile(path.join(outDir, '.git_commit'), 'utf8')
    .then((s) => s.trim());
  return tagCommit !== existingCommit;
}

/**
 * @template {unknown} T
 * @param {string} text
 * @param {(() => Promise<T>) | Promise<T>} toAwait
 * @returns {Promise<T>}
 */
export async function Loader(text, toAwait) {
  console.log(`${text}...`);
  return (typeof toAwait === 'function' ? toAwait() : toAwait).then(
    (res) => {
      console.log(`${text}: DONE!`);
      return res;
    },
    (err) => {
      console.log(`${text}: FAILED!`);
      throw err;
    },
  );
}

/**
 *
 * @param {string} cmd
 * @param {string[]} args
 * @param {string | Buffer | NodeJS.ReadableStream | null} [stdin]
 * @param {string} [cwd]
 * @returns {Promise<(readonly [buffer: 'stdout' | 'stderr', data: Buffer])[]>}
 */
export function runCmd(cmd, args, stdin, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    try {
      const cp = child_process.spawn(cmd, args, {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd,
      });
      /** @type {(readonly [buffer: 'stdout' | 'stderr', data: Buffer])[]} */
      const output = [];
      cp.stdout.on(
        'data',
        /** @param {Buffer} data */ (data) => {
          output.push(['stdout', data]);
        },
      );
      cp.stderr.on(
        'data',
        /** @param {Buffer} data */ (data) => {
          output.push(['stderr', data]);
        },
      );
      cp.on('exit', (code, signal) => {
        if (code !== 0) {
          reject(
            new CmdError(`${cmd} exited with code ${code}`, {
              cmd,
              args,
              cwd,
              code,
              signal,
              output,
            }),
          );
        } else {
          resolve(output);
        }
      });
      cp.on('error', (err) =>
        reject(
          new CmdError(err, {
            cmd,
            args,
            cwd,
            output,
          }),
        ),
      );
      if (!cp.stdin.closed) {
        if (stdin instanceof Buffer || typeof stdin === 'string') {
          cp.stdin.write(stdin, (err) =>
            err
              ? reject(
                  new CmdError(err, {
                    cmd,
                    args,
                    cwd,
                    output,
                  }),
                )
              : cp.stdin.end(),
          );
        } else if (stdin != null && 'pipe' in stdin) {
          stdin.pipe(cp.stdin);
        } else cp.stdin.end();
      }
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * @param {string[] | null} extraTags
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
function sortVersionsFancy(extraTags, a, b) {
  const aIsValid = validVersionRegex.test(a);
  const bIsValid = validVersionRegex.test(b);
  if (!aIsValid || !bIsValid) {
    if (aIsValid) return -1;
    if (bIsValid) return 1;
    return a < b ? -1 : a > b ? 1 : 0;
  }
  const [aMajor, aMinor, aPatch = null] = a
    .split('.')
    .map((s) => Number.parseInt(s.split(/[-_]/, 1)[0], 10));
  const [bMajor, bMinor, bPatch = null] = b
    .split('.')
    .map((s) => Number.parseInt(s.split(/[-_]/, 1)[0], 10));
  if (aMajor !== bMajor) return aMajor - bMajor;
  if (aMinor !== bMinor) return aMinor - bMinor;
  if (extraTags) {
    if (extraTags.includes(a) && !extraTags.includes(b)) return 1;
    if (extraTags.includes(b) && !extraTags.includes(a)) return -1;
  }
  if (aPatch === bPatch) return 0;
  if (aPatch === null) return 1;
  if (bPatch === null) return -1;
  return aPatch - bPatch;
}

/**
 * @type {(a: string, b: string) => number}
 */
export const sortVersions = sortVersionsFancy.bind(null, null);

/**
 * @param {string[]} extraTags
 * @returns {Promise<[versionTagMap: Record<string, string>, toFetch: string[]]>}
 */
async function mapGitTags(extraTags = []) {
  const tags = await runCmd(
    'git',
    ['tag', '--list'],
    null,
    path.join(process.cwd(), 'flipperzero-protobuf'),
  ).then((output) =>
    `${output
      .map(([, data]) => data.toString('utf8').trim())
      .join('')}\n0.2.2`.split(/\r?\n/),
  );

  const autoIncludeRegex =
    /^(?:[1-9]\d*|0)\.(?:[1-9]\d*|0)(?:\.(?:[1-9]\d*|0))?$/;

  const map = tags
    .filter((s) => {
      if (extraTags.includes(s)) return true;
      if (s === '0.0') return false;
      if (!autoIncludeRegex.test(s)) {
        console.warn(`Ignoring invalid git-tag: ${s}`);
        return false;
      }
      return true;
    })
    .sort(sortVersionsFancy.bind(null, extraTags))
    .reduceRight((acc, cur) => {
      if (!validVersionRegex.test(cur)) {
        if (!Object.hasOwn(acc, cur)) acc[cur] = cur;
      } else {
        const [major, minor] = cur
          .split('.')
          .map((s) => Number.parseInt(s.split(/[-_]/, 1)[0], 10));
        const key = `${major}.${minor}`;
        if (!Object.hasOwn(acc, key)) acc[key] = cur;
      }
      return acc;
    }, {});

  const reverseMap = Object.assign(
    Object.create(null),
    Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k])),
  );
  if (extraTags.length > 0) {
    for (let i = extraTags.length - 1; i >= 0; i--) {
      if (!Object.hasOwn(reverseMap, extraTags[i])) {
        console.warn(
          'Ignoring specified version %s, not found in git tags',
          extraTags[i],
        );
        extraTags.splice(i, 1);
      }
    }
    if (extraTags.length === 0) {
      console.error(
        'No specified versions found in git tags, exiting without generating protobuf static module',
      );
      process.exit(1);
    }
  } else {
    extraTags.push(...Object.keys(reverseMap));
  }
  return [reverseMap, extraTags];
}

/**
 *
 * @param {string[]} args
 * @returns {Promise<string>}
 */
export function pbjsMain(args) {
  return new Promise((resolve, reject) =>
    pbjs.main(args, function (err, output) {
      if (err) reject(err);
      resolve(output ?? '');
    }),
  );
}

/**
 *
 * @param {string[]} args
 * @param {string} [stdin]
 * @returns {Promise<string>}
 */
export function pbtsMain(args, stdin) {
  return new Promise((resolve, reject) => {
    try {
      const ts = child_process.spawn(
        'node',
        [
          '-e',
          'var cli=require("protobufjs-cli/pbts.js");var ret=cli.main(process.argv.slice(1));if(typeof ret==="number")process.exit(ret);',
          '--',
          ...args,
        ],
        {
          stdio: ['pipe', 'pipe', 'pipe'],
          cwd: __dirname,
        },
      );
      let output = '';
      let stdout = '';
      ts.stdout.on(
        'data',
        /** @param {Buffer} data */ (data) => {
          const str = data.toString('utf8');
          output += str;
          stdout += str;
        },
      );
      let stderr = '';
      ts.stderr.on(
        'data',
        /** @param {Buffer} data */ (data) => {
          const str = data.toString('utf8');
          output += str;
          stderr += str;
        },
      );
      ts.on('exit', (code) => {
        if (code !== 0) {
          reject(
            Object.assign(new Error(`pbts exited with code ${code}`), {
              code,
              output,
              stdout,
              stderr,
            }),
          );
        }
        resolve(output);
      });
      ts.on('error', (err) => reject(err));
      if (!ts.stdin.closed) {
        if (stdin != null)
          ts.stdin.write(stdin, (err) =>
            err ? reject(err) : ts.stdin.end((err) => err && reject(err)),
          );
        else ts.stdin.end((err) => err && reject(err));
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function formatEslintMessage(
  srcLines,
  message,
  preContext = 3,
  postContext = preContext,
) {
  const startLine = message.line - 1;
  const startColumn = message.column - 1;
  const endLine =
    message.endLine != null && message.endColumn != null
      ? message.endLine - 1
      : startLine;
  const endColumn =
    message.endLine != null && message.endColumn != null
      ? message.endColumn - 1
      : startColumn;
  const lineNumCount = Math.min(
    endLine + postContext + 1,
    srcLines.length,
  ).toString(10).length;
  const outLines = srcLines
    .slice(Math.max(startLine - preContext, 0), startLine)
    .map(
      (l, i) =>
        `${(Math.max(startLine - preContext, 0) + i + 1)
          .toString(10)
          .padStart(lineNumCount, ' ')} | ${l}`,
    );
  if (startLine === endLine) {
    outLines.push(
      `${(startLine + 1).toString(10).padStart(lineNumCount, ' ')} | ${
        srcLines[startLine]
      }`,
      `${' '.repeat(lineNumCount)}   ${' '.repeat(startColumn)}${'^'.repeat(
        endColumn - startColumn + 1,
      )}`,
    );
  } else {
    outLines.push(
      `${(startLine + 1).toString(10).padStart(lineNumCount, ' ')} | ${
        srcLines[startLine]
      }`,
      `${' '.repeat(lineNumCount)}   ${' '.repeat(startColumn - 1)}${'^'.repeat(
        srcLines[startLine].length - startColumn,
      )}`,
    );
    for (let i = startLine + 1; i < endLine; i++) {
      outLines.push(
        `${i.toString(10).padStart(lineNumCount, ' ')} | ${srcLines[i]}`,
        `${' '.repeat(lineNumCount)}   ${'^'.repeat(srcLines[i].length)}`,
      );
    }
    outLines.push(
      `${(endLine + 1).toString(10).padStart(lineNumCount, ' ')} | ${
        srcLines[endLine]
      }`,
      `${' '.repeat(lineNumCount)}   ${'^'.repeat(endColumn)}`,
    );
  }
  outLines.push(
    ...srcLines
      .slice(endLine + 1, endLine + postContext + 1)
      .map(
        (l, i) =>
          `${(endLine + i + 2)
            .toString(10)
            .padStart(lineNumCount, ' ')} | ${l}`,
      ),
  );
  return outLines;
}
