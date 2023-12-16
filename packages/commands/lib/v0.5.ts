import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_4 } from './v0.4.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_5<
  V extends Version.AndUp<'0.5'>,
> extends CommandsV0_4<V> {}

export default CommandsV0_5;
