import type * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { cmd } from '../_internal/cmdFactory.js';

export const stopSession = cmd.v0_1.andUp(async function () {
  const reses = await this.rawCommand('stopSession', {});
  console.log(reses);
  return reses;
});
