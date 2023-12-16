import { PROTOBUF_VERSION_MAP } from '@flipper-rpc-client/versioned-protobuf';
import {
  CommandStatus,
  Main,
} from '@flipper-rpc-client/versioned-protobuf/Resolve/PB';

export class CommandError<
  Version extends keyof PROTOBUF_VERSION_MAP,
> extends Error {
  readonly commandStatus: CommandStatus<Version> | -1;
  readonly requests: readonly Main<Version>[];
  readonly responses: readonly Main<Version>[];

  constructor(
    CommandStatuses: CommandStatus.Enum<Version>,
    requests: readonly Main<Version>[],
    responses: readonly Main<Version>[],
    message?: string,
  ) {
    const failResponse = responses.find(
      (res) => res.commandStatus !== CommandStatuses.OK,
    );
    const requestSet = new Set<NonNullable<Main<Version>['content']>>();
    requests.forEach((req) => {
      if (req.content != null) {
        requestSet.add(req.content);
      }
    });
    const commandStatus = (failResponse?.commandStatus ?? -1) as
      | CommandStatus<Version>
      | -1;
    const statusLabel =
      commandStatus >= 0 &&
      Object.hasOwnProperty.call(CommandStatuses, commandStatus)
        ? CommandStatuses[commandStatus]
        : null;
    const cmd = [...requestSet].join('|');
    if (message == null) {
      message = `Command ${
        cmd ? `${cmd} ` : ''
      }failed with status ${commandStatus}${
        statusLabel ? `(${statusLabel})` : ''
      }`;
    }
    super(message);
    this.commandStatus = commandStatus;
    this.requests = requests;
    this.responses = responses;
  }
}
Object.defineProperty(CommandError.prototype, 'name', {
  value: CommandError.name,
  enumerable: false,
  writable: true,
  configurable: true,
});
