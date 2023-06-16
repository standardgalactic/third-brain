## Requirements
- Size of a key-value pair is small - less than 10 KB
- Ability to store big data
- High availability - System responds quickly, even during failures
- High scalability - System can be scaled to support large data
- Automatic scaling - Addition/Deletion of servers should be automatic based on traffic
- Tunable consistency
- Low latency

> [!note] We will designing an [[CAP Theorem|AP system]]

## Partitioning of data
- To store big data, we will need to partition the data into smaller partitions and store them in multiple servers
- [[Consistent hashing]] can be used to partition the data as it provides these benefits:
	- Evenly distribute data
	- Minimize data movement when nodes are added/removed
	- [[Virtual nodes in consistent hashing|Virtual nodes]] can be used to ensure heterogeneity. Servers with higher capacity can be assigned more virtual nodes

## Ensuring high availability and reliability

> [!info] Assuming that we are using [[Consistent hashing|consistent hashing]]

- To ensure high availability and reliability, data needs to be replicated across $N$ servers, where $N$ is a configurable parameter.
- We can [[Replicating data on the hash ring|replicate data easily on the hash ring]] across $N$ nodes

## Taking care of consistency
- Since data is now replicated across $N$ nodes, it must be synchronized across all replicas to ensure high consistency.
- We can use a technique called [[Using Quorum Consensus to get consistency|Using Quorum Consensus to get consistency]] to guarantee consistency for both read and write operations
- In this example, we will be trying to achieve [[Models of consistency|eventual consistency]]

## Resolving conflicts/inconsistencies
- Replication gives high availability but causes inconsistencies among replicas
- We will use [[Resolving inconsistencies using versioning and vector clocks|versioning and vector clocks]] to detect and resolve inconsistencies

## Related Notes
- [[Scaling a web app]] 
- [[Consistent hashing]]
- [[Virtual nodes in consistent hashing]]
- [[Meaning of availability in distributed systems]]
- [[Replicating data on the hash ring]]

## Sources
- [[(Done) Design A Key-value Store - Highlights]]