// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

'use strict';

var tracer = require('./tracer');
var _ = require('underscore');

var TreeTracerView = tracer.TracerView.extend({

});

var TreeTracerModel = tracer.TracerModel.extend({
    defaults: _.extend({}, tracer.TracerModel.prototype.defaults, {
        _view_name : 'TreeTracerView',
        _model_name : 'TreeTracerModel'
    })
});

module.exports = {
    TreeTracerView: TreeTracerView,
    TreeTracerModel: TreeTracerModel
};
