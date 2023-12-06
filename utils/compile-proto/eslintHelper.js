import child_process from 'node:child_process';
import path from 'node:path';
import util from 'node:util';
import url from 'node:url';
import typeName from './typeName.js';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/**
 * @param {unknown} fix
 * @returns {asserts suggestion is import('eslint').Rule.Fix}
 */
function assertValidEslintRuleFix(fix) {
  if (typeof fix === 'object' && fix !== null) {
    if (!('range' in fix)) {
      throw new Error(`Missing fix.range, expected [number, number]`);
    } else if (Array.isArray(fix.range)) {
      if (fix.range.length !== 2) {
        throw new Error(
          `Invalid fix.range, expected [number, number], got ${fix.range.length} elements`,
        );
      }
      if (!fix.range.every((n) => typeof n === 'number')) {
        throw new Error(
          `Invalid fix.range, expected [number, number], got [${
            (typeName(fix.range[0]), typeName(fix.range[1]))
          }]`,
        );
      }
    } else {
      throw new Error(
        `Invalid fix.range, expected expected [number, number], got ${typeName(
          fix.range,
        )}`,
      );
    }
    if (!('text' in fix) || typeof fix.text === 'undefined')
      throw new Error(`Missing fix.text, expected string`);
    else typeof fix.text !== 'string';
    throw new Error(
      `Invalid fix.text, expected string, got ${typeName(fix.text)}`,
    );
  }
  throw new Error(`Invalid fix, expected object got ${typeName(fix)}`);
}

/**
 * @param {unknown} suggestion
 * @returns {asserts suggestion is import('eslint').Linter.LintSuggestion}
 */
function assertValidEslintSuggestion(suggestion) {
  if (typeof suggestion !== 'object' || suggestion === null) {
    throw new Error(
      `Invalid suggestion, expected object, got ${typeName(suggestion)}`,
    );
  }
  if (!('desc' in suggestion) || typeof suggestion.desc === 'undefined') {
    throw new Error(`Missing property desc, expected string`);
  }
  if (typeof suggestion.desc !== 'string') {
    throw new Error(
      `Invalid property desc, expected string, got ${typeName(
        suggestion.desc,
      )}`,
    );
  }
  if (!('fix' in suggestion) || typeof suggestion.fix === 'undefined') {
    throw new Error(`Missing property fix, expected object`);
  }
  assertValidEslintRuleFix(suggestion.fix);
}

/**
 * @param {unknown} message
 * @returns {asserts message is import('eslint').Linter.LintMessage}
 */
