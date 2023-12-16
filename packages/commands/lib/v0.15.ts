import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_14 } from './v0.14.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_15<
  V extends Version.AndUp<'0.15'>,
> extends CommandsV0_14<V> {}

export default CommandsV0_15;
