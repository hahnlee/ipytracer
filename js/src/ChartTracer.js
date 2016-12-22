var widgets = require('jupyter-js-widgets');
var _ = require('underscore');
var Chart = require('chart.js');

var ChartTracerView = widgets.DOMWidgetView.extend({

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

        this.chartOption = this.model.get('chart_option');
        // set data
        this.chartOption['data']['datasets'][0]['data'] = this.model.get('data');
        this.chartOption['data']['labels'] = this.model.get('labels');
        console.log(this.chartOption);

        this.tracerChart = new Chart(this.ctx, this.chartOption);
    },

    events: {
        "change": "handle_date_change"
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
        backgroundColor: [],

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
