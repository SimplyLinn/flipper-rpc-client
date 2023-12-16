import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_16 } from './v0.16.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_17<
  V extends Version.AndUp<'0.17'>,
> extends CommandsV0_16<V> {}

export default CommandsV0_17;
