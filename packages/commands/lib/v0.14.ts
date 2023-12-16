import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_13 } from './v0.13.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_14<
  V extends Version.AndUp<'0.14'>,
> extends CommandsV0_13<V> {}

export default CommandsV0_14;
