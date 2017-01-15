# tracer
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

# Installation
Requirement
- Jupyter/IPython Notebook

To install use pip:
```console
$ pip install tracer.py
$ jupyter nbextension enable --py --sys-prefix tracer
```

Or:
```
$ pip install -i https://pypi.anaconda.org/sn0wle0pard/simple tracer.py
$ jupyter nbextension enable --py --sys-prefix tracer
```

For a development installation (requires npm),
```console
$ git clone https://github.com/sn0wle0pard/tracer.py.git
$ cd tracer.py
$ pip install -e .
$ jupyter nbextension install --py --symlink --sys-prefix tracer
$ jupyter nbextension enable --py --sys-prefix tracer
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
