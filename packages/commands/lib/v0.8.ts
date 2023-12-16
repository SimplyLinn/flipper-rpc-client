import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_7 } from './v0.7.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_8<
  V extends Version.AndUp<'0.8'>,
> extends CommandsV0_7<V> {}

export default CommandsV0_8;
