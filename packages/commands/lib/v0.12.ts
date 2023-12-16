import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_11 } from './v0.11.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_12<
  V extends Version.AndUp<'0.12'>,
> extends CommandsV0_11<V> {}

export default CommandsV0_12;
