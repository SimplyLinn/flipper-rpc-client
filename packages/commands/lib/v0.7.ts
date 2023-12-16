import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_6 } from './v0.6.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_7<
  V extends Version.AndUp<'0.7'>,
> extends CommandsV0_6<V> {}

export default CommandsV0_7;
