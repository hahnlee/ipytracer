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
import time
from uuid import uuid4


class Tracer(DOMWidget):
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

    def __init__(self, data, delay=0.25, **kwargs):
        super(Tracer, self).__init__(**kwargs)
        self.data = data
        self._data = data
        self.delay = delay
        self._id = str(uuid4())

    def __add__(self, other):
        self._data += other
        self.data = self._data[:]
        time.sleep(self.delay)

    def __delitem__(self, key):
        del self._data[key]
        self.data = self._data[:]
        time.sleep(self.delay)

    def __getitem__(self, key):
        self.visited = key
        time.sleep(self.delay)
        return self.data[key]

    def __len__(self):
        return len(self.data)

    def __setitem__(self, key, value):
        self._data[key] = value
        self.data = self._data[:]
        self.selected = key
        time.sleep(self.delay)

    def append(self, value):
        self._data.append(value)
        self.data = list(self._data)

    def extend(self, L):
        self._data.extend(L)
        self.data = list(self._data)

    def insert(self, i, x):
        self._data.insert(i, x)
        self.data = list(self._data)

    def remove(self, x):
        self._data.remove(x)
        self.data = list(self._data)

    def pop(self, i):
        self._data.pop(i)
        self.data = list(self._data)

    def index(self, x):
        return self.data.index(x)

    def count(self, x):
        return self.data.count(x)

    def sort(self, key=None, reverse=False):
        self._data.sort(key=key, reverse=reverse)
        self.data = list(self._data)

    def reverse(self):
        self._data.reverse()
        self.data = list(self._data)


class ChartTracer(Tracer):
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

    def __init__(self, data, delay=0.25, **kwargs):
        super(ChartTracer, self).__init__(data, delay, **kwargs)
        self.labels = [i for i in range(len(self.data))]


class DirectedGraphTracer(Tracer):
    """
    Graph Data Type Visualization Tracer
    """

    _view_name = Unicode('DirectedGraphTracerView').tag(sync=True)
    _model_name = Unicode('DirectedGraphTracerModel').tag(sync=True)

    @default('layout')
    def _default_layout(self):
        return Layout(width='100%', height='300px')

    def __init__(self, data, delay=0.25):
        super(DirectedGraphTracer, self).__init__(data, delay)


class TreeTracer(Tracer):
    """
    Tree Data Type Visualization Tracer
    """

    _view_name = Unicode('TreeTracerView').tag(sync=True)
    _model_name = Unicode('TreeTracerModel').tag(sync=True)

    def __init__(self, data, delay=0.25):
        super(TreeTracer, self).__init__(data, delay)


class List1DTracer(Tracer):
    """
    This tracer representing a one-dimensional list as a HTML Table
    """

    _view_name = Unicode('List1DTracerView').tag(sync=True)
    _model_name = Unicode('List1DTracerModel').tag(sync=True)

