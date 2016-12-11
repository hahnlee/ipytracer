var jupyter_leaflet = require('./index');

var jupyterlab_widgets = require('@jupyterlab/nbwidgets');

module.exports = {
  id: 'jupyter.extensions.tracer',
  requires: [jupyterlab_widgets.INBWidgetExtension],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'tracer',
          version: tracer.version,
          exports: tracer
      });
  },
  autoStart: true
};