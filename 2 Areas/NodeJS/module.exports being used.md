## Module
```js
// test-module-1.js

module.exports = class {
  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }
}
```
Alternative way to define this module:

```js
// test-module-1.js

class Calculator {
  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }
}

module.exports = Calculator;
```

## index.js

```js
const C = require('./test-module-1')
const calc1 = new C();
console.log(calc1.add(2, 5))
```