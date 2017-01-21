# ipytracer
[![Build Status](https://travis-ci.org/sn0wle0pard/tracer.py.svg?branch=master)](https://travis-ci.org/sn0wle0pard/tracer.py)
![license](https://anaconda.org/sn0wle0pard/tracer.py/badges/license.svg)
![pypi](https://anaconda.org/sn0wle0pard/tracer.py/badges/installer/pypi.svg)
![anaconda](https://anaconda.org/sn0wle0pard/tracer.py/badges/version.svg)

Algorithm Visualizer for Jupyter/IPython Notebook.

It was inspired by parkjs814's [AlgorithmVisualizer](https://github.com/parkjs814/AlgorithmVisualizer).

You can see how your Python code works.

If you use the `display(TracerObject)` code from where you want to see, you can use it without any special modification.

Supports built-in list methods.

# Development Status
Pre-Alpha

# Todo
- Add more tracer api
- Support non-built-in data type in python

# Installation
Requirement
- Jupyter/IPython Notebook

To install use pip:
```console
$ pip install ipytracer
$ jupyter nbextension enable --py --sys-prefix ipytracer
```

For a development installation (requires npm),
```console
$ git clone https://github.com/sn0wle0pard/ipytracer.git
$ cd ipytracer
$ pip install -e .
$ jupyter nbextension install --py --symlink --sys-prefix ipytracer
$ jupyter nbextension enable --py --sys-prefix ipytracer
```
# Demo
## Youtube Video
[![Alt text](https://img.youtube.com/vi/vZQJ0Y3GtIs/0.jpg)](https://www.youtube.com/watch?v=vZQJ0Y3GtIs)

https://youtu.be/vZQJ0Y3GtIs

## images

![BubbleSortInfo](src/bubble_info.png)

![BubbleSortCode](src/bubble_code.png)

![BubbleSortWork](src/bubble.gif)

You can see [here](https://github.com/sn0wle0pard/tracer/tree/master/example)

ThirdParty Libraries
-----
* Chart.js - https://ipython.org
* Ipython - https://ipython.org
* ipywidgets - https://ipywidgets.readthedocs.io
* Jupyter notebook extensions - http://jupyter-contrib-nbextensions.readthedocs.io
* Underscore - http://underscorejs.org
* Webpack - https://webpack.github.io


Author
------

Han Lee / [@sn0wle0pard](https://github.com/sn0wle0pard)

License
-------
```
MIT License

Copyright (c) 2016 Han Lee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