function assertValidEslintMessage(message) {
  if (typeof message !== 'object' || message === null) {
    throw new Error(
      `Invalid message, expected object, got ${typeName(message)}`,
    );
  }
  if (!('column' in message) || typeof message.column === 'undefined') {
    throw new Error(`Missing property column, expected number`);
  }
  if (typeof message.column !== 'number') {
    throw new Error(
      `Invalid property column, expected number, got ${typeName(
        message.column,
      )}`,
    );
  }
  if (!('line' in message) || typeof message.line === 'undefined') {
    throw new Error(`Missing property line, expected number`);
  }
  if (typeof message.line !== 'number') {
    throw new Error(
      `Invalid property line, expected number, got ${typeName(message.line)}`,
    );
  }
  if (
    'endColumn' in message &&
    typeof message.endColumn !== 'number' &&
    typeof message.endColumn !== 'undefined'
  ) {
    throw new Error(`Invalid property endColumn, expected number or undefined`);
  }
  if (
    'endLine' in message &&
    typeof message.endLine !== 'number' &&
    typeof message.endLine !== 'undefined'
  ) {
    throw new Error(`Invalid property endLine, expected number or undefined`);
  }
  if (!('ruleId' in message) || typeof message.ruleId === 'undefined') {
    throw new Error(`Missing property ruleId, expected string or null`);
  }
  if (typeof message.ruleId !== 'string' && message.ruleId !== null) {
    throw new Error(
      `Invalid property ruleId, expected string or null, got ${typeName(
        message.ruleId,
      )}`,
    );
  }
  if (!('message' in message) || typeof message.message === 'undefined') {
    throw new Error(`Missing property message, expected string`);
  }
  if (typeof message.message !== 'string') {
    throw new Error(
      `Invalid property message, expected string, got ${typeName(
        message.message,
      )}`,
    );
  }
  if (
    'messageId' in message &&
    typeof message.messageId !== 'string' &&
    typeof message.messageId !== 'undefined'
  ) {
    throw new Error(
      `Invalid property messageId, expected string or undefined, got ${typeName(
        message.messageId,
      )}}`,
    );
  }
  if (
    'nodeType' in message &&
    typeof message.nodeType !== 'string' &&
    typeof message.nodeType !== 'undefined'
  ) {
    throw new Error(
      `Invalid property nodeType, expected string or undefined, got ${typeName(
        message.nodeType,
      )}`,
    );
  }
  if (
    'fatal' in message &&
    message.fatal !== true &&
    typeof message.fatal !== 'undefined'
  ) {
    throw new Error(
      `Invalid property fatal, expected true or undefined, got ${typeName(
        message.fatal,
      )}`,
    );
  }
  if (
    'severity' in message &&
    message.severity !== 0 &&
    message.severity !== 1 &&
    message.severity !== 2 &&
    typeof message.severity !== 'undefined'
  ) {
    throw new Error(`Invalid property severity, expected 0, 1, 2 or undefined`);
  }
  if ('fix' in message && typeof message.fix !== 'undefined') {
    assertValidEslintRuleFix(message.fix);
  }
  if (
    'source' in message &&
    typeof message.source !== 'string' &&
    message.source != null
  ) {
    throw new Error(
      `Invalid property source, expected string or null, got ${typeName(
        message.source,
      )})}`,
    );
  }
  if ('suggestions' in message) {
    if (!Array.isArray(message.suggestions)) {
      throw new Error(
        `Invalid property suggestions, expected array, got ${typeName(
          message.suggestions,
        )}}`,
      );
    }
    message.suggestions.forEach((s, j) => {
      try {
        assertValidEslintSuggestion(s);
      } catch (err) {
        if (err instanceof Error) {
          err.message = `Invalid message.suggestions[${j}]\n${err.message}`;
        }
        throw err;
      }
    });
  }
}

/**
 * @param {unknown} suppression
 * @returns {asserts suppression is import('eslint').Linter.LintSuppression}
 */
function assertValidEslintSuppression(suppression) {
  if (typeof suppression !== 'object' || suppression === null) {
    throw new Error(
      `Invalid suppression, expected object, got ${typeName(suppression)}`,
    );
  }
  if (!('kind' in suppression)) {
    throw new Error(`Missing property kind in suppression, expected string`);
  }
  if (typeof suppression.kind !== 'string') {
    throw new Error(
      `Invalid property kind in suppression, expected string, got ${typeName(
        suppression.kind,
      )}`,
    );
  }
  if (!('justification' in suppression)) {
    throw new Error(
      `Missing property justification in suppression, expected string`,
    );
  }
  if (typeof suppression.justification !== 'string') {
    throw new Error(
      `Invalid property justification in suppression, expected string, got ${typeName(
        suppression.justification,
      )}`,
    );
  }
}

/**
 * @param {unknown} message
 * @returns {asserts message is import('eslint').Linter.SuppressedLintMessage}
 */
function assertValidSuppressedEslintMessage(message) {
  assertValidEslintMessage(message);
  if (!('suppressions' in message)) {
    throw new Error(`Missing property suppressions, expected array`);
  }
  if (!Array.isArray(message.suppressions)) {
    throw new Error(
      `Invalid property suppressions, expected array, got ${typeName(
        message.suppressions,
      )}`,
    );
  }
  message.suppressions.forEach((s, j) => {
    try {
      assertValidEslintSuppression(s);
    } catch (err) {
      if (err instanceof Error) {
        err.message = `Invalid message.suppressions[${j}]\n${err.message}`;
      }
      throw err;
    }
  });
}

/**
 * @param {unknown} rule
 * @returns {asserts rule is import('eslint').ESLint.DeprecatedRuleUse}
 */
