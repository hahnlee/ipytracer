# Simulate Event

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][downloads-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

> Simply trigger DOM events on any element.

## Installation

```shell
npm install simulate-event --save-dev
```

## Usage

```javascript
// Simulate an event on an element
simulateEvent.simulate(document.body, 'click');

// Generate an event for custom use
var evt = simulateEvent.generate('click', { clientX: 10 });
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/simulate-event.svg?style=flat
[npm-url]: https://npmjs.org/package/simulate-event
[downloads-image]: https://img.shields.io/npm/dm/simulate-event.svg?style=flat
[downloads-url]: https://npmjs.org/package/simulate-event
[travis-image]: https://img.shields.io/travis/blakeembrey/simulate-event.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/simulate-event
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/simulate-event.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/simulate-event?branch=master
