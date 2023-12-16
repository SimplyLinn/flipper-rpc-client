import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_9 } from './v0.9.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_10<
  V extends Version.AndUp<'0.10'>,
> extends CommandsV0_9<V> {}

export default CommandsV0_10;
