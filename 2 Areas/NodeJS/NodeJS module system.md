- Each Javascript file is treated as a separate module
- Modules have to be exported using `exports`
- ES module system is used in browsers: `import`/`export`
## What happens when we require a module?
### Path to the required module is resolved and file is loaded. ![[Pasted image 20221020163909.png]]
### Wrapping
- Module's code is wrapped into a special function
- NodeJS takes the code of the module and puts it inside the immediately invoked function expression (IIFE), which looks like this: ![[Pasted image 20221020170010.png]]
- So, node does not directly execute the code of a file, but the above wrapper function
- The function also has `require`, `module`, etc. as arguments. This is why we have access to these functions in every file
- This helps to give each module its own private scope
### Execution
- Code of the module in the wrapping function is executed
### Module exports are returned ![[Pasted image 20221020170930.png]]
- Example of multiple objects being exported: ![[Example module code]]
### Caching
- Modules are cached
- If same module is required multiple times, the code is executed only in the first time. Next times, the cached value is fetched

