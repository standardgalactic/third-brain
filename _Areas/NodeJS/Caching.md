- Modules are cached
- If same module is required multiple times, the code is executed only in the first time. Next times, the cached value is fetched

## Example code

```js
// test-module-3.js
console.log('hello from module 3')

module.exports = () => console.log("logging some text 😍");
```

```js
// modules.js
console.log("learning caching")
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
```

```bash
node modules.js

=> learning caching
hello from module 3
logging some text 😍
logging some text 😍
logging some text 😍
```

- As one can easily see, the text `learning caching` is outputted only once, even though the module is required thrice.