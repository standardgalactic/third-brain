# `async`
`async` is a function decorator which indicates that a function should be run asynchronously. Decorating  a function with `async` will lead to the function returning a promise

## Example code

```js
async function foo() {
	return "Hello"
}
```
> is the same as
```js
function foo() {
	return Promise.resolve("Hello")
}
```

### Using the "async" function - Same as using promise
```js
foo().then(val =>
	console.log(val)
)

//=> Hello
```

## How to throw an error?
- We can use the `throw` function.

### Example code
```js
async function foo() {
	.
	.
	// Some error happened
	throw(error)
}
```

# `await`
- `await` keyword can only be used inside an `async` function. It pauses the function execution and waits for the promise to resolve
- When the code encounters the `await` keyword, it just pauses and waits for the promise (to which `await` has been prefixed) to resolve
- The statement, then, returns the resolved value of the promise
## Usage
```js
const value = await promise;
```