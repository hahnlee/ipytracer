// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

var loadedModules = [
    require('./chart.js'),
    require('./directed_graph.js'),
    require('./tracer.js'),
    require('./tree.js'),
    require('./list1D.js')
];

for (var i in loadedModules) {
    if (loadedModules.hasOwnProperty(i)) {
        var loadedModule = loadedModules[i];
        for (var target_name in loadedModule) {
            if (loadedModule.hasOwnProperty(target_name)) {
                module.exports[target_name] = loadedModule[target_name];
            }
        }
    }
}

module.exports["version"] = require("../package.json").version;