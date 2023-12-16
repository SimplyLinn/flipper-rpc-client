import { RpcApi } from '@';
import { systemPingMock } from '@mocks/RpcSerialPort.js';
import { expectResolvesReturnSelf } from '../utils.js';

describe('RpcApi.cmds.systemPing', () => {
  it('Should return null with no data', async () => {
    const VERSION = '0.1';
    const port = await systemPingMock(VERSION);
    const api = await expectResolvesReturnSelf(
      RpcApi.create(port, {
        version: VERSION,
        force: true,
      }).then((a) => a.connect()),
    ).toBeInstanceOf(RpcApi);
    await expect((() => api.cmds.systemPing())()).resolves.toBeNull();
  });

  it('Should echo ping data', async () => {
    const VERSION = '0.1';
    const port = await systemPingMock(VERSION);
    const api = await expectResolvesReturnSelf(
      RpcApi.create(port, {
        version: '0.1',
        force: true,
      }).then((a) => a.connect()),
    ).toBeInstanceOf(RpcApi);
    const data = new Uint8Array([1, 2, 3]);
    await expect((() => api.cmds.systemPing(data))()).resolves.toEqual(data);
  });
});
