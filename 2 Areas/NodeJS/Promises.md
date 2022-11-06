Promises are objects that:
- take a function as argument; the function takes two arguments - `resolve` and `reject`
- the function holds the code to executed
- the function is executed asynchronously
- basically execute the code inside them asynchronously, and make the return value of the "inside-code" available for all to use.

## States of promises
- **Pending promise**: The code inside the promise has not been executed yet.
- **Resolved promise**: The code execution inside the promise has finished. There are two ways a promise can be marked as resolved:
	- **Fulfilled promise**: The code did not throw any error. It was successful. The return value of 
	- Rejected promise