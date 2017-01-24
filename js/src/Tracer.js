// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

'use strict';

var widgets = require('jupyter-js-widgets');
var _ = require('underscore');

var TracerView = widgets.DOMWidgetView.extend({

    initialize: function (parameters) {
        TracerView.__super__.initialize.apply(this, arguments);
    },

    render: function () {
        TracerView.__super__.render.apply(this, arguments);
        this._initialize_data();

        // create object
        this._create_object();

        // listen data change
        this.listenTo(this.model, 'change:data', this._data_change, this);

        // listen selected index change
        this.listenTo(this.model, 'change:selected', this._selected_change, this);

        // listen visited index change
        this.listenTo(this.model, 'change:visited', this._visited_change, this);
    },

    _initialize_data: function () {

    },

    /**
     * The event when data change
     * Currently, it is divided into _visited_change due to synchronization problems.
     * TODO: When the sync issue is over, Change it to only check if the data size has changed.
     */
    _data_change: function () {

    },

    /**
     * The event when data size change.
     * TODO: When the sync issue is over, Activate this method
     */
    _data_size_change: function () {

    },

    /**
     * Create object
     * Tracers overload this method to create an object.
     */
    _create_object: function () {

    },

    /**
     * The event when the array value of the corresponding index changes
     * e.g. When __setitem__ method run in Python Tracer objects
     */
    _selected_change: function () {

    },

    /**
     * The event when index called
     * e.g. When __getitem__ method run in Python Tracer objects
     */
    _visited_change: function () {

    }
});

/**
 * Base TracerModels, Other Tracers overload this object to create their own Model.
 */
var TracerModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
        _view_name : 'TracerView',
        _model_name : 'TracerModel',
        _view_module : 'ipytracer',
        _model_module : 'ipytracer',

        _id: '',
        data: [],

        // Index of data where event occurred
        notified: -1,
        selected: -1,
        visited: -1,

        // Base color of Tracers
        defaultColor: '#bdbdbd',
        notifiedColor: '#37D242',
        selectedColor: '#2962ff',
        visitedColor: '#f50057'
    })
});

module.exports = {
    TracerView: TracerView,
    TracerModel: TracerModel
};
