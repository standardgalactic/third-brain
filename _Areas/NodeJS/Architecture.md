## Node runtime primary dependencies
1. V8 engine - Converts javascript code into machine code
	1. Written in C++ and Javascript
2. `libuv` 
	1. Open Source library
	2. Focus on asynchronous I/O - Gives access to operating system, file system, network, etc.
	3. Implements
		1. Event loop - Responsible for handling easy tasks like executing callbacks and network IO 
		2. Thread pool - For heavy use like file access or compression
	4. Written in C++

## Other dependencies
- `http-parser` : Parsing HTTP
- `c-ares`: DNS requests
- `OpenSSL`: Cryptography
- `zlib`: Compression

## Sources

## Keywords
