## Module

```js
// test-module-2.js

exports.add = (a, b) => a + b;

exports.multiply = (a, b) => a * b;
```

## index.js

```js
const { add, multiply } = require('./test-module-2')
console.log(add(6,7))

// => 13
```