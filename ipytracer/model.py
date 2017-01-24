# -*- coding: UTF-8 -*-
# Copyright (c) Han Lee.
# Distributed under the terms of the Modified BSD License.
from IPython.core.display import display, HTML


class ListElement(object):
    data = []

    def __init__(self, data, base_id, row):
        self.base_id = base_id
        self.row = row
        if isinstance(data, list):
            self.data = data
        else:
            self.data.append(data)

    def __len__(self):
        return len(self.data)

    def get_val(self, item):
        return self.data[item]

    def __getitem__(self, item):
        # NOTE
        # FIXME apply index range, and clear_output
        js = '<script>document.getElementById("%d-%d-%d").style.background = "red"; </script>' % (
            self.base_id,
            self.row,
            item
        )
        display(HTML(js))
        return self.data[item]
