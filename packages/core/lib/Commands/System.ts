import { SUPPORTED_VERSIONS } from '../_internal/constants.js';
import { mkFns } from '../_internal/utils.js';

let textEncoder: TextEncoder | undefined;

function toByteArray(data: Uint8Array | string): Uint8Array {
  if (data instanceof Uint8Array) return data;
  if (textEncoder == null) {
    textEncoder = new TextEncoder();
  }
  return textEncoder.encode(data);
}

const SystemApi = mkFns([
  {
    [SUPPORTED_VERSIONS]: ['0.1', '...', '0.18'],
    async systemPing(data?: Uint8Array | string | null) {
      this.cmds;
      let reses;
      const isString = typeof data === 'string';
      if (data == null) {
        reses = await this.rawCommand('systemPingRequest', {});
      } else {
        reses = await this.rawCommand('systemPingRequest', {
          data: toByteArray(data),
        });
      }
      console.log(reses);
    },
  },
]);

export { SystemApi };