function assertValidDeprecatedRule(rule) {
  if (typeof rule !== 'object' || rule === null) {
    throw new Error(
      `Invalid deprecated rule, expected object, got ${typeName(rule)}`,
    );
  }
  if (!('ruleId' in rule)) {
    throw new Error(`Missing property ruleId, expected string`);
  }
  if (typeof rule.ruleId !== 'string') {
    throw new Error(
      `Invalid property ruleId, expected string, got ${typeName(rule.ruleId)}`,
    );
  }
  if (!('replacedBy' in rule)) {
    throw new Error(`Missing property replacedBy, expected array`);
  }
  if (!Array.isArray(rule.replacedBy)) {
    throw new Error(
      `Invalid property replacedBy, expected array, got ${typeName(
        rule.replacedBy,
      )}`,
    );
  }
  rule.replacedBy.forEach((r, i) => {
    if (typeof r !== 'string') {
      throw new Error(
        `Invalid property replacedBy[${i}], expected string, got ${typeName(
          r,
        )}`,
      );
    }
  });
}

/**
 * @param {unknown} o
 * @returns {asserts o is import('eslint').ESLint.LintResult}
 */
function assertValidEslintResult(o) {
  if (typeof o !== 'object' || o === null) {
    throw new Error(`Expected object, got ${typeName(o)}`);
  }
  if (!('filePath' in o) || typeof o.filePath === 'undefined') {
    throw new Error(`Missing property filePath, expected string`);
  }
  if (typeof o.filePath !== 'string') {
    throw new Error(
      `Invalid property filePath, expected string, got ${typeName(o.filePath)}`,
    );
  }
  if (!('messages' in o) || typeof o.messages === 'undefined') {
    throw new Error(`Missing property messages, expected array`);
  }
  if (!Array.isArray(o.messages)) {
    throw new Error(
      `Invalid property messages, expected array, got ${typeName(o.messages)}`,
    );
  }
  if (
    !('suppressedMessages' in o) ||
    typeof o.suppressedMessages === 'undefined'
  ) {
    throw new Error(`Missing property suppressedMessages, expected array`);
  }
  if (!Array.isArray(o.suppressedMessages)) {
    throw new Error(
      `Invalid property suppressedMessages, expected array, got ${typeName(
        o.suppressedMessages,
      )}`,
    );
  }
  if (!('errorCount' in o) || typeof o.errorCount === 'undefined') {
    throw new Error(`Missing property errorCount, expected number`);
  }
  if (typeof o.errorCount !== 'number') {
    throw new Error(
      `Invalid property errorCount, expected number, got ${typeName(
        o.errorCount,
      )}`,
    );
  }
  if (!('fatalErrorCount' in o) || typeof o.fatalErrorCount === 'undefined') {
    throw new Error(`Missing property fatalErrorCount, expected number`);
  }
  if (typeof o.fatalErrorCount !== 'number') {
    throw new Error(
      `Invalid property fatalErrorCount, expected number, got ${typeName(
        o.fatalErrorCount,
      )}`,
    );
  }
  if (!('warningCount' in o) || typeof o.warningCount === 'undefined') {
    throw new Error(`Missing property warningCount, expected number`);
  }
  if (typeof o.warningCount !== 'number') {
    throw new Error(
      `Invalid property warningCount, expected number, got ${typeName(
        o.warningCount,
      )}`,
    );
  }
  if (
    !('fixableErrorCount' in o) ||
    typeof o.fixableErrorCount === 'undefined'
  ) {
    throw new Error(`Missing property fixableErrorCount, expected number`);
  }
  if (typeof o.fixableErrorCount !== 'number') {
    throw new Error(
      `Invalid property fixableErrorCount, expected number, got ${typeName(
        o.fixableErrorCount,
      )}`,
    );
  }
  if (
    !('fixableWarningCount' in o) ||
    typeof o.fixableWarningCount === 'undefined'
  ) {
    throw new Error(`Missing property fixableWarningCount, expected number`);
  }
  if (typeof o.fixableWarningCount !== 'number') {
    throw new Error(
      `Invalid property fixableWarningCount, expected number, got ${typeName(
        o.fixableWarningCount,
      )}`,
    );
  }
  if (
    !('usedDeprecatedRules' in o) ||
    typeof o.usedDeprecatedRules === 'undefined'
  ) {
    throw new Error(`Missing property usedDeprecatedRules, expected array`);
  }
  if (!Array.isArray(o.usedDeprecatedRules)) {
    throw new Error(
      `Invalid property usedDeprecatedRules, expected array, got ${typeName(
        o.usedDeprecatedRules,
      )}`,
    );
  }
  if (
    'output' in o &&
    typeof o.output !== 'string' &&
    typeof o.output !== 'undefined'
  ) {
    throw new Error(
      `Invalid property output, expected string or undefined, got ${typeName(
        o.output,
      )}`,
    );
  }
  if (
    'source' in o &&
    typeof o.source !== 'string' &&
    typeof o.source !== 'undefined'
  ) {
    throw new Error(
      `Invalid property source, expected string or undefined, got ${typeName(
        o.source,
      )}`,
    );
  }
  o.messages.forEach((m, i) => {
    try {
      assertValidEslintMessage(m);
    } catch (err) {
      if (err instanceof Error) {
        err.message = `Invalid property messages[${i}]\n${err.message}`;
      }
      throw err;
    }
  });
  o.suppressedMessages.forEach((m, i) => {
    try {
      assertValidSuppressedEslintMessage(m);
    } catch (err) {
      if (err instanceof Error) {
        err.message = `Invalid property supressedMessages[${i}]\n${err.message}`;
      }
      throw err;
    }
  });
  o.usedDeprecatedRules.forEach((r, i) => {
    try {
      assertValidDeprecatedRule(r);
    } catch (err) {
      if (err instanceof Error) {
        err.message = `Invalid property usedDeprecatedRules[${i}]\n${err.message}`;
      }
      throw err;
    }
  });
}

