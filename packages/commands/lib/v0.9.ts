import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_8 } from './v0.8.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_9<
  V extends Version.AndUp<'0.9'>,
> extends CommandsV0_8<V> {}

export default CommandsV0_9;
