import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_20 } from './v0.20.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_21<
  V extends Version.AndUp<'0.21'>,
> extends CommandsV0_20<V> {}

export default CommandsV0_21;
