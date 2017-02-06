// Copyright (c) Han Lee.
// Distributed under the terms of the Modified BSD License.

import * as widgets from 'jupyter-js-widgets';
import * as _ from 'underscore';

export
class TracerView extends widgets.DOMWidgetView {

    initialize(parameters) {
        super.initialize(parameters);
    }

    render() {
        super.render();
        this._initialize_data();

        // create object
        this._create_object();

        // listen data change
        this.listenTo(this.model, 'change:data', this._data_change, this);

        // listen selected index change
        this.listenTo(this.model, 'change:selected', this._selected_change, this);

        // listen visited index change
        this.listenTo(this.model, 'change:visited', this._visited_change, this);
        this.displayed.then(
            this.post_render()
        );
    }

    _initialize_data() {

    }

    /**
     * The event when data change
     * Currently, it is divided into _visited_change due to synchronization problems.
     * TODO: When the sync issue is over, Change it to only check if the data size has changed.
     */
    _data_change() {

    }

    /**
     * The event when data size change.
     * TODO: When the sync issue is over, Activate this method
     */
    _data_size_change() {

    }

    /**
     * Create object
     * Tracers overload this method to create an object.
     */
    _create_object() {

    }

    /**
     * The event when the array value of the corresponding index changes
     * e.g. When __setitem__ method run in Python Tracer objects
     */
    _selected_change() {

    }

    /**
     * The event when index called
     * e.g. When __getitem__ method run in Python Tracer objects
     */
    _visited_change() {

    }

    post_render() {

    }
}

/**
 * Base TracerModels, Other Tracers overload this object to create their own Model.
 */
export
class TracerModel extends widgets.DOMWidgetModel{
    defaults() {
        return _.extend(super.defaults(), {
            _view_name: 'TracerView',
            _model_name: 'TracerModel',
            _view_module: 'ipytracer',
            _model_module: 'ipytracer',

            _id: '',
            data: [],

            // Index of data where event occurred
            notified: -1,
            selected: -1,
            visited: -1,

            // Base color of Tracers
            defaultColor: '#bdbdbd',
            notifiedColor: '#37D242',
            selectedColor: '#2962ff',
            visitedColor: '#f50057'
        });
    }
}
