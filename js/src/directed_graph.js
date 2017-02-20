// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.
//
// drawLabel, drawOnHover, drawArrow, SetData
// https://github.com/parkjs814/AlgorithmVisualizer/blob/master/js/module/tracer/directed_graph.js
// Copyright (c) 2016 Jason Park
// Distributed under the terms of the Modified MIT License.

import * as d3 from "d3";
import {TracerView, TracerModel} from './tracer';
import * as _ from 'underscore';

export class DirectedGraphTracerView extends TracerView {
    initialize() {
        this.setElement(document.createElementNS(d3.ns.prefix.svg, "g"));
        this.d3el = d3.select(this.el);
        DirectedGraphTracerView.__super__.initialize.apply(this, arguments);
    }

    _create_object() {
    }

}

export var DirectedGraphTracerModel = TracerModel.extend({
    defaults: _.extend({}, TracerModel.prototype.defaults, {
        _view_name: 'DirectedGraphTracerView',
        _model_name: 'DirectedGraphTracerModel'
    })
});
