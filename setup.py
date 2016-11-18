import os
try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup


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

    zip_safe=True,
)
