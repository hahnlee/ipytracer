var widgets = require('jupyter-js-widgets');
var _ = require('underscore');
var Chart = require('chart.js');

var ChartTracerView = widgets.DOMWidgetView.extend({

    render: function() {
        this._id = widgets.uuid();
        this.el.className = 'widget-hbox jupyter-widgets widget-width';
        // set ctx
        this.ctx = document.createElement('canvas');
        this.ctx.setAttribute('width', this.model.get('width'));
        this.ctx.setAttribute('height', this.model.get('height'));
        this.ctx.id = this._id;
        console.log(this.ctx);

        this.el.appendChild(this.ctx);
        console.log(this.ctx);
        this.tracerChart = new Chart(this.ctx, this.model.get('chart_option'));
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
                responsive: false,
                maintainAspectRatio: true
            }
        }
    })
});

module.exports = {
    ChartTracerView: ChartTracerView,
    ChartTracerModel: ChartTracerModel
};
