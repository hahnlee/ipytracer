/**
 * Created by sn0wle0pard
 */
var tracer = require('./Tracer');
var _ = require('underscore');
var Chart = require('chart.js');

var ChartTracerView = tracer.TracerView.extend({

    _create_object: function () {
         this.ctx = document.createElement('canvas');
         this.el.appendChild(this.ctx);
         this.tracerChart = new Chart(this.ctx, this.chartOption);
    },

    _initialize_data: function () {
        this.chartOption = this.model.get('chart_option');
        var data = this.model.get('data');
        this.backgroundColor = [];
        for (var i in data) {
            this.backgroundColor[i] = this.model.get('defaultColor');
        }
        this.chartOption['data']['datasets'][0]['data'] = data;
        this.chartOption['data']['datasets'][0]['backgroundColor'] = this.backgroundColor;
        this.chartOption['data']['labels'] = this.model.get('labels');
    },

    _selected_change: function () {
        var previous_visited = this.model.get('visited');
        var previous_selected = this.model.previous('selected');
        if(previous_visited != -1){
            this.backgroundColor[previous_visited] = this.model.get('defaultColor');
        }
        if(previous_selected != -1){
            this.backgroundColor[previous_selected] = this.model.get('defaultColor');
        }
        this.backgroundColor[this.model.get('selected')] = this.model.get('visitedColor');
        this.tracerChart.config.data.datasets[0].backgroundColor = this.backgroundColor;
        this.tracerChart.config.data.datasets[0].data = this.model.get('data');
        console.log(this.model.get('data'));
        this.tracerChart.update();
    },
    
    _visited_change: function () {
        var previous_visited = this.model.previous('visited');
        var previous_selected = this.model.get('selected');
        if(previous_visited != -1){
            this.backgroundColor[previous_visited] = this.model.get('defaultColor');
        }
        if(previous_selected != -1){
            this.backgroundColor[previous_selected] = this.model.get('defaultColor');
        }
        this.backgroundColor[this.model.get('visited')] = this.model.get('selectedColor');
        this.tracerChart.config.data.datasets[0].backgroundColor = this.backgroundColor;
        this.tracerChart.update();
    }
});

var ChartTracerModel = tracer.TracerModel.extend({
    defaults: _.extend({}, tracer.TracerModel.prototype.defaults, {
        _view_name : 'ChartTracerView',
        _model_name : 'ChartTracerModel',
        _view_module : 'tracer',
        _model_module : 'tracer',

        data:[],
        labels: [],

        notified: -1,
        selected: -1,
        visited: -1,

        defaultColor: '#bdbdbd',
        notifiedColor: '#37D242',
        selectedColor: '#2962ff',
        visitedColor: '#f50057',

        chart_option: {
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
        }
    })
});

module.exports = {
    ChartTracerView: ChartTracerView,
    ChartTracerModel: ChartTracerModel
};
