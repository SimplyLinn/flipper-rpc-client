import { ESLint } from 'eslint';

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
    if (typeof thrown.message === 'string') {
      const err = {
        name: 'Error',
        message: thrown.message,
      };
      if (typeof thrown.stack === 'string') {
        err.stack = thrown.stack;
      }
      if (typeof thrown.code === 'string' || typeof thrown.code === 'number') {
        err.code = thrown.code;
      }
      if (typeof thrown.name === 'string') {
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
    if (message.type === 'lint') {
      const { source, filePath, id } = message;
      eslint.lintText(source, { filePath }).then(
        (results) => {
          process.send({
            type: 'lint-response',
            status: 'success',
            id,
            data: results,
          });
        },
        (thrown) => {
          const error = ensureError(thrown);
          process.send({
            type: 'lint-response',
            status: 'error',
            id,
            data: error,
          });
        },
      );
    } else {
      process.send(
        {
          type: 'error',
          error: {
            name: 'Error',
            message: `Unknown message type: ${message.type}`,
          },
        },
        () => {
          process.exit(1);
        },
      );
    }
  } catch (thrown) {
    const error = ensureError(thrown);
    process.send(
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
