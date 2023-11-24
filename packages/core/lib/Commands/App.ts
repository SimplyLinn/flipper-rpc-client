import type * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { singleResponse } from '../Utils.js';
import { cmd } from '../_internal/cmdFactory.js';

export const appStartRequest = cmd.v0_1.andUp(async function (
  name: string,
  args?: string,
) {
  singleResponse(
    await this.rawCommand('appStartRequest', {
      name,
      args,
    }),
    'empty',
  );
});

export const appLockStatus = cmd.v0_1.andUp(async function () {
  const { locked } = singleResponse(
    await this.rawCommand('appLockStatusRequest', {}),
    'appLockStatusResponse',
  );
  if (locked == null) {
    throw new Error('Unexpected response content');
  }
  return locked;
});
