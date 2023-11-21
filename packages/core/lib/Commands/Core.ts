import { SUPPORTED_VERSIONS } from '../_internal/constants.js';
import { mkFns } from '../_internal/utils.js';

const CoreApi = mkFns([
  {
    [SUPPORTED_VERSIONS]: ['0.5', '...'],
    async stopSession(): Promise<unknown> {
      const reses = await this.rawCommand('stopSession', {});
      console.log(reses);
      return reses;
    },
  },
]);

export { CoreApi };
