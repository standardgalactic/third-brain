![[Pasted image 20221017125021.png]]
- NodeJS primarily runs in a single thread, which means that the instructions are executed one-by-one
- Event loop runs in the single thread
- All heavy tasks are automatically offloaded by the event loop to the thread pool

## Thread pool
- Consists of many threads, typically 4 threads
- Can be expanded upto 128 threads
- Takes on heavier tasks like accessing file systems, compression, etc.

## Sources

## Keywords
