import { RpcUsbSerialPort, RpcApiNode } from '@flipper-rpc-client/node';
import { SerialPort } from 'serialport';

const portDetails = (await SerialPort.list())[0];

const port = new RpcUsbSerialPort(
  new SerialPort({
    ...portDetails,
    baudRate: 115200,
    autoOpen: false,
  }),
);

const api = await RpcApiNode.create(port);

await api.connect();

// await api.disconnect();

console.log('done, should now (not) cleanly exit...');
