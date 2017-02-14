// Copyright (c) Han Lee.
// Copyright (c) IPython Development Team.
// Distributed under the terms of the Modified BSD License.

var version = require('./package.json').version;

var loaders = [
    { test: /\.css$/, loader: "style-loader!css-loader" },
    { test: /\.json$/, loader: 'json-loader' },
    { test: /\.js$/, loader: 'babel-loader?presets[]=es2015' }
];

var buildExtension = require('@jupyterlab/extension-builder/lib/builder').buildExtension;

buildExtension({
    name: 'ipytracer',
    entry: './src/labplugin',
    outputDir: '../ipytracer/staticlab',
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
            path: '../ipytracer/static',
            libraryTarget: 'amd'
        }
    },
    {// ipytracer for the notebook
        entry: './src/index.js',
        output: {
            filename: 'index.js',
            path: '../ipytracer/static',
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders
        },
        externals: ['jupyter-js-widgets']
    },
    {// Embeddable ipytracer bundle
     //
     // This bundle is generally almost identical to the notebook bundle
     // containing the custom widget views and models.
     //
     // The only difference is in the configuration of the webpack public path
     // for the static assets.
     //
     // It will be automatically distributed by unpkg to work with the static
     // widget embedder.
     //
     // The target bundle is always `dist/index.js`, which is the path required
     // by the custom widget embedder.
     //
        entry: './src/embed.js',
        output: {
            filename: 'index.js',
            path: './dist/',
            libraryTarget: 'amd',
            publicPath: 'https://unpkg.com/ipytracer@' + version + '/dist/'
        },
        devtool: 'source-map',
        module: {
            loaders: loaders
        },
        externals: ['jupyter-js-widgets']
    }
];