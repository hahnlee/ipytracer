/**
 * Created by sn0wle0pard on 2017. 1. 2..
 */
var widgets = require('jupyter-js-widgets');
var _ = require('underscore');

var TracerView = widgets.DOMWidgetView.extend({

    initialize: function (parameters) {
        TracerView.__super__.initialize.apply(this, arguments);
    },

    render: function () {
        TracerView.__super__.render.apply(this, arguments);
        this._initialize_data();
        this._create_object();
        this.listenTo(this.model, 'change:data', this.data_change, this);
        this.listenTo(this.model, 'change:selected', this._selected_change, this);
        this.listenTo(this.model, 'change:visited', this._visited_change, this);
    },

    data_change: function () {
        if(this.model.previous('data').size != this.model.get('data')){
            this._data_update();
        }
    },

    _initialize_data: function () {

    },

    _create_object: function () {

    },

    _data_update: function () {

    },

    _selected_change: function () {

    },

    _visited_change: function () {

    }
});

var TracerModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
        _view_name : 'TracerView',
        _model_name : 'TracerModel',
        _view_module : 'tracer',
        _model_module : 'tracer',

        _id: '',
        data: [],

        notified: -1,
        selected: -1,
        visited: -1,

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
