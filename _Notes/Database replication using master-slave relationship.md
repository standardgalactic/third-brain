- Master database generally only supports write operations.
- A slave database gets copies of the data from the master database and only supports read operations
- The number of slave databases in a system is usually larger than the number of master databases since most applications require a much higher ratio of reads to writes.

> [!NOTE] The web server maintains the credentials for both the master and slave databases. It is responsible for routing write requests to master and read requests to slave

![Figure 5](master-slave-database.svg.svg)

## Advantages
### Better performance
- Allows more queries to be processed in parallel
	- Because of distribution of write and read responsibilities between master and slave

### Reliability
- Since data is replicated across multiple locations, data is still preserved even if one of the DB servers is destroyed by a natural disaster

### High availability
- Even if one of the DB servers is offline, you can access data stored in another DB server. This way your app is highly available.

## What happens when one DB server goes offline?
### When the slave DB goes offline
- All read operations are directed to the master DB temporarily
- In case of multiple slave databases, read operations are redirected to other healthy slave databases.

### When the master DB goes offline
- A slave DB will be promoted to be the new master
- A new slave DB will replace the old one


## Sources
- [[(Done) Scale From Zero To Millions Of Users by ByteByteGo]]

## Related Notes
- 