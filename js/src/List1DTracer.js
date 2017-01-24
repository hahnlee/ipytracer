// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

var tracer = require('./Tracer');
var _ = require('underscore');

var List1DTracerView = tracer.TracerView.extend({

    _initialize_data: function () {
        this.table = document.createElement('table');
        this._id = this.model.get('_id');
        this.table.setAttribute('id', this._id);
        this.el.appendChild(this.table);
    },

    _create_object: function () {
        var data = this.model.get('data');
        var tr = document.createElement("TR");
        this.table.appendChild(tr);

        // column settings in the table
        for(var i in data){
            var td = document.createElement("TD");
            td.setAttribute('class', 'col-'+i);
            // FIXME: It will be change via using css
            td.setAttribute('style', 'color: white; padding: 0.5em');
            td.style.backgroundColor = this.model.get('defaultColor');
            var cell = document.createTextNode(data[i]);
            td.appendChild(cell);
            tr.appendChild(td);
        }
    },

    _data_change: function () {
        var index_visited = this.model.get('selected');
        var selectdTD = this.table.getElementsByClassName('col-' + index_visited)[0];
        selectdTD.textContent = this.model.get('data')[index_visited];
    },

    _selected_change: function () {
        // clear background
        var previous_visited = this.model.get('visited');
        var previous_selected = this.model.previous('selected');
        if(previous_visited != -1){
            this.table.getElementsByClassName('col-' + previous_visited)[0].style.backgroundColor = this.model.get('defaultColor');
        }
        if(previous_selected != -1) {
            this.table.getElementsByClassName('col-' + previous_selected)[0].style.backgroundColor = this.model.get('defaultColor');
        }

        // set background
        var selectdTD = this.table.getElementsByClassName('col-' + this.model.get('selected'))[0];
        selectdTD.style.backgroundColor = this.model.get('selectedColor');
    },

    _visited_change: function () {
        // clear background
        var previous_visited = this.model.previous('visited');
        var previous_selected = this.model.get('selected');
        if(previous_visited != -1){
            this.table.getElementsByClassName('col-' + previous_visited)[0].style.backgroundColor = this.model.get('defaultColor');
        }
        if(previous_selected != -1){
            this.table.getElementsByClassName('col-' + previous_selected)[0].style.backgroundColor = this.model.get('defaultColor');
        }

        // set background
        var visitedTD = this.table.getElementsByClassName('col-' + this.model.get('visited'))[0];
        visitedTD.style.backgroundColor = this.model.get('visitedColor');
    }

});

var List1DTracerModel = tracer.TracerModel.extend({
    defaults: _.extend({}, tracer.TracerModel.prototype.defaults, {
        _view_name : 'List1DTracerView',
        _model_name : 'List1DTracerModel'
    })
});

module.exports = {
    List1DTracerView: List1DTracerView,
    List1DTracerModel: List1DTracerModel
};
