// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.
//
// drawLabel, drawOnHover, drawArrow, SetData
// https://github.com/parkjs814/AlgorithmVisualizer/blob/master/js/module/tracer/directed_graph.js
// Copyright (c) 2016 Jason Park
// Distributed under the terms of the Modified MIT License.

import {TracerView, TracerModel} from './tracer';
import * as _ from 'underscore';
import sigma from 'sigma';

export class DirectedGraphTracerView extends TracerView {
    _create_object() {
        this.s = new sigma(this.graphOption);
        this.graph = this.s.graph;
        this.el.className = "ipytracer-graph";
        //sigma.plugins.dragNodes(this.s, this.s.renderers[0]);
        sigma.canvas.labels.def = function (node, context, settings) {
            var func = settings('funcLabelsDef');
            if (func) {
                func(node, context, settings);
            }
        };
        sigma.canvas.hovers.def = function (node, context, settings) {
            var func = settings('funcHoversDef');
            if (func) {
                func(node, context, settings);
            }
        };
        sigma.canvas.edges.def = function (edge, source, target, context, settings) {
            var func = settings('funcEdgesDef');
            if (func) {
                func(edge, source, target, context, settings);
            }
        };
        sigma.canvas.edges.arrow = function (edge, source, target, context, settings) {
            var func = settings('funcEdgesArrow');
            if (func) {
                func(edge, source, target, context, settings);
            }
        };
        //console.log(this.model.get('data'));
        this.setData(0);
        this.resize();
        //console.log(this.graph.nodes());
        //console.log('sigma:\n');
        //console.log(sigma.canvas);
    }

    _initialize_data() {
        console.log(this.el);
        let tracer = this;

        // graph option
        this.graphOption = {
            renderer: {
                container: this.el,
                type: 'canvas'
            },
            settings: {
                minArrowSize: 8,
                defaultEdgeType: 'arrow',
                maxEdgeSize: 2.5,
                labelThreshold: 4,
                font: 'Roboto',
                defaultLabelColor: '#fff',
                zoomMin: 0.6,
                zoomMax: 1.2,
                skipErrors: false,
                minNodeSize: .5,
                maxNodeSize: 12,
                labelSize: 'proportional',
                labelSizeRatio: 1.3,
                funcLabelsDef(node, context, settings) {
                    tracer.drawLabel(node, context, settings);
                },
                funcHoversDef(node, context, settings, next) {
                    tracer.drawOnHover(node, context, settings, next);
                },
                funcEdgesArrow(edge, source, target, context, settings) {
                    var color = tracer.getColor(edge, source, target, settings);
                    tracer.drawArrow(edge, source, target, color, context, settings);
                }
            }
        };
    }


    n(v) {
        return 'n' + v;
    }

    e(v1, v2) {
        return 'e' + v1 + '_' + v2;
    }

    getColor(edge, source, target, settings) {
        var color = edge.color,
            edgeColor = settings('edgeColor'),
            defaultNodeColor = settings('defaultNodeColor'),
            defaultEdgeColor = settings('defaultEdgeColor');
        if (!color)
            switch (edgeColor) {
                case 'source':
                    color = source.color || defaultNodeColor;
                    break;
                case 'target':
                    color = target.color || defaultNodeColor;
                    break;
                default:
                    color = defaultEdgeColor;
                    break;
            }

        return color;
    }

    resize() {
        this.s.renderers[0].resize();
        this.refresh();
    }

    refresh() {
        this.s.refresh();
        window.dispatchEvent(new Event('resize'));
        window.dispatchEvent(new Event('resize'));
    }

    setData(undirected) {
        this.graph.clear();
        const nodes = [];
        const edges = [];
        const G = this.model.get('data');
        const unitAngle = 2 * Math.PI / G.length;
        let currentAngle = 0;
        for (let i = 0; i < G.length; i++) {
            currentAngle += unitAngle;
            nodes.push({
                id: this.n(i),
                label: '' + i,
                x: .5 + Math.sin(currentAngle) / 2,
                y: .5 + Math.cos(currentAngle) / 2,
                size: 1,
                color: this.model.get('defaultColor'),
                weight: 0
            });

            if (undirected) {
                for (let j = 0; j <= i; j++) {
                    const value = G[i][j] || G[j][i];
                    if (value) {
                        edges.push({
                            id: this.e(i, j),
                            source: this.n(i),
                            target: this.n(j),
                            color: this.model.get('defaultColor'),
                            size: 1,
                            weight: value
                        });
                    }
                }
            } else {
                for (let j = 0; j < G[i].length; j++) {
                    if (G[i][j]) {
                        edges.push({
                            id: this.e(i, j),
                            source: this.n(i),
                            target: this.n(j),
                            color: this.model.get('defaultColor'),
                            size: 1,
                            weight: G[i][j]
                        });
                    }
                }
            }
        }
        this.graph.read({
            nodes: nodes,
            edges: edges
        });
        this.s.camera.goTo({
            x: 0,
            y: 0,
            angle: 0,
            ratio: 1
        });
        this.resize();
    }

