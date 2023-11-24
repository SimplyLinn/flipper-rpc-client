import type {
  ResolveMain,
  ScreenFrame,
  VersionRange,
} from '@flipper-rpc-client/core';
import type RpcApiWeb from './RpcApiWeb.js';

declare class _TypedEvent<const Type extends string> extends Event {
  constructor(type: Type, eventInitDict?: EventInit);
  readonly type: Type;
}

const TypedEvent: typeof _TypedEvent = Event as unknown as typeof _TypedEvent;

class RpcApiWebEvent<
  Version extends VersionRange,
  const Type extends string,
> extends TypedEvent<Type> {
  constructor(
    type: Type,
    public readonly api: RpcApiWeb<Version>,
    eventInitDict?: EventInit,
  ) {
    super(type, eventInitDict);
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace RpcApiWebEvent {
  export class ConnectEvent<
    Version extends VersionRange,
  > extends RpcApiWebEvent<Version, 'connect'> {
    constructor(api: RpcApiWeb<Version>) {
      super('connect', api);
    }
  }

  export class DisconnectEvent<
    Version extends VersionRange,
  > extends RpcApiWebEvent<Version, 'disconnect'> {
    constructor(
      api: RpcApiWeb<Version>,
      public readonly reason: Error | null,
    ) {
      super('disconnect', api);
    }
  }
  export class RpcCommandResponseEvent<
    Version extends VersionRange,
  > extends RpcApiWebEvent<Version, 'rpcCommandResponse'> {
    constructor(
      api: RpcApiWeb<Version>,
      public readonly messages: ResolveMain<Version>[],
    ) {
      super('rpcCommandResponse', api);
    }
  }

  export class RpcMessageEvent<
    Version extends VersionRange,
  > extends RpcApiWebEvent<Version, 'rpcMessage'> {
    constructor(
      api: RpcApiWeb<Version>,
      public readonly messages: ResolveMain<Version>[],
    ) {
      super('rpcMessage', api);
    }
  }

  export class RpcReceivedEvent<
    Version extends VersionRange,
  > extends RpcApiWebEvent<Version, 'rpcReceived'> {
    constructor(
      api: RpcApiWeb<Version>,
      public readonly messages: ResolveMain<Version>[],
    ) {
      super('rpcReceived', api);
    }
  }

  export class RpcPartialReceived<
    Version extends VersionRange,
  > extends RpcApiWebEvent<Version, 'rpcPartialReceived'> {
    constructor(
      api: RpcApiWeb<Version>,
      public readonly message: ResolveMain<Version>,
    ) {
      super('rpcPartialReceived', api);
    }
  }

  export class ScreenFrameEvent extends TypedEvent<'screenFrame'> {
    constructor(public readonly frame: ScreenFrame) {
      super('screenFrame');
    }
  }

  export type AnyEvent<Version extends VersionRange> =
    | ConnectEvent<Version>
    | DisconnectEvent<Version>
    | RpcCommandResponseEvent<Version>
    | RpcMessageEvent<Version>
    | RpcReceivedEvent<Version>
    | RpcPartialReceived<Version>
    | ScreenFrameEvent;

  export type EventMap<Version extends VersionRange> = {
    [key in AnyEvent<Version>['type']]: Extract<
      AnyEvent<Version>,
      { type: key }
    >;
  };
}

export default RpcApiWebEvent;
