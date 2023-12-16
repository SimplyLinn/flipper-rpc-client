import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_17 } from './v0.17.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_18<
  V extends Version.AndUp<'0.18'>,
> extends CommandsV0_17<V> {}

export default CommandsV0_18;
