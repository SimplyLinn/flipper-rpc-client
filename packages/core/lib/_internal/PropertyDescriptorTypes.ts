/* eslint-disable @typescript-eslint/no-explicit-any */
type DefinitelyWritableProperty<
  T extends PropertyDescriptor,
  True,
  False = never,
> = 'set' extends keyof T
  ? Extract<T['set'], undefined> extends never
    ? 'writable' extends keyof T
      ? Extract<T['writable'], false> extends never
        ? True
        : False
      : True
    : Exclude<T['set'], undefined> extends never
      ? 'writable' extends keyof T
        ? Extract<T['writable'], false | undefined> extends never
          ? True
          : False
        : False
      : False
  : 'writable' extends keyof T
    ? Extract<T['writable'], false | undefined> extends never
      ? True
      : False
    : False;
type ResolveReadonlyType<T extends PropertyDescriptor> =
  | (T['get'] extends () => infer T ? T : never)
  | ('value' extends keyof T ? T['value'] : never)
  | ('value' extends keyof T
      ? never
      : 'get' extends keyof T
        ? Extract<T['get'], undefined>
        : undefined);
type ResolveWritableType<T extends PropertyDescriptor> = T['set'] extends (
  val: infer SetterVal,
) => unknown
  ? ResolveReadonlyType<T> extends SetterVal
    ? ResolveReadonlyType<T>
    : never
  : ResolveReadonlyType<T>;
type MergeObjects<U> = (U extends any ? (x: U) => void : never) extends (
  x: infer I,
) => void
  ? { [k in keyof I]: I[k] }
  : never;
type Explode<T> = (T extends any ? [T] : never)[number];

export type TypedPropertyDescriptorMap<
  T extends Record<string | symbol | number, unknown>,
> = {
  [key in keyof T]: TypedPropertyDescriptor<T[key]>;
};

export type ResolvePropertyMap<T extends PropertyDescriptorMap> = MergeObjects<
  {
    readonly [key in keyof T]: DefinitelyWritableProperty<
      T[key],
      { [key2 in key]: Explode<ResolveWritableType<T[key2]>> },
      { readonly [key2 in key]: Explode<ResolveReadonlyType<T[key]>> }
    >;
  }[keyof T]
>;
