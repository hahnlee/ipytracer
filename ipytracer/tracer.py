# -*- coding: UTF-8 -*-
# Copyright (c) Han Lee.
# Distributed under the terms of the Modified BSD License.
import time
from IPython.core.display import display

from .model import *
from .view import *


class Tracer(list):

    def __init__(self, *arg, **kwargs):
        super(Tracer, self).__init__(*arg, **kwargs)
        self.delay = 0.25
        self.tracer = TracerView(self)
        self._observers = []

    def __add__(self, other):
        super(Tracer, self).__add__(other)
        self.update_data()
        time.sleep(self.delay)

    def __getitem__(self, key):
        self.tracer.update_visited(key)
        time.sleep(self.delay)
        return super(Tracer, self).__getitem__(key)

    def __setitem__(self, key, value):
        super(Tracer, self).__setitem__(key, value)
        self.update_data()
        self.tracer.update_selected(key)
        time.sleep(self.delay)

    def append(self, value):
        super(Tracer, self).append(value)
        self.update_data()

    def extend(self, L):
        super(Tracer, self).extend(L)
        self.update_data()

    def insert(self, i, x):
        super(Tracer, self).insert(i, x)
        self.update_data()

    def remove(self, x):
        super(Tracer, self).remove(x)
        self.update_data()

    def pop(self, i):
        super(Tracer, self).pop(i)
        self.update_data()

    def sort(self, key=None, reverse=False):
        super(Tracer, self).sort(key, reverse)
        self.update_data()

    def reverse(self):
        super(Tracer, self).reverse()
        self.update_data()

    def update_data(self):
        self.tracer.update_data(self)

    def tolist(self):
        return list(self)

    def _ipython_display_(self, **kwargs):
        display(self.tracer)


class ChartTracer(Tracer):

    def __init__(self, data):
        super(ChartTracer, self).__init__(data)
        self.tracer = ChartTracerView(self.data)


class List1DTracer(Tracer):

    def __init__(self, data):
        super(List1DTracer, self).__init__(data)
        self.tracer = List1DTracerView(self.data)


class List2DTracer(Tracer):

    def __init__(self, data):
        super(List2DTracer, self).__init__(data)
        self.tracer = List2DTracerView(self.data)
        self._set_data()

    def _set_data(self):
        for i in range(len(self.data)):
            if isinstance(self.data[i], list):
                self._observers.append(List2D(self.data[i]))
                self._observers[i].set_observer(self)
        self.data = self._observers

    def update_visited_col(self, index):
        self.tracer.update_visited_col(index)

    def update_selected_col(self, index):
        self.tracer.update_selected_col(index)
        self.update_data()
