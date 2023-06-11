## How does the trivial method of distributing data work
- Assume that there are $n$ cache servers
- Calculate the `serverIndex` using the formula: `hash(key) % N` 

![](Assets/Modulo_hashing_of_data.svg)

## Problems faced by the trivial method of distributing data
-  This method works fine when the server pool is fixed, and the data distribution is even.
- Causes problems when servers are added/removed. *The result of the modular operation will change, giving a different serverIndex*
	- Most keys have to be redistributed when a server is added or removed, not just the affected/added server.
	- This can cause a huge number cache misses.

## Related Notes
- 

## Sources
- [[(Done) Design Consistent Hashing - BytebyteGo - Highlights]]