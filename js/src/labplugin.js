/*
* This file came from
* https://github.com/ellisonbg/ipyleaflet/blob/master/js/src/labplugin.js
* */
var ipytracer = require('./index');

var jupyterlab_widgets = require('@jupyterlab/nbwidgets');

module.exports = {
  id: 'jupyter.extensions.ipytracer',
  requires: [jupyterlab_widgets.INBWidgetExtension],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'ipytracer',
          version: ipytracer.version,
          exports: ipytracer
      });
  },
  autoStart: true
};