import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_1 } from './v0.1.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';
export class CommandsV0_2<
  V extends Version.AndUp<'0.2'>,
> extends CommandsV0_1<V> {
  // =======================[ SYSTEM ]=======================

  async systemProtobufVersion() {
    const res = await this.singleResponse(
      'systemProtobufVersionRequest',
      {},
      'systemProtobufVersionResponse',
    );
    return {
      major: res.major ?? 0,
      minor: res.minor ?? 0,
    };
  }
}

export default CommandsV0_2;
