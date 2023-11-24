import { RpcApiWeb, RpcApiWebEvent, RpcUsbSerialPort } from '@flipper-rpc-client/web';
import { FIRST_VERSION, LATEST_VERSION } from '@flipper-rpc-client/core';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function SerialProvider() {
  const [curApi, setCurApi] = useState<null | RpcApiWeb<
    [FIRST_VERSION, '...', LATEST_VERSION]
  >>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [serialPort, setSerialPort] = useState<SerialPort | null>(null);
  useEffect(() => {
    if (!serialPort) return;
    let mounted = true;
    let mountedApi: RpcApiWeb<[FIRST_VERSION, '...', LATEST_VERSION]> | null =
      null;
    console.log('CONNECTING', (window as any).__disconnectPromise);
    Promise.resolve((window as any).__disconnectPromise)
      .then(() => RpcApiWeb.create(new RpcUsbSerialPort(serialPort)))
      .then((api) => {
        if (!mounted) {
          throw new Error('unmounted');
        }
        return api.connect();
      })
      .then((api) => {
        if (!mounted) {
          (window as any).__disconnectPromise = api.disconnect().finally(() => {
            delete (window as any).__disconnectPromise;
          });
          return (window as any).__disconnectPromise.then(() => {
            throw new Error('unmounted');
          });
        }
        mountedApi = api;
        console.log('CONNECTED');
        setCurApi(api);
      })
      .catch(console.error);
    return () => {
      mounted = false;
      if (mountedApi) {
        (window as any).__disconnectPromise = mountedApi
          .disconnect()
          .finally(() => {
            delete (window as any).__disconnectPromise;
          });
      }
      setCurApi(null);
    };
  }, [serialPort]);

  const connect = useCallback(() => {
    navigator.serial.requestPort().then((port) => {
      setSerialPort(port);
    });
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) {
      console.error('no ctx');
      return;
    }
    if (!curApi) {
      return;
    }
    let mounted = true;
    function onScreenFrame({ frame }: RpcApiWebEvent.ScreenFrameEvent) {
      const imageData = new ImageData(128, 64, { colorSpace: 'srgb' });
      for (let x = 0; x < frame.height; x++) {
        const column = frame.getRow(x);
        for (let j = 0; j < column.length; j++) {
          for (let k = 0; k < 8; k++) {
            const y = (j * 8) + k;
            const index = (y * 128 + x) * 4;
            const byte = column[column.length - j - 1];
            imageData.data[index + 3] = 255 * ((byte & (0x01 << k)) >>> k);
          }
        }
      }
      ctx!.putImageData(imageData, 0, 0);
    }
    curApi.addEventListener('screenFrame', onScreenFrame);
    let streaming = false;
    curApi.cmds
      .guiStartScreenStream()
      .then(() => {
        if (!mounted) {
          curApi.cmds.guiStopScreenStream();
        } else {
          streaming = true;
        }
      })
      .catch(console.error);
    return () => {
      mounted = false;
      curApi.removeEventListener('screenFrame', onScreenFrame);
      if (streaming) {
        curApi.cmds.guiStopScreenStream().catch(console.error);
      }
    };
  }, [curApi]);
  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={connect}>Connect</button>
      <h1 className="text-4xl font-bold">SerialProvider</h1>
      <canvas
        width={128}
        height={64}
        ref={canvasRef}
        style={{ backgroundColor: 'white' }}
      />
    </div>
  );
}
