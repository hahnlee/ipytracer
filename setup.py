from setuptools import (
    setup,
    Command
)
import os
import sys
import platform

here = os.path.dirname(os.path.abspath(__file__))
node_root = os.path.join(here, 'js')
is_repo = os.path.exists(os.path.join(here, '.git'))

npm_path = os.pathsep.join([
    os.path.join(node_root, 'node_modules', '.bin'),
    os.environ.get('PATH', os.defpath),
])


class NPM(Command):
    description = 'install package.json dependencies using npm'

    user_options = []

    node_modules = os.path.join(node_root, 'node_modules')

    targets = [
        os.path.join(here, 'tracer', 'static', 'extension.js'),
        os.path.join(here, 'tracer', 'static', 'index.js')
    ]


setup(
    name='tracer',

    # Versions should comply with PEP440.  For a discussion on single-sourcing
    # the version across setup.py and the project code, see
    # https://packaging.python.org/en/latest/single_source_version.html
    version='0.0.1',

    description='Algorithm Visualizer for Jupyter/IPython Notebook',

    # The project's main homepage.
    url='https://github.com/sn0wle0pard/tracer',

    author='Han Lee',
    author_email='dev.sn0wle0pard@gmail.com',

    license='MIT',

    # See https://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
        'Development Status :: 1 - Planning',

        'Topic :: Scientific/Engineering :: Visualization',
        'Topic :: Utilities',
        'Environment :: Web Environment',
        'Framework :: IPython',

        # Pick your license as you wish (should match "license" above)
        'License :: OSI Approved :: MIT License',

        # Specify the Python versions you support here. In particular, ensure
        # that you indicate whether you support Python 2, Python 3 or both.
        'Programming Language :: Python :: 3',
        'Programming Language :: JavaScript'
    ],

    keywords=["algorithm visualizer"],

    include_package_data=True,
    packages=['tracer'],

    install_requires=[
        'IPython',
    ],

    zip_safe=False,
)
