import { PROTOBUF_VERSION_MAP } from '@flipper-rpc-client/versioned-protobuf';
import { Resolve } from '../Types.js';

export class CommandError<
  Version extends keyof PROTOBUF_VERSION_MAP,
> extends Error {
  readonly commandStatus: Resolve.Main<Version>['commandStatus'] | -1;
  readonly requests: readonly Resolve.Main<Version>[];
  readonly responses: readonly Resolve.Main<Version>[];

  constructor(
    CommandStatuses: Resolve.CommandStatus<Version>,
    requests: readonly Resolve.Main<Version>[],
    responses: readonly Resolve.Main<Version>[],
    message?: string,
  ) {
    const failResponse = responses.find(
      (res) => res.commandStatus !== CommandStatuses.OK,
    );
    const requestSet = new Set<NonNullable<Resolve.Main<Version>['content']>>();
    requests.forEach((req) => {
      if (req.content != null) {
        requestSet.add(req.content);
      }
    });
    const commandStatus = failResponse?.commandStatus ?? -1;
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
