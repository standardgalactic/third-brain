## Why do we even need consistent hashing?
- [[Trivial method of distributing data|Read about it here]]
- Consistent hashing mitigates the problem

## How does consistent hashing work?
[[Basic working of consistent hashing]]

![Demonstrating the key to server mapping](Assets/Demonstrating_the_key_to_server_mapping.svg)

## Impact of re-sizing the server pool
- When the server pool is re-sized, only $\frac{k}{n}$ keys need to be remapped on average, where $k$ is the number of keys, and $n$ is the number of slots (servers)

### Impact of adding a server
- Assume that a new server `server 4` is added, only `key 0` will require redistribution.

![Adding server 4](Assets/Adding_server_4_to_consistent_hashing.svg)

### Impact of removing a server
- Assume that `server 1` is removed, then `key 1` must be remapped to `server 2`. Rest of the keys are unaffected.

![[Pasted image 20230610174058.png|Removing server 1]]


## Problems with consistent hashing
[[Problems with consistent hashing]] - non-uniform key and server distribution

### Solution 
[[Virtual nodes in consistent hashing]]

## Benefits of using consistent hashing
- Minimal data redistribution when server pool is re-sized, as demonstrated by [[#Impact of re-sizing the server pool|adding and removing servers]]
- Mitigates hotspot (celebrity) problem by distributing data more evenly.

## Related Notes
- 

## Sources
- [[(Done) Design Consistent Hashing - BytebyteGo - Highlights]]