export class DeserializedError extends Error {
  /**
   * @param {unknown} obj
   * @param {{
   *   prefix?: string;
   *   suffix?: string;
   * }} [opts]
   */
  constructor(obj, { prefix, suffix } = {}) {
    /** @param {string} msg */
    function mkMsg(msg) {
      return `${prefix ?? ''}${msg}${suffix ?? ''}`;
    }
    if (typeof obj === 'string') {
      super(mkMsg(obj || '[empty string]'));
      return;
    }
    if (obj == null || typeof obj !== 'object') {
      super(
        mkMsg(
          `Invalid error data. Expected string or object, got ${typeName(obj)}`,
        ),
      );
      return;
    }
    let message;
    if ('message' in obj && typeof obj.message !== 'undefined') {
      if (typeof obj.message === 'string' || obj.message === null) {
        message = mkMsg((obj.message ?? 'null') || '[empty string]');
      } else {
        super(
          mkMsg(
            `Invalid message in error data. Expected string or null, got ${typeName(
              obj.message,
            )}`,
          ),
        );
        return;
      }
    } else {
      message = mkMsg(`[no message]`);
    }
    if ('cause' in obj && obj.cause != null) {
      super(message, { cause: obj.cause });
    } else {
      super(message);
    }
    const name =
      'name' in obj && typeof obj.name === 'string' && obj.name !== ''
        ? obj.name
        : this.name;
    if (name !== this.name) {
      this.name = name;
    }
    const orgStackDesc = Object.getOwnPropertyDescriptor(this, 'stack');
    if (orgStackDesc) {
      if ('stack' in obj && typeof obj.stack === 'string' && obj.stack !== '') {
        const traceMatch = obj.stack.match(/((?:(?:\n|$) {4}at .+)+)[\n\s]*$/);
        if (traceMatch) {
          const trace = traceMatch[1];
          if (
            orgStackDesc.configurable &&
            typeof orgStackDesc.get === 'function' &&
            typeof orgStackDesc.set === 'function'
          ) {
            Object.getOwnPropertyDescriptor(this, 'stack')?.configurable;
            Object.defineProperty(this, 'stack', {
              get() {
                const stack = `${this.name}${
                  this.name && this.message ? ': ' : ''
                }${this.message}${trace}`;
                Object.defineProperty(this, 'stack', orgStackDesc);
                Reflect.set(this, 'stack', stack);
                return stack;
              },
              set(value) {
                Object.defineProperty(this, 'stack', orgStackDesc);
                Reflect.set(this, 'stack', value);
              },
            });
          }
        }
      }
    }
    Object.entries(obj).forEach(([key, val]) => {
      if (
        key === 'cause' ||
        key === 'stack' ||
        Object.keys(Object.prototype).includes(key) ||
        Object.keys(Error.prototype).includes(key)
      ) {
        return;
      }
      if (typeof val === 'function') {
        return;
      }
      this[key] = val;
    });
  }
}
DeserializedError.prototype.name = DeserializedError.name;

