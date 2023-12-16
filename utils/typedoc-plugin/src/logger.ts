/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Logger } from 'typedoc';
import { formatWithOptions, InspectOptions } from 'node:util';

let logger: Logger | undefined;

const formatOptions: InspectOptions = {
  colors: true,
};

const format = formatWithOptions.bind(null, formatOptions);

export function verbose(...args: any[]) {
  return l.logger.verbose(format(formatOptions, ...args));
}
export function info(...args: any[]) {
  return l.logger.info(format(...args));
}
export function warn(...args: any[]) {
  return l.logger.warn(format(...args));
}
export function error(...args: any[]) {
  return l.logger.error(format(...args));
}

const l = {
  set logger(newLogger: Logger) {
    logger = newLogger;
  },
  get logger() {
    if (!logger) {
      throw new Error('Logger not set');
    }
    return logger;
  },
  verbose,
  info,
  warn,
  error,
};

export default l;
