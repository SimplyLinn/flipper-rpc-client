import type { PROTOBUF_VERSION_MAP } from '../../index.js';
import type Resolve from '../index.js';

import type Main from './Main.js';

declare namespace CommandStatus {
  export type Enum<V extends keyof PROTOBUF_VERSION_MAP> =
    PB<V>['CommandStatus'];
}
type CommandStatus<V extends keyof PROTOBUF_VERSION_MAP> =
  PB<V>['CommandStatus'][keyof PB<V>['CommandStatus']] & number;

export { Main, CommandStatus };

export declare namespace PB {
  export { Main, CommandStatus };
}

export type PB<V extends keyof PROTOBUF_VERSION_MAP> = Resolve<V>['PB'];
export default PB;
