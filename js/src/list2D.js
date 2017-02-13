// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

import {TracerView, TracerModel} from './tracer';
import * as _ from 'underscore';

export class List2DTracerView extends TracerView {

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

        // setting table
        for (let i in data) {
            let row = document.createElement("div");
            row.className = 'ipytracer-row';
            row.id = this.row(i);
            this.list.appendChild(row);

            for (let j in data[i]) {
                this._create_cell(i, j, row, data[i][j]);
            }
        }
    }

    listenData() {
        this.listenTo(this.model, 'change:visited_col', this._visited_col_change, this);
        this.listenTo(this.model, 'change:selected_col', this._selected_col_change, this);
    }

    _create_cell(x, y, row, text) {
        let cell = document.createElement("div");
        cell.id = this.col(x,y);
        cell.className = 'ipytracer-cell';
        cell.style.backgroundColor = this.model.get('defaultColor');
        cell.textContent = text;
        row.appendChild(cell);
    }

    _data_change() {
        const previous_data = this.model.previous('data');
        const data = this.model.get('data');
        if (previous_data.length != data.length) {
            this._create_object();
        } else {
            //same row length
            for (let i in data) {
                if (data[i].length != previous_data[i]) {
                    // different col length

                    let previous_row = document.getElementById(this.row(i));

                    // clean child
                    while (previous_row.firstChild) {
                        previous_row.removeChild(previous_row.firstChild);
                    }
                    for (let j in data[i]) {
                        this._create_cell(i, j, previous_row, data[i][j]);
                    }
                } else {
                    for (let j in data[i]) {
                        document.getElementById(this.col(i, j)).textContent = data[i][j];
                    }
                }
            }
        }
    }

    col(x, y) {
        return this._id + 'col-' + x + '-' + y;
    }

    row(index) {
        return this._id + 'row-' + index;
    }

    _change_bg(x, color) {
        let children = document.getElementById(this.row(x)).children;
        for (let i in children) {
            console.log(i);
            children[i].style.backgroundColor = this.model.get(color);
        }
    }

    _selected_change() {
        const previous_visited = this.model.get('visited');
        if (previous_visited != -1) {
            this._change_bg(previous_visited, 'defaultColor');
        }
        const previous_selected = this.model.previous('selected');

        if (previous_selected != -1) {
            this._change_bg(previous_selected, 'defaultColor');
        }

        const selected = this.model.get('selected');
        this._change_bg(selected, 'selectedColor');
    }

    _visited_change() {
        const previous_visited = this.model.previous('visited');
        if (previous_visited != -1) {
            this._change_bg(previous_visited, 'defaultColor');
        }
        const previous_selected = this.model.get('selected');
        if (previous_selected != -1) {
            this._change_bg(previous_selected, 'defaultColor');
        }

        const visited = this.model.get('visited');
        this._change_bg(visited, 'visitedColor');
    }

    _selected_col_change() {
        const visited = this.model.get('visited');
        this._change_bg(visited, 'defaultColor');

        const col = this.model.get('selected_col');

        console.log(visited, col);
        console.log(document.getElementById(this.col(visited, col)));

        document.getElementById(this.col(visited, col)).style.backgroundColor = this.model.get('selectedColor');
    }

    _visited_col_change() {
        const visited = this.model.get('visited');
        this._change_bg(visited, 'defaultColor');

        const col = this.model.get('visited_col');

        console.log(visited, col);
        console.log(document.getElementById(this.col(visited, col)));
        document.getElementById(this.col(visited, col)).style.backgroundColor = this.model.get('visitedColor');
    }

}

export var List2DTracerModel = TracerModel.extend({
    defaults: _.extend({}, TracerModel.prototype.defaults, {
        _view_name: 'List2DTracerView',
        _model_name: 'List2DTracerModel',
        selected_col: -1,
        visited_col: -1
    })
});