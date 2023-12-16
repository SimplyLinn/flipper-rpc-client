import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import type { PROTOBUF_VERSION } from '@flipper-rpc-client/versioned-protobuf';
import type {
  System,
  Storage,
  PB,
} from '@flipper-rpc-client/versioned-protobuf/Resolve';
import type { Version } from '@flipper-rpc-client/versioned-protobuf/Types';
import CommandsBootstrap from './bootstrap.js';

export class CommandsV0_1<
  V extends Version.AndUp<'0.1'>,
> extends CommandsBootstrap<V> {
  // =======================[ SYSTEM ]=======================

  async systemFactoryReset() {
    await this.api.rawCommand('systemFactoryResetRequest', {});
  }

  async systemGetDateTime() {
    const res = await this.singleResponse(
      'systemGetDatetimeRequest',
      {},
      'systemGetDatetimeResponse',
    );
    const datetime = res.datetime as InstanceType<
      System<V>['GetDateTimeResponse']
    >['datetime'];
    if (datetime == null) {
      throw new Error('Unexpected response content');
    }
    let date: Date;
    if (!datetime.year || !datetime.month) {
      // Invalid date
      date = new Date(NaN);
    } else {
      date = new Date(
        datetime.year,
        datetime.month - 1,
        datetime.day ?? 1,
        datetime.hour ?? 0,
        datetime.minute ?? 0,
        datetime.second ?? 0,
      );
    }
    return {
      date,
      ...datetime,
    };
  }

  async systemSetDateTime(
    newDate?:
      | Date
      | NonNullable<PB.Main.Options<V>['systemSetDatetimeRequest']>['datetime']
      | null,
  ) {
    newDate ??= new Date();
    const datetime =
      newDate instanceof Date
        ? {
            year: newDate.getFullYear(),
            month: newDate.getMonth() + 1,
            day: newDate.getDate(),
            hour: newDate.getHours(),
            minute: newDate.getMinutes(),
            second: newDate.getSeconds(),
          }
        : newDate;
    await this.singleResponse(
      'systemSetDatetimeRequest',
      {
        datetime,
      },
      'empty',
    );
  }

  async systemPlayAudiovisualAlert() {
    await this.singleResponse('systemPlayAudiovisualAlertRequest', {}, 'empty');
  }

  async systemRebootRequest(
    rebootMode?: NonNullable<PB.Main.Options<V>['systemRebootRequest']>['mode'],
  ) {
    return this.api
      .rawCommand('systemRebootRequest', {
        mode: rebootMode,
      })
      .then(
        () => {
          throw new Error('Expected connection to close');
        },
        (err: unknown) => {
          if (
            typeof err === 'object' &&
            err != null &&
            'message' in err &&
            err.message === 'Connection closed'
          ) {
            return;
          }
          throw err;
        },
      );
  }

  // ========================[ GUI ]=========================

  async guiStartScreenStream() {
    await this.singleResponse('guiStartScreenStreamRequest', {}, 'empty');
  }

  async guiStopScreenStream() {
    await this.singleResponse('guiStopScreenStreamRequest', {}, 'empty');
  }

  // ========================[ APP ]=========================

  async appStart(name: string, args?: string) {
    await this.singleResponse(
      'appStartRequest',
      {
        name,
        args,
      },
      'empty',
    );
  }

  async appLockStatus() {
    const { locked } = await this.singleResponse(
      'appLockStatusRequest',
      {},
      'appLockStatusResponse',
    );
    if (locked == null) {
      throw new Error('Unexpected response content');
    }
    return locked;
  }

  // ======================[ STORAGE ]=======================

  async storageInfo(path: string) {
    const res = await this.singleResponse(
      'storageInfoRequest',
      {
        path,
      },
      'storageInfoResponse',
    );
    return res;
  }
  async storageStat<V extends PROTOBUF_VERSION>(path: string) {
    const res = await this.singleResponse(
      'storageStatRequest',
      {
        path,
      },
      'storageStatResponse',
    );
    if (!res.file) {
      throw new Error('Unexpected response content');
    }
    const file = res.file as NonNullable<
      InstanceType<Storage<V>['StatResponse']>['file']
    >;
    if (file.type == null) {
      throw new Error('Did not receive file type on stat response');
    }
    return file as typeof file & {
      type: NonNullable<(typeof file)['type']>;
    };
  }

  async storageList(path: string) {
    const reses = (await this.api.rawCommand('storageListRequest', {
      path,
    })) as PB.Main<V>[];
    const files: (InstanceType<Storage<V>['ListResponse']>['file'][number] & {
      type: NonNullable<
        InstanceType<Storage<V>['ListResponse']>['file'][number]['type']
      >;
      name: NonNullable<
        InstanceType<Storage<V>['ListResponse']>['file'][number]['name']
      >;
    })[] = [];
    for (const res of reses) {
      if (
        res.content !== 'storageListResponse' ||
        !res.storageListResponse ||
        !res.storageListResponse.file
      ) {
        throw new Error('Unexpected response content');
      }
      const f = res.storageListResponse.file as InstanceType<
        Storage<V>['ListResponse']
      >['file'][number][];
      files.push(
        ...f.map((file) => {
          if (file.type == null || file.name == null) {
            throw new Error('Unexpected response content');
          }
          return file as typeof file & {
            type: NonNullable<(typeof file)['type']>;
            name: NonNullable<(typeof file)['name']>;
          };
        }),
      );
    }
    return files;
  }

  async storageRead(path: string) {
    const reses = await this.api.rawCommand('storageReadRequest', {
      path,
    });
    const data = reses.map((res) => {
      if (
        res.content !== 'storageReadResponse' ||
        !res.storageReadResponse ||
        !res.storageReadResponse.file
      ) {
        throw new Error('Unexpected response content');
      }
      const { file } = res.storageReadResponse;
      if (file.data == null) {
        throw new Error('Unexpected response content');
      }
      return file.data;
    });
    const totalSize = data.reduce((acc, d) => acc + d.length, 0);
    const result = new Uint8Array(totalSize);
    let offset = 0;
    for (const chunk of data) {
      result.set(chunk, offset);
      offset += chunk.length;
    }
    return result;
  }

  async storageDelete(path: string, recursive?: boolean) {
    await this.singleResponse(
      'storageDeleteRequest',
      {
        path,
        recursive,
      },
      'empty',
    );
  }

  async storageMkdir(path: string) {
    await this.singleResponse(
      'storageMkdirRequest',
      {
        path,
      },
      'empty',
    );
  }

  async storageMd5sum(path: string) {
    const res = await this.singleResponse(
      'storageMd5sumRequest',
      {
        path,
      },
      'storageMd5sumResponse',
    );
    if (!res.md5sum) {
      throw new Error('Unexpected response content');
    }
    return res.md5sum;
  }

  async storageRename(oldPath: string, newPath: string) {
    await this.singleResponse(
      'storageRenameRequest',
      {
        oldPath,
        newPath,
      },
      'empty',
    );
  }

  async storageWrite(path: string, data: Uint8Array) {
    const segments = new Array<Uint8Array>(
      Math.max(Math.ceil(data.length / 512), 1),
    );
    for (let i = 0; i < segments.length; i++) {
      segments[i] = data.subarray(i * 512, (i + 1) * 512);
    }
    await this.singleResponse(
      'storageWriteRequest',
      segments.map((data) => ({
        path,
        file: {
          data,
        },
      })),
      'empty',
    );
  }
}

export default CommandsV0_1;
