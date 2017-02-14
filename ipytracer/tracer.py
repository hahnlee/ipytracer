# -*- coding: UTF-8 -*-
# Copyright (c) Han Lee.
# Distributed under the terms of the Modified BSD License.
from IPython.core.display import display
from .model import *
from .view import *
import time


class Tracer(object):

    def __init__(self, data):
        self.data = data
        self.delay = 0.25
        self.tracer = TracerView(self.data)
        self._observers = []

    def __add__(self, other):
        self.data += other
        self.update_data()
        time.sleep(self.delay)

    def __getitem__(self, key):
        self.tracer.update_visited(key)
        time.sleep(self.delay)
        return self.data[key]

    def __len__(self):
        return len(self.data)

    def __setitem__(self, key, value):
        self.data[key] = value
        self.update_data()
        self.tracer.update_selected(key)
        time.sleep(self.delay)

    def append(self, value):
        self.data.append(value)
        self.data = list(self.data)

    def extend(self, L):
        self.data.extend(L)
        self.update_data()

    def insert(self, i, x):
        self.data.insert(i, x)
        self.update_data()

    def remove(self, x):
        self.data.remove(x)
        self.update_data()

    def pop(self, i):
        self.data.pop(i)
        self.update_data()

    def index(self, x):
        return self.data.index(x)

    def count(self, x):
        return self.data.count(x)

    def sort(self, key=None, reverse=False):
        self.data.sort(key=key, reverse=reverse)
        self.update_data()

    def reverse(self):
        self.data.reverse()
        self.update_data()

    def update_data(self):
        self.tracer.update_data(self.data)

    def tolist(self):
        return self.data

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
