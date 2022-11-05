## Module

```js
// test-module-2.js
exports.add = (a, b) => a + b;

exports.multiply = (a, b) => a * b;
```

## index.js

```js
const calc2 = require('./test-module-2')
console.log(calc2.add(2, 9))
```
