if (window.require) {
    window.require.config({
        map: {
            "*" : {
                "tracer": "nbextensions/tracer/index",
                "jupyter-js-widgets": "nbextensions/jupyter-js-widgets/extension"
            }
        }
    });
}

module.exports = {
    load_ipython_extension: function() {}
};