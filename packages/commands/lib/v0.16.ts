import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_15 } from './v0.15.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_16<
  V extends Version.AndUp<'0.16'>,
> extends CommandsV0_15<V> {}

export default CommandsV0_16;
