# Constitute [![npm][npm-image]][npm-url] [![travis][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url]

[npm-image]: https://img.shields.io/npm/v/constitute.svg?style=flat
[npm-url]: https://npmjs.org/package/constitute
[travis-image]: https://travis-ci.org/justmoon/constitute.svg
[travis-url]: https://travis-ci.org/justmoon/constitute
[codecov-image]: http://codecov.io/github/justmoon/constitute/coverage.svg?branch=master
[codecov-url]: http://codecov.io/github/justmoon/constitute?branch=master

> Minimalistic Dependency Injection (DI) for ES6

## Why Dependency Injection?

There are lots of good resources out there on Dependency Injection (DI) and Inversion of Control (IoC). For JavaScript developers, [Vojta Jina's ng-conf presentation](https://www.youtube.com/watch?v=_OGGsf1ZXMs) is a fantastic primer.

For many smaller apps, using plain ol' Node.js modules works just fine. But eventually you want more control over when your components get instantiated. So you switch to classes and inject your dependencies via the constructor. But now you have annoying glue code like this to maintain:

``` js
function main () {
  const electricity = new Electricity()
  const grinder = new Grinder(electricity)
  const heater = new Heater(electricity)
  const pump = new Pump(heater, electricity)
  const coffeeMaker = new CoffeeMaker(grinder, pump, heater)
  coffeeMaker.brew()
}
```

Tools like `constitute` can turn that into:

``` js
function main () {
  const coffeeMaker = constitute(CoffeeMaker)
  coffeeMaker.brew()
}
```

Your classes remain easily testable and life is good.

## Why this library?

Awesome Dependency Injection frameworks are on the way for JavaScript. Like the one in [Angular 2](http://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html). But I wanted a module which is independent from any framework and works in ES5/ES6/ES7 with or without transpiling.

## Installation

``` sh
npm install --save constitute
```

## Usage

Let's look at an example. For this README I'm going to use ES6 modules syntax. If you need CommonJS (`require`) style, please look in `example/es6-cjs`.

Suppose we have three classes `A`, `B` and `C`. `A` depends on `B` and `C`. There are no other dependencies. We need to tell `constitute` that `A` depends on `B` and `C`. We also call the dependencies "constituents".

**a.js**
``` js
import B from './b'
import C from './c'

export default class A {
  static constitute () { return [ B, C ] }
  constructor (b, c) {
    this.b = b
    this.c = c
  }
}
```

If you are transpiling, you can also use an ES7-style decorator:

**a.js** *(alternative with ES7 decorator)*
```
import { Dependencies } from 'constitute'

@Dependencies(B, C)
export default class A {
  constructor (b, c) {
    this.b = b
    this.c = c
  }
}
```

The classes `B` and `C` are defined without any special sugar:

**b.js**
``` js
export default class B {}
```

**c.js**
``` js
export default class C {}
```

Because these classes do not have any dependencies, we don't need to annotate them.

So how do we instantiate our annotated class `A`?

**main.js**
``` js
import constitute from '../../'
import A from './a'

// Instantiate a class
// Calling constitute() creates a new dependency injection context
const a = constitute(A)

console.log(a.constructor.name) // => A
console.log(a.b.constructor.name) // => B
console.log(a.c.constructor.name) // => C

// Simple.
```

And that's all you need to know to get started. The rest of the documentation below is there when you need it.

### Resolvers

When requesting dependencies, you can modify what kind of value is provided by using a *resolver*.

```js
import { Lazy } from 'constitute'

class D {
  static constitute () { return [ Lazy.of(A) ] }
  constructor (getA) {
    this.getA = getA
  }
}
```

There are different types of resolvers:

* `Instance` - The default resolver. Resolves the dependency immediately and provides it as the value
* `Lazy` - Provides a function which resolves the dependency when called, returning the value
* `All` - Provides an array of values for all dependencies bound to the provided key (see *Binding* below)
* `Optional` - Injects a value only if the dependency already exists in the container; `undefined` otherwise

### Constitutors

You can also change how your dependencies are instantiated. There are three built-in policies:

* `Singleton` - The default. Your dependency is instantiated once per container.
* `Global` - Like a singleton, except the same instance is used even across containers. **Warning: Use of globals is generally discouraged. According to [some](http://www.ibm.com/developerworks/webservices/library/co-single/index.html), globals are ok for very specific use cases, such as loggers.**
* `Transient` - Your dependency is instantiated every time it is resolved.

To use a different constitutor, simply return it from the `constitute` method:

```js
import { Transient } from 'constitute'

class E {
  static constitute () { return Transient.with( [ A ] ) }
  constructor (a) {
    this.a = a
  }
}
```

### Binding

By default, classes resolve to a new instance of themselves. But what if we want to remap what they resolve to?

#### Binding for tests

Let's say we're testing and we to replace our `Database` service with a `MockDatabase` service. But first, here's our database service:

(In the interest of brevity, we'll skip imports for this example.)

**lib/database.js**
```js
class Database {
  static constitute () { return [ Config ] }
  constructor (config) {
    this.connection = config.get('db.uri')
  }
}
```

And our app itself:

**lib/app.js**
```js
class App {
  static constitute () { return [ Database ] }
  constructor (db) {
    this.db = db
  }
}
```

Here are our tests where we instantiate the app using a mock database:

**test/appSpec.js**
```js
describe('App', function () {
  beforeEach(function () {
    // Here is our mock database class
    class MockDatabase { ... }

    // First, let's get a fresh container
    this.container = new constitute.Container()

    // Then we tell it to bind the database to the mock database
    this.container.bind(Database, MockDatabase)

    // Finally we can instantiate the app
    this.app = this.container.constitute(App)

    // Simple.
  })

  // ...
})
```

The main difference you'll notice is that this time we used `new constitute.Container` and `Container#constitute()` instead of the short-hand `constitute()`. We also introduced the `Container#bind()` method, which takes a key as its first argument and a class or factory as its second argument.


### Factories

So far, we've only dealt with class dependencies. But classes (more specifically, class constructors) are actually just one type of factory in `constitute`.

* `Class(constructor, constitutor)` - This is the default factory. If you try to instantiate a non-factory value, `constitute` will try to wrap it in a `Class` factory. What this factory does is to try to gather the dependency and constitutor settings from a static method called `constitute`. The constitutor will resolve the dependencies and finally, the `Class` factory will call the constructor with the new keyword and the resolved dependencies as arguments.
* `Alias(key, constitutor)` - Links to another key on the same container. You can use `Alias` to specify another key and when it is asked to instantiate a value it will call that other factory instead.
* `Value(value)` - Doesn't instantiate anything, it simply returns the same value every time.
* `Clone(value, constitutor)` - Creates a clone of the provided value.
* `Method(fn, constitutor)` - Allows you to specify a custom factory function.

#### `Class` factory

Normally, you never need to worry about the `Class` factory. Any classes you pass to `constitute` will automatically be wrapped in `Class` factories.

However, manually creating a Class factory allows you to pass in a constitutor. That can be useful, if you don't want to add a `constitute` method on the class itself.

In other words, this:

``` js
class A {
  static constitute () { return [ B ] }
  constructor (b) { ... }
}

const a = constitute(A)
```

Is the same as this:

``` js
import constitute, { Class } from 'constitute'

class ActualA {
  constructor (b) { ... }
}
const A = new Class(ActualA, [ B ])

const a = constitute(A)
```

Just make sure when you specify your dependencies to reference this Class as `A`, not as `ActualA`. Although you could of course bind `ActualA` to `A`:

``` js
myContainer.bindClass(ActualA, A)
```

After that, both `A` and `ActualA` would resolve to your `Class` factory with the correct dependencies.

To add metadata to existing classes, you can also use the `container.bindClass` convenience wrapper:

``` js
import { Container } from 'constitute'

class A {
  constructor (b) { ... }
}

const container = new Container()
// Bind the key A to a ClassFactory for A with a Singleton constitutor and a single dependency, B
container.bindClass(A, A, [ B ])

const a = container.constitute(A)
```

#### `Alias` factory

The `Alias` factory can be used to cause a lookup for another key in the current container and use that key's factory instead. By default, `Alias` factories will use the `Transient` constitutor, meaning the alias mapping will be resolved every time the aliased key is requested. The alias target uses its own constitutor as normal, so the target may still be a cached instance.

``` js
class A {}
class B extends A {}

const container = new Container()
container.bindAlias(A, B)
const instance = container.constitute(A)

console.log(instance instanceof B) // => true

// Note that the alias respects any later bindings of the target Key
container.bindValue(B, 65537)
console.log(container.constitute(A)) // => 65537
```

#### `Value` factory

Possibly the most boring constructor. It always returns the same value. Because the value is static anyway it also doesn't need a constitutor. But you *can* still rebind it, alias it and so on.

``` js
import constitute, { Value, Container } from 'constitute'

const V = new Value(42)

class A {
  static constitute () { return [ V ] }
  constructor (v) {
    console.log('The answer is ' + v)
  }
}

class B extends A {}

constitute(A) // => The answer is 42

// Like all factories, Value factories support binding, so we can override the value later
const container = new Container()
container.bindValue(V, undefined)
container.constitute(B) // => The answer is undefined
```

#### `Clone` factory

Similar to the `Value` factory, but returns a clone of the value (for objects and arrays) instead of the value itself. Defaults to the `Transient` constitutor.

``` js
import constitute, { Clone, Container } from 'constitute'

const V = new Clone({ foo: 'bar' })

class A {
  static constitute () { return [ V ] }
  constructor (v) {
    this.v = v
  }
}

class B extends A {}

const a = constitute(A)
const b = constitute(B)

a.v.foo = 'baz'

console.log(a.v.foo) // => 'baz'
console.log(b.v.foo) // => 'bar'
```

#### `Method` factory

With `Method`, you can define your own factory function. Wield this power wisely.

Your factory function is called with the dependencies as the parameters and the container as `this`.

``` js
import { Method } from 'constitute'

class C { }

const B = new Method(function (c) {
  return { c }
}, [ C ])

export default class A {
  static constitute () { return [ B ] }
  constructor (b) {
    this.b = b
  }
}

console.log(constitute(A).b.c instanceof C) // => true
```

### Containers

All instances (except for dependencies using the `Global` constitutor) are isolated within `Container`s. To get the container your instance lives in, just request `Container` as a dependency:

``` js
import { Container } from 'constitute'

class A {
  static constitute () { return [ Container ] }
  constructor (container) {
    // container is the current container context
  }
}
```

#### Container hierarchy

You can create subcontainers to override dependencies locally without affecting upstream bindings.

``` js
import { Container } from 'constitute'

const masterContainer = new Container()
const subContainer = masterContainer.createChild()

class A {}
class B {}

subContainer.bindClass(A, B)

console.log(subContainer.constitute(A) instanceof B) // => true
console.log(masterContainer.constitute(A) instanceof A) // => true
```

Subcontainers also use an inheritance-aware cache. If a class has already been instantiated on the parent (and it is using a per-container caching constitutor, such as Singleton) it will be returned from cache.

``` js
import { Container } from 'constitute'

class A {}

const masterContainer = new Container()
const subContainer = masterContainer.createChild()

const a1 = masterContainer.constitute(A)
const a2 = subContainer.constitute(A)

console.log(a1 === a2) // => true
```

If a class has already been instantiated in the subcontainer, the subcontainer will continue to use that cached instance even if the parent container later creates an instance of its own.

### Post-constructors

Suppose you have two classes that depend on each other—a circular dependency. Constitute has to instantiate A before B and B before A which is impossible. You can resolve the situation using a post-constructor:

``` js
class A {
  static constitute () { return [ Container ] }
  constructor (container) {
    // Assigning b in a post-constructor allows both objects to be constructed
    // first, resolving the cyclic dependency.
    //
    // Note that the post-constructor still runs synchronously, before this
    // object is returned to any third-party consumers.
    container.schedulePostConstructor(function (b) {
      this.b = b
    }, [ B ])
  }
}

class B {
  static constitute () { return [ A ] }
  constructor (a) {
    this.a = a
  }
}
```

When keeping your classes in separate files, you need to also watch out for circular `require`s.

An easy solution is to put your `require` directly before `schedulePostConstructor`:

**a.js**
``` js
class A {
  static constitute () { return [ Container ] }
  constructor (container) {
    const B = require('./b')
    container.schedulePostConstructor(function (b) {
      this.b = b
    }, [ B ])
  }
}
```

**b.js**
``` js
const A = require('./a')
class B {
  static constitute () { return [ A ] }
  constructor (a) {
    this.a = a
  }
}
```


## Acknowledgements

This library borrows heavily from the fantastic [DI component](https://github.com/aurelia/dependency-injection) in the [Aurelia framework](http://aurelia.io/). Awesome stuff.

Further inspiration comes from the [DI features](http://blog.thoughtram.io/angular/2015/05/18/dependency-injection-in-angular-2.html) in [Angular 2](https://angularjs.org/).
