import type * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { singleResponse } from '../Utils.js';
import { cmd } from '../_internal/cmdFactory.js';

export const guiStartScreenStream = cmd.v0_1.andUp(async function () {
  singleResponse(
    await this.rawCommand('guiStartScreenStreamRequest', {}),
    'empty',
  );
});

export const guiStopScreenStream = cmd.v0_1.andUp(async function () {
  singleResponse(
    await this.rawCommand('guiStopScreenStreamRequest', {}),
    'empty',
  );
});
