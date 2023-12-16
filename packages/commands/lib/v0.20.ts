import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_19 } from './v0.19.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_20<
  V extends Version.AndUp<'0.20'>,
> extends CommandsV0_19<V> {}

export default CommandsV0_20;
