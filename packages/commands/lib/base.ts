import * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import type { PROTOBUF_VERSION_MAP } from '@flipper-rpc-client/versioned-protobuf';
import type { Main } from '@flipper-rpc-client/versioned-protobuf/Resolve/PB';
import { ProtocolError } from '@flipper-rpc-client/core/Errors';
import type { RpcApi } from '@flipper-rpc-client/core';

export abstract class Commands<V extends keyof PROTOBUF_VERSION_MAP> {
  constructor(readonly api: RpcApi<V>) {}

  protected async singleResponse<const CMD extends Main.CMD<V>>(
    command: CMD,
    properties: NonNullable<Main.Options<V>[CMD]>,
  ): Promise<Main<V>>;
  protected async singleResponse<
    const CMD extends Main.CMD<V>,
    const Res extends Main.CMD<V>,
  >(
    command: CMD,
    properties: NonNullable<Main.Options<V>[CMD]>,
    type: Res,
  ): Promise<NonNullable<Main<V>[Res]>>;
  protected async singleResponse<const CMD extends Main.CMD<V>>(
    command: CMD,
    properties: readonly NonNullable<Main.Options<V>[CMD]>[],
  ): Promise<Main<V>>;
  protected async singleResponse<
    const CMD extends Main.CMD<V>,
    const Res extends Main.CMD<V>,
  >(
    command: CMD,
    properties: readonly NonNullable<Main.Options<V>[CMD]>[],
    type: Res,
  ): Promise<NonNullable<Main<V>[Res]>>;
  protected async singleResponse<
    const CMD extends Main.CMD<V>,
    const Res extends Main.CMD<V>,
  >(
    command: CMD,
    properties:
      | NonNullable<Main.Options<V>[CMD]>
      | readonly NonNullable<Main.Options<V>[CMD]>[],
    type?: Res,
  ): Promise<Main<V> | NonNullable<Main<V>[Res]>> {
    const reses = await this.api.rawCommand(command, properties);
    if (reses.length !== 1) {
      const { CommandStatus } = await this.api.getProtobuf();
      throw new ProtocolError(
        `Unexpected response length. Expected 1 response. Got ${reses.length} responses.`,
        CommandStatus,
        reses.request,
        reses,
      );
    }
    const res = reses[0];
    if (type == null) return res;
    const content = res[type];
    if (res.content !== type || content == null) {
      const { CommandStatus } = await this.api.getProtobuf();
      throw new ProtocolError(
        `Unexpected response content. Expected ${type} response. Got ${res.content} response.`,
        CommandStatus,
        reses.request,
        reses,
      );
    }
    return content;
  }
}
