- Modules are cached
- If same module is required multiple times, the code is executed only in the first time. Next times, the cached value is fetched

## Example code

```js
// test-module-3.js
console.log('hello from module 3')

module.exports = () => console.log("logging some text 😍");
```

```js
//Caching
console.log("learning caching")
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
```