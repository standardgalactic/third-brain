Promises are objects that:
- take a function as argument; the function takes two arguments - `resolve` and `reject`
	- It is the function's duty to call the `resolve` function once the function has successfully executed. `resolve` can take one argument which is generally the data that the function wants to make available to the outside world
	- It is also the function's duty to call the `reject` function in case of an error. This function also takes one argument which generally is the error object.
- the function holds the code to executed
- the function is executed asynchronously
- Once the `resolve` or `reject` function is called, the promise is marked as **resolved** *(See below👇🏽 )*

## Demo using code

### Defining the promise
```js
// Promisifying the readFile function

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
			// In case of error, reject is called
      if (err) reject(err);
			// Everything went well -> make data available to the world
      resolve(data);
    });
  });
};
```

### Using the above promise

```js
readFilePromise("some-file.txt")
	.then(data => {
		console.log(data)
	})
	.catch(err => {
		console.log(err)	
	})
```

## Using `then` and `catch`

[This documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) is a better place to read more about them

## States of promises
- **Pending promise**: The code inside the promise has not been executed yet.
- **Resolved promise**: The code execution inside the promise has finished. There are two ways a promise can be marked as resolved:
	- **Fulfilled promise**: The code did not throw any error. It was successful. The return value of 
	- **Rejected promise**: The code threw an error. The return value contains the error object