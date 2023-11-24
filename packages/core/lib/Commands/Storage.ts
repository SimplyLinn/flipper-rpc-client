import type * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { singleResponse } from '../Utils.js';
import { cmd } from '../_internal/cmdFactory.js';
import type RpcApi from '../RpcApi.js';
import { Resolve, Version } from '../Types.js';

export const storageInfo = cmd.v0_1.andUp(async function (path: string) {
  const res = singleResponse(
    await this.rawCommand('storageInfoRequest', {
      path,
    }),
    'storageInfoResponse',
  );
  return res;
});

export const storageStat = cmd.v0_1.andUp(async function (path: string) {
  const res = singleResponse(
    await this.rawCommand('storageStatRequest', {
      path,
    }),
    'storageStatResponse',
  );
  if (!res.file) {
    throw new Error('Unexpected response content');
  }
  const { file } = res;
  if (file.type == null) {
    throw new Error('Did not receive file type on stat response');
  }
  return {
    type: file.type,
    ...(file.size != null ? { size: file.size } : null),
  };
});

export const storageList = cmd.v0_1.andUp(async function <
  V extends Version.AndUp<'0.1'>,
>(this: RpcApi<V>, path: string) {
  const reses = (await this.rawCommand('storageListRequest', {
    path,
  })) as InstanceType<Resolve.Version<V>['PB']['Main']>[];
  type FileType = Exclude<
    InstanceType<
      Resolve.Version<V>['PB_Storage']['ListResponse']
    >['file'][number]['type'],
    null | undefined
  >;
  type FileName = Exclude<
    InstanceType<
      Resolve.Version<V>['PB_Storage']['ListResponse']
    >['file'][number]['name'],
    null | undefined
  >;
  type FileSize = Exclude<
    InstanceType<
      Resolve.Version<V>['PB_Storage']['ListResponse']
    >['file'][number]['size'],
    null | undefined
  >;
  const files: {
    type: FileType;
    name: FileName;
    size?: FileSize;
  }[] = [];
  for (const res of reses) {
    if (
      res.content !== 'storageListResponse' ||
      !res.storageListResponse ||
      !res.storageListResponse.file
    ) {
      throw new Error('Unexpected response content');
    }
    const f = res.storageListResponse.file;
    files.push(
      ...f.map((file) => {
        if (file.type == null || file.name == null) {
          throw new Error('Unexpected response content');
        }
        return {
          type: file.type as FileType,
          name: file.name as FileName,
          ...(file.size != null ? { size: file.size as FileSize } : null),
        };
      }),
    );
  }
  return files;
});

export const storageRead = cmd.v0_1.andUp(async function (path: string) {
  const reses = await this.rawCommand('storageReadRequest', {
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
});

export const storageDelete = cmd.v0_1.andUp(async function (
  path: string,
  recursive?: boolean,
) {
  singleResponse(
    await this.rawCommand('storageDeleteRequest', {
      path,
      recursive,
    }),
    'empty',
  );
});

export const storageMkdir = cmd.v0_1.andUp(async function (path: string) {
  singleResponse(
    await this.rawCommand('storageMkdirRequest', {
      path,
    }),
    'empty',
  );
});

export const storageMd5sum = cmd.v0_1.andUp(async function (path: string) {
  const res = singleResponse(
    await this.rawCommand('storageMd5sumRequest', {
      path,
    }),
    'storageMd5sumResponse',
  );
  if (!res.md5sum) {
    throw new Error('Unexpected response content');
  }
  return res.md5sum;
});

export const storageRename = cmd.v0_1.andUp(async function (
  oldPath: string,
  newPath: string,
) {
  singleResponse(
    await this.rawCommand('storageRenameRequest', {
      oldPath,
      newPath,
    }),
    'empty',
  );
});

export const storageWrite = [
  cmd.v0_18.andDown(async function (path: string, data: Uint8Array) {
    singleResponse(
      await this.rawCommand('storageWriteRequest', {
        path,
        file: {
          data,
          type: 0,
        },
      }),
      'empty',
    );
  }),
  cmd.v0_19.andUp(async function (path: string, data: Uint8Array) {
    const segments = new Array<Uint8Array>(
      Math.max(Math.ceil(data.length / 512), 1),
    );
    for (let i = 0; i < segments.length; i++) {
      segments[i] = data.subarray(i * 512, (i + 1) * 512);
    }
    if (segments.length === 1) {
      singleResponse(
        await this.rawCommand('storageWriteRequest', {
          path,
          file: {
            data: segments[0],
          },
        }),
        'empty',
      );
    } else {
      const firstSegment = segments.shift()!;
      singleResponse(
        await this.rawCommand(
          'storageWriteRequest',
          {
            path,
            file: {
              data: firstSegment,
            },
          },
          ...segments.map((data) => ({
            path,
            file: {
              data,
            },
          })),
        ),
        'empty',
      );
    }
  }),
] as const;
