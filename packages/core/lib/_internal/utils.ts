import type { RpcApi } from '../RpcApi.js';
import type { ParseVersionRange, VersionRange } from '../Types.js';
import type { FunctionDeclaration } from './types.js';
import type { SUPPORTED_VERSIONS } from './constants.js';

export function mkFns<
  const T extends {
    [key in keyof V]: FunctionDeclaration<V[key]>;
  },
  const V extends readonly [VersionRange, ...VersionRange[]],
>(
  o: T & {
    [key in keyof V]: { readonly [SUPPORTED_VERSIONS]: V[key] } & ThisType<
      RpcApi<ParseVersionRange<V[key]>>
    >;
  },
): T {
  return o;
}

export function ContextualizeError<T>(context: string, error: T): T {
  if (!(error instanceof Error)) return error;
  if (!('stack' in error)) return error;
  const propDesc = Object.getOwnPropertyDescriptor(error, 'stack');
  if (propDesc && !propDesc.configurable) return error;
  if (!/\n$|\s$/.test(context)) {
    context += '\n';
  }
  if (!propDesc) {
    const proto = Object.getPrototypeOf(error);
    Object.defineProperty(error, 'stack', {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get: new Proxy(function (this: any) {
        const val = Reflect.get(proto, 'stack', this);
        if (typeof val === 'string') {
          return `${context}${val}`;
        }
        return val;
      }, {}),
      set(val) {
        Object.defineProperty(error, 'stack', {
          value: val,
          writable: true,
        });
      },
      enumerable: false,
      configurable: true,
    });
  } else if (Object.hasOwn(propDesc, 'value')) {
    Object.defineProperty(error, 'stack', {
      value:
        typeof propDesc.value === 'string'
          ? `${context}${propDesc.value}`
          : propDesc.value,
    });
  } else if (typeof propDesc.get === 'function') {
    const getter = propDesc.get;
    const setter = propDesc.set;
    Object.defineProperty(error, 'stack', {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      get: new Proxy(function (this: any) {
        const val = Reflect.apply(getter, this, []);
        if (typeof val === 'string') {
          return `${context}${val}`;
        }
        return val;
      }, {}),
      ...(typeof setter === 'function'
        ? {
            set() {
              Object.defineProperty(error, 'stack', {
                get: getter,
                set: setter,
              });
            },
          }
        : null),
    });
  }
  return error;
}

export function ensureError(thrown: unknown) {
  if (thrown instanceof Error) return thrown;
  if (
    typeof thrown === 'object' &&
    thrown != null &&
    'message' in thrown &&
    thrown.message === 'string'
  ) {
    const err = new Error(thrown.message);
    if ('stack' in thrown && typeof thrown.stack === 'string') {
      Object.defineProperty(err, 'stack', {
        value: thrown.stack,
        writable: true,
        enumerable: false,
        configurable: true,
      });
    }
    if ('name' in thrown && typeof thrown.name === 'string') {
      Object.defineProperty(err, 'name', {
        value: thrown.name,
        writable: true,
        enumerable: false,
        configurable: true,
      });
    }
    return err;
  }
  return new Error(`Non-Error thrown: ${String(thrown)}`);
}

export function appendReaderChunk(reader: protobuf.Reader, chunk: Uint8Array) {
  const fullLen = reader.buf.length + chunk.length;
  if (fullLen > 8192 && reader.pos !== 0) {
    const fullChunk = new Uint8Array(
      reader.buf.length + chunk.length - reader.pos,
    );
    fullChunk.set(reader.buf.slice(reader.pos));
    fullChunk.set(chunk, reader.buf.length - reader.pos);
    reader.buf = fullChunk;
    reader.len = fullChunk.length;
    reader.pos = 0;
  } else {
    const fullChunk = new Uint8Array(fullLen);
    fullChunk.set(reader.buf);
    fullChunk.set(chunk, reader.buf.length);
    reader.buf = fullChunk;
    reader.len = fullChunk.length;
  }
}
