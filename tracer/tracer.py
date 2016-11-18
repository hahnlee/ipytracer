from IPython.core.display import display, HTML
from IPython.display import clear_output


class Tracer(object):

    def __init__(self, data):
        self.data = data
        self.is_show = False

    def __len__(self):
        return len(self.data)

    def __add__(self, value):
        self.data += value
        if self.is_show:
            display(HTML('<p>%s</p>'%str(self.data)))

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
            clear_output(wait=True)
        return self.data[key]

    def show(self):
        self.is_show = True

    def hide(self):
        self.is_show = False


class ChartTracer(object):

    def __init__(self, data):
        self.data = data
        self.is_show = False

    def __len__(self):
        return len(self.data)

    def __setitem__(self, key, value):
        if self.is_show:
            html = '<div style="display: table;">'
            for _index, _value in enumerate(self.data):
                if _index == key:
                    html += '<div style="display: table-cell; vertical-align: bottom;"><div style="width: 20px; height: %s0px; background: blue">%s</div></div>' % (str(value), str(value))
                else:
                    html += '<div style="display: table-cell; vertical-align: bottom;"><div style="width: 20px; height: %s0px; background: gray">%s</div></div>' % (str(_value), str(_value))
            html += '</div>'
            display(HTML(html))
            clear_output(wait=True)
        self.data[key] = value

    def __getitem__(self, key):
        if self.is_show:
            html = '<div style="display: table">'
            for _index, _value in enumerate(self.data):
                if _index == key:
                    html += '<div style="display: table-cell; vertical-align: bottom;"><div style="width: 20px; height: %s0px; background: red">%s</div></div>' % (str(_value), str(_value))
                else:
                    html += '<div style="display: table-cell; vertical-align: bottom;"><div style="width: 20px; height: %s0px; background: gray">%s</div></div>' % (str(_value), str(_value))
            html += '</div>'
            display(HTML(html))
            clear_output(wait=True)
        return self.data[key]

    def show(self):
        self.is_show = True

    def hide(self):
        self.is_show = False
