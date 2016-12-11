'use strict'

const constitute = require('../../')
const A = require('./a')

// Instantiate a class
// Calling constitute() creates a new dependency injection context
const a = constitute(A)

console.log(a.constructor.name) // --> A
console.log(a.b.constructor.name) // --> B
console.log(a.c.constructor.name) // --> C

// Simple.
