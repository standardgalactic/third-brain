- Temporary data store that is much faster than the database
- Benefits like:
	- Better system performance
	- Reduce database workloads
	- Scale the cache independently
- Stored in volatile memory. So, it is not ideal for persisting data
- Used mainly when data is read frequently, but modified infrequently

## Expiration policy
- Good practice to implement an expiration policy
- Once cached data is expired, it is removed from the cache

## Consistency
- This involves keeping the data store (database) and the cache in sync
- When scaling across multiple regions, maintaining consistency can be a challenge

## Eviction policy
- Once the cache is full, any requests to add items to the cache might cause existing items to be removed. This is called **cache eviction**

### Types of cache eviction policies
- Least recently used(LRU)
- Least frequently used (LFU)
- First in First Out (FIFO)

## Mitigating [[Single point of failure]]
- A single cache server represents a potential [[Single point of failure|single point of failure]]
- So, multiple cache servers across different data centers is the recommended way
	- Another recommended way is to overprovision the required memory by certain percentages.
	- This provides a buffer as the memory usage increases

## Cache strategies
- [[Read-through cache]]

## Sources
- [[(Done) Scale From Zero To Millions Of Users by ByteByteGo]]

## Related Notes
- 