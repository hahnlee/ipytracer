// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

import {TracerView, TracerModel} from './tracer';
import * as _ from 'underscore';

export class List2DTracerView extends TracerView {
    listenData() {
        this.listenTo(this.model, 'change:visited_col', this._visited_col_change, this);
        this.listenTo(this.model, 'change:selected_col', this._selected_col_change, this);
    }

    _selected_col_change() {
        console.log(this.model.get('selected_col'));
    }

    _visited_col_change() {
        console.log(this.model.get('visited_col'));
    }

}

export var List2DTracerModel = TracerModel.extend({
    defaults: _.extend({}, TracerModel.prototype.defaults, {
        _view_name: 'List2DTracerView',
        _model_name: 'List2DTracerModel',
        selected_col: -1,
        visited_col: -1
    })
});