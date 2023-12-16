import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_10 } from './v0.10.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_11<
  V extends Version.AndUp<'0.11'>,
> extends CommandsV0_10<V> {}

export default CommandsV0_11;
