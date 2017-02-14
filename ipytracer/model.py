# -*- coding: UTF-8 -*-
# Copyright (c) Han Lee.
# Distributed under the terms of the Modified BSD License.


class List2D(list):

    observer = None

    def set_observer(self, observer):
        self.observer = observer

    def __getitem__(self, item):
        if self.observer is not None:
            self.observer.update_visited_col(item)
        return list.__getitem__(self, item)

    def __setitem__(self, key, value):
        list.__setitem__(self, key, value)
        if self.observer is not None:
            self.observer.update_selected_col(key)