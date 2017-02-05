// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

import { TracerView, TracerModel } from './tracer';
import * as _ from 'underscore';

export
class DirectedGraphTracerView extends TracerView {

}

export
class DirectedGraphTracerModel extends TracerModel{
    defaults() {
        return _.extend(super.defaults(), {
            _view_name: 'DirectedGraphTracerView',
            _model_name: 'DirectedGraphTracerModel'
        });
    }
}

