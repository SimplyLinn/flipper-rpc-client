import type * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_2 } from './v0.2.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_3<
  V extends Version.AndUp<'0.3'>,
> extends CommandsV0_2<V> {}

export default CommandsV0_3;
