import type Resolve from '../index.js';
import type { PROTOBUF_VERSION } from '../../index.js';

declare namespace System {}

type System<V extends PROTOBUF_VERSION> = Resolve<V>['PB_System'];

export default System;
