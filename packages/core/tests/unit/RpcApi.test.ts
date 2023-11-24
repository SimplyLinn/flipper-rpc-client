import { RpcApi } from '@';
import {
  MockRpcSerialPort,
  systemDeviceInfoMock,
  systemFakeVersionDeviceInfoMock,
} from '@mocks/RpcSerialPort.js';
import { expectResolvesReturnSelf } from '../utils.js';

describe('RpcApi.connect()', () => {
  it('Should force connect with no negotiation', async () => {
    const port = new MockRpcSerialPort();
    const api = await expectResolvesReturnSelf(
      RpcApi.create(port, {
        version: '0.1',
        force: true,
      }),
    ).toBeInstanceOf(RpcApi);
    await expect(api.connect()).resolves.toBeInstanceOf(RpcApi);
  });
  it('Should correctly ID protocol version 0.1 (pre device protobuf reporting)', async () => {
    const port = await systemDeviceInfoMock('0.1');
    const api = await expectResolvesReturnSelf(
      RpcApi.create(port),
    ).toBeInstanceOf(RpcApi);
    expect(api.version).toBe('0.1');
  });
  it('Should accept device minor version > requested minor version (matching major version)', async () => {
    const port = await systemDeviceInfoMock('0.2');
    const api = await expectResolvesReturnSelf(
      RpcApi.create(port, {
        version: '0.1',
      }),
    ).toBeInstanceOf(RpcApi);
    await expect(api.connect()).resolves.toBeInstanceOf(RpcApi);
  });
  it('Should reject device minor version < requested minor version (matching major version)', async () => {
    const port = await systemDeviceInfoMock('0.2');
    await expect(
      RpcApi.create(port, {
        version: '0.3',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
  it('Should reject device minor version > requested minor version (major version mismatch)', async () => {
    const port = await systemFakeVersionDeviceInfoMock('0.2', '1.5');
    await expect(
      RpcApi.create(port, {
        version: '0.2',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
  it('Should reject device minor version = requested minor version (major version mismatch)', async () => {
    const port = await systemFakeVersionDeviceInfoMock('0.2', '1.5');
    await expect(
      RpcApi.create(port, {
        version: '0.5',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
  it('Should reject device minor version < requested minor version (major version mismatch)', async () => {
    const port = await systemFakeVersionDeviceInfoMock('0.2', '1.5');
    await expect(
      RpcApi.create(port, {
        version: '0.10',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
