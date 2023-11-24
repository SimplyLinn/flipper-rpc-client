import {
  PROTOBUF_VERSIONS,
  type PROTOBUF_VERSION,
  type PROTOBUF_VERSION_MAP,
} from '@flipper-rpc-client/versioned-protobuf';
import type { Version } from './Types.js';

export function singleResponse<
  Main extends InstanceType<
    PROTOBUF_VERSION_MAP[PROTOBUF_VERSION]['PB']['Main']
  >,
>(reses: readonly Main[]): Main;
export function singleResponse<
  const Main extends InstanceType<
    PROTOBUF_VERSION_MAP[PROTOBUF_VERSION]['PB']['Main']
  >,
  const Type extends Main['content'] & keyof Main,
>(reses: readonly Main[], type: Type): Exclude<Main[Type], null | undefined>;
export function singleResponse<
  Main extends InstanceType<
    PROTOBUF_VERSION_MAP[PROTOBUF_VERSION]['PB']['Main']
  >,
>(
  reses: readonly Main[],
  type?: Main['content'] & keyof Main,
): Main | NonNullable<Main[NonNullable<typeof type>]> {
  if (reses.length !== 1) {
    throw new Error('Unexpected response length');
  }
  const res = reses[0];
  if (type != null && (res.content !== type || res[type] == null)) {
    throw new Error('Unexpected response content');
  }
  if (type != null) {
    return res[type]!;
  }
  return res;
}

export function versionAndUp<V extends PROTOBUF_VERSION>(
  version: V,
): readonly Version.AndUp<V>[] {
  const index = PROTOBUF_VERSIONS.indexOf(version);
  if (index < 0) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return PROTOBUF_VERSIONS.slice(index) as any;
}

export function versionAndDown<V extends PROTOBUF_VERSION>(
  version: V,
): readonly Version.AndDown<V>[] {
  const index = PROTOBUF_VERSIONS.indexOf(version);
  if (index < 0) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return PROTOBUF_VERSIONS.slice(0, index + 1) as any;
}

export function versionBetween<
  V1 extends PROTOBUF_VERSION,
  V2 extends PROTOBUF_VERSION,
>(v1: V1, v2: V2): readonly Version.Between<V1, V2>[] {
  const index1 = PROTOBUF_VERSIONS.indexOf(v1);
  const index2 = PROTOBUF_VERSIONS.indexOf(v2);
  if (index1 < 0 || index2 < 0) return [];
  if (index1 > index2) return [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return PROTOBUF_VERSIONS.slice(index1, index2 + 1) as any;
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

export const readProtobufUint32 = (() => {
  // 2**32 - 1: Type hint to JS optimizer
  let val = 4294967295;
  /**
   * @param {Uint8Array} data
   */
  return function readProtobufUint32(data: Uint8Array, offset = 0) {
    let pos = offset;
    val = (data[pos] & 0x7f) >>> 0;
    if (data[pos++] < 128) return [val, pos - offset];
    val = (val | ((data[pos] & 0x7f) << 7)) >>> 0;
    if (data[pos++] < 128) return [val, pos - offset];
    val = (val | ((data[pos] & 0x7f) << 14)) >>> 0;
    if (data[pos++] < 128) return [val, pos - offset];
    val = (val | ((data[pos] & 0x7f) << 21)) >>> 0;
    if (data[pos++] < 128) return [val, pos - offset];
    val = (val | ((data[pos] & 0x0f) << 28)) >>> 0;
    if (data[pos++] < 128) return [val, pos - offset];
    while (pos < data.length) if (data[pos++] < 128) return [val, pos - offset];
    throw Error('invalid varint encoding');
  };
})();
