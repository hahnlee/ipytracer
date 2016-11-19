import time
from IPython.core.display import (
    display,
    HTML,
)
from IPython.display import clear_output
from .model import ListElement


class Tracer(object):
    def __init__(self, data, delay=0.25):
        self.data = data
        self.delay = delay
        self.is_show = False

    def __len__(self):
        return len(self.data)

    def __add__(self, value):
        self.data += value
        if self.is_show:
            display(HTML('<p>%s</p>' % str(self.data)))

    def __setitem__(self, key, value):
        if self.is_show:
            html = '<table><tr>'
            for _index, _value in enumerate(self.data):
                if _index == key:
                    html += '<td style="background: blue; color: white">%s</td>' % str(value)
                else:
                    html += '<td>%s</td>' % str(_value)
            html += '</tr></table>'
            display(HTML(html))
            time.sleep(self.delay)
            clear_output(wait=True)
        self.data[key] = value

    def __getitem__(self, key):
        if self.is_show:
            html = '<table><tr>'
            for _index, _value in enumerate(self.data):
                if _index == key:
                    html += '<td style="background: red;color: white">%s</td>' % str(_value)
                else:
                    html += '<td>%s</td>' % str(_value)
            display(HTML(html))
            time.sleep(self.delay)
            clear_output(wait=True)
        return self.data[key]

    def set_show(self, is_show, delay=0.25):
        self.is_show = is_show
        self.delay = delay


class ChartTracer(object):
    def __init__(self, data, delay=0.25):
        self.data = data
        self.delay = delay
        self.is_show = False

    def __len__(self):
        return len(self.data)

    def __setitem__(self, key, value):
        if self.is_show:
            html = '<div style="display: table;">'
            for _index, _value in enumerate(self.data):
                if _index == key:
                    html += '<div style="display: table-cell; vertical-align: bottom;"><div style="width: 20px; height: %s0px; background: blue">%s</div></div>' % (
                    str(value), str(value))
                else:
                    html += '<div style="display: table-cell; vertical-align: bottom;"><div style="width: 20px; height: %s0px; background: gray">%s</div></div>' % (
                    str(_value), str(_value))
            html += '</div>'
            display(HTML(html))
            time.sleep(self.delay)
            clear_output(wait=True)
        self.data[key] = value

    def __getitem__(self, key):
        if self.is_show:
            html = '<div style="display: table">'
            for _index, _value in enumerate(self.data):
                if _index == key:
                    html += '<div style="display: table-cell; vertical-align: bottom;"><div style="width: 20px; height: %s0px; background: red">%s</div></div>' % (
                    str(_value), str(_value))
                else:
                    html += '<div style="display: table-cell; vertical-align: bottom;"><div style="width: 20px; height: %s0px; background: gray">%s</div></div>' % (
                    str(_value), str(_value))
            html += '</div>'
            display(HTML(html))
            time.sleep(self.delay)
            clear_output(wait=True)
        return self.data[key]

    def set_show(self, is_show, delay=0.25):
        self.is_show = is_show
        self.delay = delay


class Tracer2DList(object):
    data = []

    def __init__(self, data):
        self.base_id = id(data)
        self.data = [ListElement(_val, self.base_id, _i) for _i, _val in enumerate(data)]
        self.is_show = False
        self.delay = 0.25

    def __len__(self):
        return len(self.data)

    def __getitem__(self, item):
        if self.is_show:
            html = '<table>'
            for _i, _value in enumerate(self.data):
                html += '<tr>'
                for _index in range(len(_value)):
                    html += '<td id="%d-%d-%d">%s</td>' % (self.base_id, _i, _index, str(_value.get_val(_index)))
                html += '</tr>'
            html += '</table>'
            display(HTML(html))
            time.sleep(self.delay)
        return self.data[item]

    def set_show(self, is_show, delay=0.25):
        self.is_show = is_show
        self.delay = delay
