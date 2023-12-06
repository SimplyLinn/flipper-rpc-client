import { ESLint } from 'eslint';
import typeName from './typeName.js';

if (process.send === undefined) {
  throw new Error('This script must be run as a child process');
}

const send = process.send.bind(process);

const eslint = new ESLint({
  fix: true,
});

/**
 * @param {unknown} thrown
 * @returns {{
 *  name: string;
 *  message: string;
 *  code?: string | number;
 *  stack?: string;
 * }}
 */
function ensureError(thrown) {
  if (thrown instanceof Error) {
    return {
      name: thrown.name,
      message: thrown.message,
      ...('code' in thrown &&
      (typeof thrown.code === 'string' || typeof thrown.code === 'number')
        ? { code: thrown.code }
        : null),
      stack: thrown.stack,
    };
  }
  if (typeof thrown === 'string') {
    return {
      name: 'Error',
      message: thrown,
    };
  }
  if (typeof thrown === 'object' && thrown !== null) {
    if ('message' in thrown && typeof thrown.message === 'string') {
      const err = {
        name: 'Error',
        message: thrown.message,
      };
      if ('stack' in thrown && typeof thrown.stack === 'string') {
        err.stack = thrown.stack;
      }
      if (
        'code' in thrown &&
        (typeof thrown.code === 'string' || typeof thrown.code === 'number')
      ) {
        err.code = thrown.code;
      }
      if ('name' in thrown && typeof thrown.name === 'string') {
        err.name = thrown.name;
      }
      return err;
    }
  }
  return {
    name: 'Error',
    message: 'Unknown error',
  };
}

process.on('message', (message) => {
  try {
    if (typeof message !== 'object' || message === null) {
      throw new Error(
        `Invalid message, expected object, got ${typeName(message)}`,
      );
    }
    if (!('type' in message) || typeof message.type === 'undefined') {
      throw new Error(
        'Invalid message, missing property type, expected string',
      );
    }
    if (typeof message.type !== 'string') {
      throw new Error(
        `Invalid message, invalid issing property type, expected string, got ${typeName(
          message.type,
        )}`,
      );
    }
    if (message.type === 'lint') {
      const id =
        'id' in message && typeof message.id === 'number' ? message.id : null;
      if (!id) {
        throw new Error(`Invalid ${message.type}, missing id`);
      }
      if (!('source' in message) || typeof message.source === 'undefined') {
        send({
          type: 'lint-response',
          status: 'error',
          id,
          data: new Error(
            `Invalid ${message.type}, missing property source, expected string`,
          ),
        });
        return;
      }
      if (typeof message.source !== 'string') {
        send({
          type: 'lint-response',
          status: 'error',
          id,
          data: new Error(
            `Invalid ${message.type}, missing property source, got ${typeName(
              message.source,
            )}`,
          ),
        });
        return;
      }
      if (!('filePath' in message) || typeof message.filePath === 'undefined') {
        send({
          type: 'lint-response',
          status: 'error',
          id,
          data: new Error(
            `Invalid ${message.type}, missing property filePath, expected string`,
          ),
        });
        return;
      }
      if (typeof message.filePath !== 'string') {
        send({
          type: 'lint-response',
          status: 'error',
          id,
          data: new Error(
            `Invalid ${
              message.type
            }, missing property filePath, expected string, got ${typeName(
              message.filePath,
            )}`,
          ),
        });
        return;
      }
      const { source, filePath } = message;
      eslint.lintText(source, { filePath }).then(
        (results) => {
          send({
            type: 'lint-response',
            status: 'success',
            id,
            data: results,
          });
        },
        (thrown) => {
          const error = ensureError(thrown);
          send({
            type: 'lint-response',
            status: 'error',
            id,
            data: error,
          });
        },
      );
    } else {
      send(
        {
          type: 'error',
          error: {
            name: 'Error',
            message: `Unknown message type: ${
              message.type ?? '[empty string]'
            }`,
          },
        },
        () => {
          process.exit(1);
        },
      );
    }
  } catch (thrown) {
    const error = ensureError(thrown);
    send(
      {
        type: 'error',
        error,
      },
      () => {
        process.exit(1);
      },
    );
  }
});
