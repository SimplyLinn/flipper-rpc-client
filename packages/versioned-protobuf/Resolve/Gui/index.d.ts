import type Resolve from '../index.js';
import type { PROTOBUF_VERSION } from '../../index.js';

declare namespace Gui {}

type Gui<V extends PROTOBUF_VERSION> = Resolve<V>['PB_Gui'];

export default Gui;
