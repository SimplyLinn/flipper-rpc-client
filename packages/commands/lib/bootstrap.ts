import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { BOOTSTRAP_VERSION } from '@flipper-rpc-client/versioned-protobuf';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';
import { Commands } from './base.js';

export class CommandsBootstrap<
  V extends Version.AndUp<'0.1'> | BOOTSTRAP_VERSION,
> extends Commands<V> {
  // ========================[ CORE ]========================

  async stopSession() {
    const reses = await this.api.rawCommand('stopSession', {});
    console.log(reses);
    return reses;
  }

  // =======================[ SYSTEM ]=======================

  async systemPing(data?: Uint8Array | null) {
    const res = await this.singleResponse(
      'systemPingRequest',
      {
        data: data,
      },
      'systemPingResponse',
    );
    if (res.data == null) {
      return null;
    }
    return res.data.length > 0 ? res.data : null;
  }

  async systemDeviceInfo() {
    const reses = await this.api.rawCommand('systemDeviceInfoRequest', {});
    const deviceInfo: Record<string, string | undefined> = Object.create(null);
    for (const res of reses) {
      if (
        res.content !== 'systemDeviceInfoResponse' ||
        res.systemDeviceInfoResponse == null
      ) {
        throw new Error('Unexpected response content');
      }
      const { key, value } = res.systemDeviceInfoResponse;
      if (key == null) {
        throw new Error('Unexpected response content');
      }
      if (value != null) deviceInfo[key] = value;
    }
    return deviceInfo;
  }
}

export default CommandsBootstrap;
