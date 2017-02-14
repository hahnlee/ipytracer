# -*- coding: UTF-8 -*-
# Copyright (c) Han Lee.
# Distributed under the terms of the Modified BSD License.
from ipywidgets import (
    DOMWidget,
    Layout
)
from traitlets import (
    Unicode,
    Int,
    List,
    default
)
from uuid import uuid4


class TracerView(DOMWidget):
    """Abstract base class for Tracers.
    Tracer with specific codes are specializations of this class.
    Tracer class is also eventful list.

    :type data: list
    :param data Data to track
    :type delay: float
    :param delay Animation delay in milliseconds for each event (default 0.25)
    """

    data = List().tag(sync=True)
    _id = Unicode().tag(sync=True)

    _view_module = Unicode('ipytracer').tag(sync=True)
    _model_module = Unicode('ipytracer').tag(sync=True)

    notified = Int(-1).tag(sync=True)
    selected = Int(-1).tag(sync=True)
    visited = Int(-1).tag(sync=True)

    def __init__(self, data, **kwargs):
        super(TracerView, self).__init__(**kwargs)
        self.data = data
        self._id = str(uuid4())

    def update_data(self, data):
        self.data = list(data)

    def update_visited(self, index):
        self.visited = index

    def update_selected(self, index):
        self.selected = index


class ChartTracerView(TracerView):
    """
    This tracer representing a one-dimensional list as a chart diagram

    :param data to track
    :param delay Animation delay in milliseconds for each event (default 0.25)
    """

    _view_name = Unicode('ChartTracerView').tag(sync=True)
    _model_name = Unicode('ChartTracerModel').tag(sync=True)
    labels = List().tag(sync=True)

    @default('layout')
    def _default_layout(self):
        return Layout(width='100%', height='300px')

    def __init__(self, data, **kwargs):
        super(ChartTracerView, self).__init__(data, **kwargs)
        self.labels = [i for i in range(len(self.data))]

    def update_data(self, data):
        if len(self.data) != self.data:
            self.labels = [i for i in range(len(data))]
        self.data = list(data)


class DirectedGraphTracerView(TracerView):
    """
    Graph Data Type Visualization Tracer
    """

    _view_name = Unicode('DirectedGraphTracerView').tag(sync=True)
    _model_name = Unicode('DirectedGraphTracerModel').tag(sync=True)

    @default('layout')
    def _default_layout(self):
        return Layout(width='100%', height='300px')

    def __init__(self, data):
        super(DirectedGraphTracerView, self).__init__(data)


class TreeTracerView(TracerView):
    """
    Tree Data Type Visualization Tracer
    """

    _view_name = Unicode('TreeTracerView').tag(sync=True)
    _model_name = Unicode('TreeTracerModel').tag(sync=True)

    def __init__(self, data):
        super(TreeTracerView, self).__init__(data)


class List1DTracerView(TracerView):
    """
    This tracer representing a one-dimensional list as a HTML Table
    """

    _view_name = Unicode('List1DTracerView').tag(sync=True)
    _model_name = Unicode('List1DTracerModel').tag(sync=True)


class List2DTracerView(TracerView):

    _view_name = Unicode('List2DTracerView').tag(sync=True)
    _model_name = Unicode('List2DTracerModel').tag(sync=True)

    visited_col = Int(-1).tag(sync=True)
    selected_col = Int(-1).tag(sync=True)

    def update_selected_col(self, index):
        self.selected_col = index

    def update_visited_col(self, index):
        self.visited_col = index
