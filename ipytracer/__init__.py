# -*- coding: UTF-8 -*-
#  Created by sn0wle0pard

"""
    ipytracer
    ~~~~~~~~~

    Algorithm visualizer for Jupyter/IPython Notebook.

    :copyright: (c) 2015-2017 by Han Lee (sn0wle0pard).
    :license: MIT.
"""


from ._version import __version__

from .tracer import *

__author__ = 'Han Lee (@sn0wle0pard)'
__version__ = __version__
__copyright__ = 'Copyright (c) 2016 Han Lee'
__license__ = 'MIT'


def _jupyter_nbextension_paths():
    return [{
        'section': 'notebook',
        'src': 'static',
        'dest': 'ipytracer',
        'require': 'ipytracer/extension'
    }]

