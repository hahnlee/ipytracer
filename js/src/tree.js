// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

import {TracerView, TracerModel} from './tracer';
import * as _ from 'underscore';

export class TreeTracerView extends TracerView {

}

export var TreeTracerModel = TracerModel.extend({
    defaults: _.extend({}, TracerModel.prototype.defaults, {
        _view_name: 'TreeTracerView',
        _model_name: 'TreeTracerModel'
    })
});
