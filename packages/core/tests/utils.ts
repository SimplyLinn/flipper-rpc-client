export function expectResolvesReturnSelf<T>(value: PromiseLike<T>) {
  return new Proxy(expect(value).resolves, {
    get(target, prop, receiver) {
      const val = Reflect.get(target, prop, receiver);
      if (typeof val === 'function') {
        return function (this: any, ...args: unknown[]) {
          return Promise.resolve(Reflect.apply(val, this, args)).then((ret) =>
            ret === undefined ? value : ret,
          );
        };
      }
      return val;
    },
  }) as jest.AndNot<jest.Matchers<Promise<T>, Promise<T>>>;
}
