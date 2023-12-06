import type * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { Resolve, Version } from '../Types.js';
import { singleResponse } from '../Utils.js';
import { cmd } from '../_internal/cmdFactory.js';

export const systemPing = cmd.v0_1.andUp(async function (
  data?: Uint8Array | null,
) {
  const res = singleResponse(
    await this.rawCommand('systemPingRequest', {
      data: data,
    }),
    'systemPingResponse',
  );
  if (res.data == null) {
    return null;
  }
  return res.data.length > 0 ? res.data : null;
});

export const systemDeviceInfo = cmd.v0_1.andUp(async function () {
  const reses = await this.rawCommand('systemDeviceInfoRequest', {});
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
});

export const systemFactoryReset = [
  cmd.v0_1.andUp(async function () {
    await this.rawCommand('systemFactoryResetRequest', {});
  }),
  cmd.v0_1.andUp(async function () {
    const res = singleResponse(
      await this.rawCommand('systemGetDatetimeRequest', {}),
      'systemGetDatetimeResponse',
    );
    const { datetime } = res;
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
  }),
] as const;

export const setDateTime = cmd.v0_1.andUp(async function (
  newDate:
    | Date
    | Exclude<
        NonNullable<
          Parameters<
            Resolve.Version<
              Version.AndDown<'0.5'>
            >['PB_System']['SetDateTimeRequest']['create']
          >[0]
        >['datetime'],
        null | undefined
      >,
) {
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
  singleResponse(
    await this.rawCommand('systemSetDatetimeRequest', {
      datetime,
    }),
    'empty',
  );
});

export const systemPlayAudiovisualAlert = cmd.v0_1.andUp(async function () {
  singleResponse(
    await this.rawCommand('systemPlayAudiovisualAlertRequest', {}),
    'empty',
  );
});

export const systemProtobufVersion = cmd.v0_2.andUp(async function () {
  const res = singleResponse(
    await this.rawCommand('systemProtobufVersionRequest', {}),
    'systemProtobufVersionResponse',
  );
  return {
    major: res.major ?? 0,
    minor: res.minor ?? 0,
  };
});

export const systemRebootRequest = [
  cmd.v0_5.andDown(async function (
    rebootMode?: NonNullable<
      NonNullable<
        ConstructorParameters<Resolve.MainCtor<(typeof this)['version']>>[0]
      >['systemRebootRequest']
    >['mode'],
  ) {
    return this.rawCommand('systemRebootRequest', {
      mode: rebootMode,
    }).then(
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
  }),
  cmd.v0_6.andUp(async function (
    rebootMode?: NonNullable<
      NonNullable<
        ConstructorParameters<Resolve.MainCtor<(typeof this)['version']>>[0]
      >['systemRebootRequest']
    >['mode'],
  ) {
    return this.rawCommand('systemRebootRequest', {
      mode: rebootMode,
    }).then(
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
  }),
] as const;
