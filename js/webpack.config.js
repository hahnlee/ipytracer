var version = require('./package.json').version;

var loaders = [
    { test: /\.json$/, loader: 'json-loader' }
];

var buildExtension = require('@jupyterlab/extension-builder/lib/builder').buildExtension;

buildExtension({
    name: 'tracer',
    entry: './src/labplugin',
    outputDir: '../tracer/staticlab',
    useDefaultLoaders: false,
    extractCSS: false,
    config: {
        module: {
            loaders: loaders
        }
    }
});

module.exports = [
    {// Notebook extension
        entry: './src/extension.js',
        output: {
            filename: 'extension.js',
            path: '../tracer/static',
            libraryTarget: 'amd'
        }
    },
    {// jupyter-leaflet bundle for the notebook
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: '../tracer/static',
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders
        },
        externals: ['jupyter-js-widgets']
    },
    {// embeddable tracer bundle
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: './dist/',
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders
        },
        externals: ['jupyter-js-widgets']
    }
];