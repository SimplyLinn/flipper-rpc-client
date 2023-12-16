import type { PROTOBUF_VERSION_MAP } from '../index.js';

import type App from './App/index.js';
import type Gui from './Gui/index.js';
import type PB from './PB/index.js';
import type Storage from './Storage/index.js';
import type System from './System/index.js';

export { App, Gui, PB, Storage, System };

export declare namespace Resolve {
  export { App, Gui, PB, Storage, System };
}

export type Resolve<V extends keyof PROTOBUF_VERSION_MAP> =
  PROTOBUF_VERSION_MAP[V];
export default Resolve;