    drawLabel(node, context, settings) {
        var fontSize,
            prefix = settings('prefix') || '',
            size = node[prefix + 'size'];

        if (size < settings('labelThreshold'))
            return;

        if (!node.label || typeof node.label !== 'string')
            return;

        fontSize = (settings('labelSize') === 'fixed') ?
            settings('defaultLabelSize') :
            settings('labelSizeRatio') * size;

        context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') +
            fontSize + 'px ' + settings('font');
        context.fillStyle = (settings('labelColor') === 'node') ?
            (node.color || settings('defaultNodeColor')) :
            settings('defaultLabelColor');

        context.textAlign = 'center';
        context.fillText(
            node.label,
            Math.round(node[prefix + 'x']),
            Math.round(node[prefix + 'y'] + fontSize / 3)
        );
    }

    drawArrow(edge, source, target, color, context, settings) {
        var prefix = settings('prefix') || '',
            size = edge[prefix + 'size'] || 1,
            tSize = target[prefix + 'size'],
            sX = source[prefix + 'x'],
            sY = source[prefix + 'y'],
            tX = target[prefix + 'x'],
            tY = target[prefix + 'y'],
            angle = Math.atan2(tY - sY, tX - sX),
            dist = 3;
        sX += Math.sin(angle) * dist;
        tX += Math.sin(angle) * dist;
        sY += -Math.cos(angle) * dist;
        tY += -Math.cos(angle) * dist;
        var aSize = Math.max(size * 2.5, settings('minArrowSize')),
            d = Math.sqrt(Math.pow(tX - sX, 2) + Math.pow(tY - sY, 2)),
            aX = sX + (tX - sX) * (d - aSize - tSize) / d,
            aY = sY + (tY - sY) * (d - aSize - tSize) / d,
            vX = (tX - sX) * aSize / d,
            vY = (tY - sY) * aSize / d;

        context.strokeStyle = color;
        context.lineWidth = size;
        context.beginPath();
        context.moveTo(sX, sY);
        context.lineTo(
            aX,
            aY
        );
        context.stroke();

        context.fillStyle = color;
        context.beginPath();
        context.moveTo(aX + vX, aY + vY);
        context.lineTo(aX + vY * 0.6, aY - vX * 0.6);
        context.lineTo(aX - vY * 0.6, aY + vX * 0.6);
        context.lineTo(aX + vX, aY + vY);
        context.closePath();
        context.fill();
    }

    drawOnHover(node, context, settings, next) {
        var tracer = this;

        context.setLineDash([5, 5]);
        var nodeIdx = node.id.substring(1);
        this.graph.edges().forEach(function (edge) {
            var ends = edge.id.substring(1).split("_");
            if (ends[0] == nodeIdx) {
                var color = '#0ff';
                var source = node;
                var target = tracer.graph.nodes('n' + ends[1]);
                tracer.drawArrow(edge, source, target, color, context, settings);
                if (next) next(edge, source, target, color, context, settings);
            } else if (ends[1] == nodeIdx) {
                var color = '#ff0';
                var source = tracer.graph.nodes('n' + ends[0]);
                var target = node;
                tracer.drawArrow(edge, source, target, color, context, settings);
                if (next) next(edge, source, target, color, context, settings);
            }
        });
    }

    post_render() {
        let tracer = this;
        this.resize();
         window.setTimeout(function () {
             tracer.s.refresh();
             // This does.
             window.dispatchEvent(new Event('resize'));
         }, 100);
    }
}

export class DirectedGraphTracerModel extends TracerModel {
    defaults() {
        return _.extend(super.defaults(), {
            _view_name: 'DirectedGraphTracerView',
            _model_name: 'DirectedGraphTracerModel'
        });
    }
}
