var widgets = require('jupyter-js-widgets');
var _ = require('underscore');
var Chart = require('chart.js');

var ChartTracerView = widgets.DOMWidgetView.extend({

    initialize: function (parameters) {
        ChartTracerView.__super__.initialize.apply(this, arguments);
    },

    render: function() {
        ChartTracerView.__super__.render.apply(this, arguments);
        this._id = widgets.uuid();
        this.el.className = 'widget-hbox jupyter-widgets widget-width';
        this.el.style['width'] = this.model.get('width');
        this.el.style['height'] = this.model.get('height');
        this.ctx = document.createElement('canvas');
        console.log(this.el);
        this.ctx.id = this._id;
        console.log(this.ctx);

        this.el.appendChild(this.ctx);
        this._initalize_data();


        // set data
        this.tracerChart = new Chart(this.ctx, this.chartOption);
        this.listenTo(this.model, 'change:selected', this._select_index, this);
        this.listenTo(this.model, 'change:set', this._set_index, this);
    },

    _initalize_data: function () {
        this.chartOption = this.model.get('chart_option');
        var data = this.model.get('data');
        this.backgroundColor = [];
        for (var i in data) {
            this.backgroundColor[i] = this.model.get('baseColor');
        }
        this.chartOption['data']['datasets'][0]['data'] = data;
        this.chartOption['data']['datasets'][0]['backgroundColor'] = this.backgroundColor;
        this.chartOption['data']['labels'] = this.model.get('labels');
    },
    
    _select_index: function () {
        console.log('index selected');
        var previous = this.model.previous('selected');
        if(previous != -1){
            this.backgroundColor[previous] = this.model.get('baseColor');
        }
        this.backgroundColor[this.model.get('selected')] = this.model.get('selectedColor');
        this.tracerChart.config.data.datasets[0].backgroundColor = this.backgroundColor;
        this.tracerChart.update();
    },

    _set_index: function () {
        var previous = this.model.previous('set');
        if(previous != -1){
            this.backgroundColor[previous] = this.model.get('baseColor');
        }
        this.backgroundColor[this.model.get('set')] = this.model.get('setColor');
        this.tracerChart.config.data.datasets[0].backgroundColor = this.backgroundColor;
        this.tracerChart.config.data.datasets[0].data = this.model.get('data');
        console.log(this.model.get('data'));
        this.tracerChart.update();
    }
});

var ChartTracerModel = widgets.DOMWidgetModel.extend({
    defaults: _.extend({}, widgets.DOMWidgetModel.prototype.defaults, {
        _view_name : 'ChartTracerView',
        _model_name : 'ChartTracerModel',
        _view_module : 'tracer',
        _model_module : 'tracer',
        options : [],

        width : "600px",
        height : "300px",

        data:[],
        labels: [],
        selected: -1,
        set: -1,

        baseColor: '#bdbdbd',
        selectedColor: '#f50057',
        setColor: '#2962ff',

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
