// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.
//
// drawLabel, drawOnHover, drawArrow, SetData
// https://github.com/parkjs814/AlgorithmVisualizer/blob/master/js/module/tracer/directed_graph.js
// Copyright (c) 2016 Jason Park
// Distributed under the terms of the Modified MIT License.

import {TracerView, TracerModel} from './tracer';
import * as _ from 'underscore';

export class DirectedGraphTracerView extends TracerView {
    _create_object() {
    }

    _initialize_data() {
    }


    n(v) {
        return 'n' + v;
    }

    e(v1, v2) {
        return 'e' + v1 + '_' + v2;
    }

    getColor(edge, source, target, settings) {
    }

    resize() {
    }

    refresh() {
    }

    setData(undirected) {
    }


    post_render() {
    }
}

export var DirectedGraphTracerModel = TracerModel.extend({
    defaults: _.extend({}, TracerModel.prototype.defaults, {
        _view_name: 'DirectedGraphTracerView',
        _model_name: 'DirectedGraphTracerModel'
    })
});
