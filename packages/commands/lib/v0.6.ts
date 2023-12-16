import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_5 } from './v0.5.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_6<
  V extends Version.AndUp<'0.6'>,
> extends CommandsV0_5<V> {}

export default CommandsV0_6;
