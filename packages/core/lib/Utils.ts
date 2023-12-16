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
