// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

import { TracerView, TracerModel } from './tracer';
import * as _ from 'underscore';

export
class TreeTracerView extends TracerView {

}

export
class TreeTracerModel extends TracerModel {
    defaults() {
        return _.extend(super.defaults(), {
            _view_name: 'TreeTracerView',
            _model_name: 'TreeTracerModel'
        });
    }
}
