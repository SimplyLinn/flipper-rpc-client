import type Resolve from '../index.js';
import type { PROTOBUF_VERSION } from '../../index.js';

declare namespace Storage {}

type Storage<V extends PROTOBUF_VERSION> = Resolve<V>['PB_Storage'];

export default Storage;
