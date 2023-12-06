import type * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { PROTOBUF_VERSION_MAP } from '@flipper-rpc-client/versioned-protobuf';
import { PatchedMainCtor, Resolve } from './Types.js';
import { StreamProtobufReader } from './StreamProtobufReader.js';

export class VersionedProtobuf<Version extends keyof PROTOBUF_VERSION_MAP> {
  #Module: Resolve.Version<Version>;
  readonly Reader: StreamProtobufReader<Resolve.Main<Version>>;

  constructor(module: Resolve.Version<Version>) {
    this.#Module = module;
    this.Reader = new StreamProtobufReader(
      module.PB.Main as PatchedMainCtor<Version>,
    );
  }

  get Main(): PatchedMainCtor<Version> {
    return this.#Module.PB.Main as PatchedMainCtor<Version>;
  }

  get CommandStatus(): Resolve.CommandStatus<Version> {
    return this.#Module.PB.CommandStatus;
  }
}
