import type * as _ from '@flipper-rpc-client/versioned-protobuf/version-namespace';
import { PROTOBUF_VERSION_MAP } from '@flipper-rpc-client/versioned-protobuf';
import { Resolve, PB } from '@flipper-rpc-client/versioned-protobuf/Resolve';
import { PatchedMainCtor } from './Types.js';
import { StreamProtobufReader } from './StreamProtobufReader.js';

export class VersionedProtobuf<Version extends keyof PROTOBUF_VERSION_MAP> {
  #Module: Resolve<Version>;
  readonly Reader: StreamProtobufReader<PB.Main<Version>>;

  constructor(module: Resolve<Version>) {
    this.#Module = module;
    this.Reader = new StreamProtobufReader(
      module.PB.Main as PatchedMainCtor<Version>,
    );
  }

  get Main(): PatchedMainCtor<Version> {
    return this.#Module.PB.Main as PatchedMainCtor<Version>;
  }

  get CommandStatus(): PB.CommandStatus.Enum<Version> {
    return this.#Module.PB.CommandStatus;
  }
}
