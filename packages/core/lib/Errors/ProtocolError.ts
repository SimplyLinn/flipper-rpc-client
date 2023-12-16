import { PROTOBUF_VERSION_MAP } from '@flipper-rpc-client/versioned-protobuf';
import {
  CommandStatus,
  Main,
} from '@flipper-rpc-client/versioned-protobuf/Resolve/PB';

export class ProtocolError<
  Version extends keyof PROTOBUF_VERSION_MAP,
> extends Error {
  constructor(message: string);
  constructor(
    message: string,
    CommandStatuses: CommandStatus.Enum<Version>,
    requests?: readonly Main<Version>[] | null,
    responses?: readonly Main<Version>[] | null,
  );
  constructor(
    message: string,
    public readonly CommandStatuses?: CommandStatus.Enum<Version>,
    public readonly requests?: readonly Main<Version>[],
    public readonly responses?: readonly Main<Version>[],
  ) {
    super(message);
    this.requests = requests;
    this.responses = responses;
  }
}
Object.defineProperty(ProtocolError.prototype, 'name', {
  value: ProtocolError.name,
  enumerable: false,
  writable: true,
  configurable: true,
});
