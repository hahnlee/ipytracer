/**
 * Created by sn0wle0pard on 2017. 1. 1..
 */
var widgets = require('jupyter-js-widgets');
var _ = require('underscore');

var List1DTracerView = widgets.DOMWidgetView.extend({

    initialize: function (parameters) {
        List1DTracerView.__super__.initialize.apply(this, arguments);
    },

    render: function () {
        this.table = document.createElement('table');
        this.table.setAttribute('id', this.model.get('_id'));
        this.el.appendChild(this.table);
        this._create_table();
    },

    _create_table: function () {
        var data = this.model.get('data');
        var tr = document.createElement("TR");
        this.table.appendChild(tr);
        for(var i in data){
            var td = document.createElement("TD");
            td.setAttribute('class', 'col-'+i);
            td.setAttribute('style', 'border: 1px solid black; padding: 0.5em');
            var cell = document.createTextNode(data[i]);
            td.appendChild(cell);
            tr.appendChild(td);
        }
    }

});

var List1DTracerModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
        _view_name : 'List1DTracerView',
        _model_name : 'List1DTracerModel',
        _view_module : 'tracer',
        _model_module : 'tracer',
        _id: '',
        data:[]
    })
});

module.exports = {
    List1DTracerView: List1DTracerView,
    List1DTracerModel: List1DTracerModel
};
