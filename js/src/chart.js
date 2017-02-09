// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

import Chart from 'chart.js';
import {TracerView, TracerModel} from './tracer';
import * as _ from 'underscore';


export class ChartTracerView extends TracerView {

    _create_object() {
        // Create canvas: chart.js works on canvas
        this.ctx = document.createElement('canvas');
        this.el.appendChild(this.ctx);
        // set chart
        this.tracerChart = new Chart(this.ctx, this.chartOption);
    }

    _initialize_data() {
        // default chart.js option
        this.chartOption = {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: []
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                animation: false,
                legend: false,
                responsive: true,
                maintainAspectRatio: false
            }
        };

        // set data
        let data = this.model.get('data');
        this.chartOption['data']['datasets'][0]['data'] = data;

        // set chart background color
        this.backgroundColor = [];
        for (let i in data) {
            this.backgroundColor[i] = this.model.get('defaultColor');
        }
        this.chartOption['data']['datasets'][0]['backgroundColor'] = this.backgroundColor;

        // set label
        this.chartOption['data']['labels'] = this.model.get('labels');
    }

    _data_change() {
        // update data
        this.tracerChart.config.data.datasets[0].data = this.model.get('data');
        this.tracerChart.update();
    }

    _selected_change() {
        // clear background
        let previous_visited = this.model.get('visited');
        let previous_selected = this.model.previous('selected');
        if (previous_visited != -1) {
            this.backgroundColor[previous_visited] = this.model.get('defaultColor');
        }
        if (previous_selected != -1) {
            this.backgroundColor[previous_selected] = this.model.get('defaultColor');
        }

        // set background
        this.backgroundColor[this.model.get('selected')] = this.model.get('selectedColor');
        this.tracerChart.config.data.datasets[0].backgroundColor = this.backgroundColor;
        this.tracerChart.update();
    }

    _visited_change() {
        // clear background
        let previous_visited = this.model.previous('visited');
        let previous_selected = this.model.get('selected');
        if (previous_visited != -1) {
            this.backgroundColor[previous_visited] = this.model.get('defaultColor');
        }
        if (previous_selected != -1) {
            this.backgroundColor[previous_selected] = this.model.get('defaultColor');
        }

        // set background
        this.backgroundColor[this.model.get('visited')] = this.model.get('visitedColor');
        this.tracerChart.config.data.datasets[0].backgroundColor = this.backgroundColor;
        this.tracerChart.update();
    }
}

export var ChartTracerModel = TracerModel.extend({
    defaults: _.extend({}, TracerModel.prototype.defaults, {
        _view_name: 'ChartTracerView',
        _model_name: 'ChartTracerModel'
    })
});
