import type { PROTOBUF_VERSION_MAP } from '../../index.js';
import type PB from './index.js';

export type Ctor<V extends keyof PROTOBUF_VERSION_MAP> = PB<V>['Main'];
export type Parameters<V extends keyof PROTOBUF_VERSION_MAP> =
  ConstructorParameters<Ctor<V>>;
export type Options<V extends keyof PROTOBUF_VERSION_MAP> = NonNullable<
  Parameters<V>[0]
>;
export type DefaultParams<V extends keyof PROTOBUF_VERSION_MAP> =
  NonNullable<unknown> extends Options<V>
    ? [defaultMainProperties?: Options<V>]
    : [defaultMainProperties: Options<V>];
export type CMD<V extends keyof PROTOBUF_VERSION_MAP> = NonNullable<
  Main<V>['content']
> &
  keyof Options<V>;

export declare namespace Main {
  export { Ctor, Options, Parameters, DefaultParams, CMD };
}

export type Main<V extends keyof PROTOBUF_VERSION_MAP> = InstanceType<
  Main.Ctor<V>
>;
export default Main;
