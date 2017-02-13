// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

import {TracerView, TracerModel} from './tracer';
import * as _ from 'underscore';

export class List1DTracerView extends TracerView {

    _initialize_data() {
        this.list = document.createElement('div');
        this._id = this.model.get('_id');
        this.list.setAttribute('id', this._id);
        this.list.className = 'ipytracer-list';
        this.el.appendChild(this.list);
    }

    _create_object() {
        const data = this.model.get('data');

        // clean child
        while (this.list.firstChild) {
            this.list.removeChild(this.list.firstChild);
        }

        // column settings in the table
        for (let i in data) {
            let cell = document.createElement("div");
            cell.className = 'ipytracer-cell';
            cell.id = this.col(i);
            cell.style.backgroundColor = this.model.get('defaultColor');
            cell.textContent = data[i];
            this.list.appendChild(cell);
        }
    }

    col(index) {
        return this._id + 'col-' + index;
    }

    _data_change() {
        const prev_data = this.model.previous('data');
        const data = this.model.get('data');
        if(prev_data.length > data) {
            this._create_object();
        } else {
            for(let i=0; i<data.length; i++) {
                let selected_cell = document.getElementById(this.col(i));
                selected_cell.textContent = data[i];
            }
        }
    }

    _selected_change() {
        // clear background
        let previous_visited = this.model.get('visited');
        let previous_selected = this.model.previous('selected');
        if (previous_visited != -1) {
            document.getElementById(this.col(previous_visited)).style.backgroundColor = this.model.get('defaultColor');
        }
        if (previous_selected != -1) {
            document.getElementById(this.col(previous_selected)).style.backgroundColor = this.model.get('defaultColor');
        }

        // set background
        let selected_cell = document.getElementById(this.col(this.model.get('selected')));
        selected_cell.style.backgroundColor = this.model.get('selectedColor');
    }

    _visited_change() {
        // clear background
        let previous_visited = this.model.previous('visited');
        let previous_selected = this.model.get('selected');
        if (previous_visited != -1) {
            document.getElementById(this.col(previous_visited)).style.backgroundColor = this.model.get('defaultColor');
        }
        if (previous_selected != -1) {
            document.getElementById(this.col(previous_selected)).style.backgroundColor = this.model.get('defaultColor');
        }

        // set background
        let visited_cell = document.getElementById(this.col(this.model.get('visited')));
        visited_cell.style.backgroundColor = this.model.get('visitedColor');
    }

}

export var List1DTracerModel = TracerModel.extend({
    defaults: _.extend({}, TracerModel.prototype.defaults, {
        _view_name: 'List1DTracerView',
        _model_name: 'List1DTracerModel'
    })
});
