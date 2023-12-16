import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_12 } from './v0.12.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_13<
  V extends Version.AndUp<'0.13'>,
> extends CommandsV0_12<V> {}

export default CommandsV0_13;
