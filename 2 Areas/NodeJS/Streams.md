- Read and write data piece by piece or chunks
- No need to wait for the whole data to arrive
- Read part of a data; process that data; free up the memory; Repeat with next chunk
- Instances of the `EventEmitter` class
- Apart from the 4 streams provided by NodeJS, we can always create our own stream
## Advantages
- Perfect for handling large volumes of data
- More memory efficient and time efficient
## Types of streams in NodeJS
- Readable streams
	- From which we can read data
	- Examples: `http` requests, `fs` (filesystem) read streams
	- Important events:
		- `data`: Emitted when new piece of data is available to consume
		- `end`: No more data to consume
	- Important functions:
		- `pipe()`: Allows us to plug streams together
		- `read()`
- Writable streams
	- To which we can write data
	- Important events:
		- `drain`
		- `finish`
	- Important functions:
		- `write()`
		- `end()`
- Duplex streams
	- Both readable and writable
	- Example: `net` web socket
- Transform streams
	- Duplex streams that transform data as it is written or read
	- Example: `zlib` Gzip creation

## Sources

## Keywords