/**
 * @type {{
 *   lintText(source: string, path: string): Promise<import('eslint').ESLint.LintResult>;
 *   awaitingResponse: [id: number, resolve: (result: import('eslint').ESLint.LintResult | PromiseLike<import('eslint').ESLint.LintResult>) => void, reject: (err: unknown) => void][];
 *   cp: child_process.ChildProcessByStdio | null;
 *   abort(err: unknown): void;
 *   spawned: [id: number, source: string, path: string][] | null;
 * } | null}
 */
let linter = null;

/**
 * @param {string} source
 * @param {string} filepath
 */
export function eslintText(source, filepath) {
  if (!linter) {
    /** @type {child_process.ChildProcessByStdio} */
    const cp = child_process.fork(
      path.join(__dirname, 'eslint.js'),
      [filepath],
      {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
        cwd: process.cwd(),
      },
    );
    let idCounter = 0;
    /** @type {typeof linter} */
    const _linter = (linter = {
      lintText(source, filePath) {
        const id = idCounter++;
        return new Promise((_resolve, _reject) => {
          let fulfilled = false;
          /** @type {typeof _resolve} */
          const resolve = (val) => {
            try {
              if (!fulfilled) _resolve(val);
            } finally {
              fulfilled = true;
              const index = this.awaitingResponse.findIndex(
                ([, r]) => r === resolve,
              );
              if (index >= 0) this.awaitingResponse.splice(index, 1);
            }
          };
          /** @type {typeof _reject} */
          const reject = (err) => {
            try {
              if (!fulfilled) _reject(err);
            } finally {
              fulfilled = true;
              const index = this.awaitingResponse.findIndex(
                ([, , r]) => r === reject,
              );
              if (index >= 0) this.awaitingResponse.splice(index, 1);
            }
          };
          this.awaitingResponse.push([id, resolve, reject]);
          if (this.spawned) {
            this.spawned.push([id, source, filePath]);
          } else if (this.cp) {
            this.cp.send(
              {
                type: 'lint',
                id,
                source,
                filePath,
              },
              (err) => {
                if (err) reject(err);
              },
            );
          } else {
            reject(new Error('Linter is not initialized'));
          }
        });
      },
      awaitingResponse: [],
      cp,
      spawned: [],
      /** @param {Error} err */
      abort(err) {
        console.error(err.message);
        this.awaitingResponse.forEach(([, , reject]) => {
          try {
            reject(err);
          } catch (err) {
            console.error(err);
          }
        });
        this.awaitingResponse.length = 0;
        this.spawned = null;
        this.cp = null;
        linter = null;
        try {
          cp.kill('SIGKILL');
        } catch {
          // pass
        }
      },
    });
    cp.on('message', (message) => {
      if (typeof message !== 'object' || message === null) {
        _linter.abort(new Error(util.format('Invalid message: %O', message)));
        return;
      }
      if (!('type' in message) || typeof message.type !== 'string') {
        if ('type' in message && typeof message.type !== 'undefined') {
          _linter.abort(
            new Error(
              `Received invalid message, invalid parameter 'type', expected string, got ${typeName(
                message.type,
              )}`,
            ),
          );
        } else {
          _linter.abort(
            new Error(`Received invalid message, missing parameter 'type'`),
          );
        }
        return;
      }
      if ('type' in message && message.type === 'lint-response') {
        if (!('id' in message) || typeof message.id !== 'number') {
          _linter.abort(
            new Error(`Invalid ${message.type}, missing property id`),
          );
          return;
        }
        if (!('status' in message) || typeof message.status !== 'string') {
          _linter.abort(
            new Error(`Invalid ${message.type}, missing property status`),
          );
          return;
        }
        if (!('data' in message) || typeof message.data === 'undefined') {
          _linter.abort(
            new Error(`Invalid ${message.type}, missing property data`),
          );
          return;
        }
        const { id, status, data } = message;
        const req = _linter.awaitingResponse.find(([resId]) => resId === id);
        if (!req) {
          console.warn(
            `Received response for unknown request id ${id} from eslint child process`,
          );
          return;
        }
        const [, resolve, reject] = req;
        if (status === 'success') {
          try {
            if (!Array.isArray(data)) {
              throw new Error(
                `Invalid eslint result, expected [ESLint.LintResult], got ${typeName(
                  data,
                )}`,
              );
            }
            if (data.length !== 1) {
              throw new Error(
                `Invalid eslint result, expected [ESLint.LintResult], got ${data.length} elements`,
              );
            }
            assertValidEslintResult(data[0]);
            resolve(data[0]);
          } catch (err) {
            if (err instanceof Error) {
              err.message = `Invalid eslint result\n${err.message}`;
            }
            reject(err);
          }
          return;
        } else if (status === 'error') {
          /** @type {Error} */
          reject(new DeserializedError(data));
          return;
        } else {
          reject(
            new Error(
              `Received unknown response status ${status} from eslint child process`,
            ),
          );
        }
        return;
      } else if (message.type === 'error') {
        if (!('error' in message) || typeof message.error === 'undefined') {
          _linter.abort(
            new Error(`Invalid ${message.type}, missing property error`),
          );
          return;
        }
        _linter.abort(
          new DeserializedError(message.error, {
            prefix: 'Received error from eslint child process:\n',
          }),
        );
        return;
      }
      _linter.abort(
        new Error(
          `Received unknown message type ${message.type} from eslint child process`,
        ),
      );
    });
    cp.on('spawn', () => {
      if (_linter.spawned) {
        const spawned = _linter.spawned;
        _linter.spawned = null;
        Promise.allSettled(
          spawned.map(([id, source, filePath]) => {
            return /** @type {Promise<void>} */ (
              new Promise((resolve, reject) => {
                cp.send(
                  {
                    type: 'lint',
                    id,
                    source,
                    filePath,
                  },
                  (err) => {
                    if (err) {
                      const req = _linter.awaitingResponse.find(
                        ([resId]) => resId === id,
                      );
                      if (req) req[2](err);
                      reject(err);
                    } else {
                      resolve();
                    }
                  },
                );
              })
            );
          }),
        ).then((results) => {
          const rejection = results.find(({ status }) => status === 'rejected');
          if (rejection) {
            _linter.abort(rejection);
          }
        });
      }
    });
    cp.on('error', (err) => {
      _linter.abort(err);
    });
    cp.on('close', (code, signal) => {
      _linter.abort(
        new Error(
          `Closed unexpectedly${
            code ? ` with code ${code}` : signal ? ` with signal ${signal}` : ''
          }`,
        ),
      );
    });
    cp.on('disconnect', () => {
      if (linter === _linter) {
        _linter.abort(new Error('Disconnected unexpectedly'));
      }
    });
    cp.on('exit', (code, signal) => {
      if (linter === _linter) {
        _linter.abort(
          new Error(
            `Closed unexpectedly${
              code
                ? ` with code ${code}`
                : signal
                  ? ` with signal ${signal}`
                  : ''
            }`,
          ),
        );
      }
    });
  }
  if (linter) {
    return linter.lintText(source, filepath);
  }
  return Promise.reject(new Error('Linter is not initialized'));
}

export function stopEslint() {
  if (linter) {
    linter.abort(new Error('Linter was stopped'));
  }
}
