// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

'use strict';

var tracer = require('./tracer');
var _ = require('underscore');

var DirectedGraphTracerView = tracer.TracerView.extend({

});

var DirectedGraphTracerModel = tracer.TracerModel.extend({
    defaults: _.extend({}, tracer.TracerModel.prototype.defaults, {
        _view_name : 'DirectedGraphTracerView',
        _model_name : 'DirectedGraphTracerModel'
    })
});

module.exports = {
    DirectedGraphTracerView: DirectedGraphTracerView,
    DirectedGraphTracerModel: DirectedGraphTracerModel
};
