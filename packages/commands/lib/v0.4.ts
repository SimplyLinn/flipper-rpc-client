import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { CommandsV0_3 } from './v0.3.js';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';

export class CommandsV0_4<
  V extends Version.AndUp<'0.4'>,
> extends CommandsV0_3<V> {
  // =======================[ SYSTEM ]=======================

  async storageBackupCreate(archivePath: string) {
    await this.singleResponse(
      'storageBackupCreateRequest',
      {
        archivePath,
      },
      'empty',
    );
  }
}

export default CommandsV0_4;
