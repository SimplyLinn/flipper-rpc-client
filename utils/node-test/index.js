import { RpcUsbSerialPort, RpcApiNode } from '@flipper-rpc-client/node';
import { SerialPort } from 'serialport';

const portDef = (await SerialPort.list())[0];
if (!portDef) {
  throw new Error('No serial port found');
}
const port = new SerialPort({
  ...portDef,
  baudRate: 115200,
  autoOpen: false,
});

const rpcPort = new RpcUsbSerialPort(port);
const rpcApi = await RpcApiNode.create(rpcPort, {
  version: '0.20',
});
console.log(rpcApi);
rpcApi.cmds.stopSession();
