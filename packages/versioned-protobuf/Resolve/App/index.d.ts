import type Resolve from '../index.js';
import type { PROTOBUF_VERSION } from '../../index.js';

declare namespace App {}

type App<V extends PROTOBUF_VERSION> = Resolve<V>['PB_App'];

export default App;
