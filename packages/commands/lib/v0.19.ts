import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_18 } from './v0.18.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_19<
  V extends Version.AndUp<'0.19'>,
> extends CommandsV0_18<V> {}

export default CommandsV0_19;
