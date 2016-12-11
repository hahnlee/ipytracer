module.exports = function (wallaby) {
  return {
    files: [
      'lib/*.js',
      'lib/**/*.js',
      'test/helpers/*.js',
      'test/samples/*.js',
      'index.js'
    ],

    tests: [
      'test/*Spec.js'
    ],

    testFramework: 'mocha',

    env: {
      type: 'node',
      runner: 'node'
    }
  }
}
