'use strict'

const Util = exports

exports.convertSetToArray = function (set) {
  const arr = []
  for (let v of set) {
    arr.push(v)
  }
  return arr
}

exports.isClass = function (candidate) {
  return typeof candidate === 'function' && /^\s*class\s+/.test(candidate.toString())
}

exports.printPrettyKey = function (key) {
  switch (typeof key) {
    case 'function':
      return key.name || (Util.isClass(key) ? '[anonymous class]' : '[anonymous fn]')
    case 'object':
      return key === null ? '[null]' : '{}'
    case 'boolean':
      return '[' + key + ']'
    default:
      return key.toString()
  }
}
