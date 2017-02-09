// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

import {TracerView, TracerModel} from './tracer';
import * as _ from 'underscore';

export class List1DTracerView extends TracerView {

    _initialize_data() {
        this.table = document.createElement('table');
        this._id = this.model.get('_id');
        this.table.setAttribute('id', this._id);
        this.el.appendChild(this.table);
    }

    _create_object() {
        let data = this.model.get('data');
        let tr = document.createElement("TR");
        this.table.appendChild(tr);

        // column settings in the table
        for (let i in data) {
            let td = document.createElement("TD");
            td.setAttribute('class', 'col-' + i);
            // FIXME: It will be change via using css
            td.setAttribute('style', 'color: white; padding: 0.5em');
            td.style.backgroundColor = this.model.get('defaultColor');
            let cell = document.createTextNode(data[i]);
            td.appendChild(cell);
            tr.appendChild(td);
        }
    }

    _data_change() {
        let index_visited = this.model.get('selected');
        let selectdTD = this.table.getElementsByClassName('col-' + index_visited)[0];
        selectdTD.textContent = this.model.get('data')[index_visited];
    }

    _selected_change() {
        // clear background
        let previous_visited = this.model.get('visited');
        let previous_selected = this.model.previous('selected');
        if (previous_visited != -1) {
            this.table.getElementsByClassName('col-' + previous_visited)[0].style.backgroundColor = this.model.get('defaultColor');
        }
        if (previous_selected != -1) {
            this.table.getElementsByClassName('col-' + previous_selected)[0].style.backgroundColor = this.model.get('defaultColor');
        }

        // set background
        let selectdTD = this.table.getElementsByClassName('col-' + this.model.get('selected'))[0];
        selectdTD.style.backgroundColor = this.model.get('selectedColor');
    }

    _visited_change() {
        // clear background
        let previous_visited = this.model.previous('visited');
        let previous_selected = this.model.get('selected');
        if (previous_visited != -1) {
            this.table.getElementsByClassName('col-' + previous_visited)[0].style.backgroundColor = this.model.get('defaultColor');
        }
        if (previous_selected != -1) {
            this.table.getElementsByClassName('col-' + previous_selected)[0].style.backgroundColor = this.model.get('defaultColor');
        }

        // set background
        let visitedTD = this.table.getElementsByClassName('col-' + this.model.get('visited'))[0];
        visitedTD.style.backgroundColor = this.model.get('visitedColor');
    }

}

export var List1DTracerModel = TracerModel.extend({
    defaults: _.extend({}, TracerModel.prototype.defaults, {
        _view_name: 'List1DTracerView',
        _model_name: 'List1DTracerModel'
    })
});
