import { PROTOBUF_VERSION } from '@flipper-rpc-client/versioned-protobuf';
import { ResolveOrBootstrap as Resolve } from '../Types.js';

export class ProtocolError<
  Version extends PROTOBUF_VERSION | 'bootstrap',
> extends Error {
  constructor(message: string);
  constructor(
    message: string,
    CommandStatuses: Resolve.Version<Version>['PB']['CommandStatus'],
    requests?: readonly Resolve.Main<Version>[] | null,
    responses?: readonly Resolve.Main<Version>[] | null,
  );
  constructor(
    message: string,
    public readonly CommandStatuses?: Resolve.Version<Version>['PB']['CommandStatus'],
    public readonly requests?: readonly Resolve.Main<Version>[],
    public readonly responses?: readonly Resolve.Main<Version>[],
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
