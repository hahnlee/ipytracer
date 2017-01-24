# -*- coding: UTF-8 -*-
# Copyright (c) Han Lee.
# Copyright (c) Jupyter Development Team.
# Distributed under the terms of the Modified BSD License.

"""
    ipytracer
    ~~~~~~~~~

    Algorithm visualizer for Jupyter/IPython Notebook.

    :copyright: (c) 2015-2017 by Han Lee (sn0wle0pard).
    :license: BSD.
"""

from .tracer import *
from ._version import __version__

__author__ = 'Han Lee (sn0wle0pard)'
__version__ = __version__
__copyright__ = 'Copyright (c) 2016 Han Lee'
__license__ = 'BSD'


def _jupyter_nbextension_paths():
    """
    Jupyter Extension points
    see also
    http://jupyter-notebook.rtfd.io/en/latest/examples/Notebook/Distributing Jupyter Extensions as Python Packages.html
    :return: information of notebook extension paths
    """
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'ipytracer',
        'require': 'ipytracer/extension'
    }]

