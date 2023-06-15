- CA (Consistent and Available) key-value systems cannot exist in real world applications. Why?
	- Network failure is unavoidable, so a distributed system must tolerate network partition.
	- Thus, a system that sacrifices partition tolerance cannot exist in the real world

- Demonstrating CP and AP systems
	- Assume a key-value store with three nodes - $n_{1}$, $n_{2}$ and $n_{3}$
	- In the ideal world, network partition never occurs. Data written to $n_{1}$ is automatically replicated to $n_{2}$ and $n_{3}$ . Both consistency and availability are achieved (complete CAP system)
	- Assume that a partition occurs and $n_{3}$ goes down and cannot communicate with $n_{1}$ and $n_{2}$.
	- In a AP system which values availability over consistency, we would have stale data and the system will continue to accept read requests
		- Data written to $n_{3}$ will not propagate to $n_{1}$ and $n_{2}$
		- Data written to $n_{1}$ or $n_{2}$ will not propagate to $n_{3}$
	- If we choose a CP system, which values consistency over availability, we must block all write operations to $n_{1}$ and $n_{2}$ to avoid data inconsistency among these 3 servers.
		- Perhaps, this is the reason that bank systems are often down - because they cannot afford inconsistent data.

- To store big data, we will need to partition the data into smaller partitions and store them in multiple servers
	- Consistent hashing can be used to partition the data as it provides these benefits:
		- Evenly distribute data
		- Minimize data movement when nodes are added/removed
		- Virtual nodes can be used to ensure heterogeneity. Servers with higher capacity can be assigned more virtual nodes

- To ensure high availability and reliability, data needs to be replicated across $N$ servers, where $N$ is a configurable parameter.
	- After a key is mapped on the hash ring, the first $N$ servers that lie on the clockwise direction of the key store copies of the data ![[Pasted image 20230614123558.png|N=3]]
		- With virtual nodes, the first $N$ nodes on the ring may be owned by fewer than $N$ actual servers. So, we can choose to only choose unique servers while performing this replication
		- We can also take care to place replicas in distinct data centers to avoid single point of failure (by placing all replicas in a single data center)

- Since data is now replicated across $N$ nodes, it must be synchronized across all replicas to ensure high consistency.
	- We can use a technique called Quorum Consensus to guarantee consistency for both read and write operations
		- In this technique, the system's nodes work together to process and store data, and decisions are made based on the agreement of a majority of these nodes
	- Making the following assumptions:
		- $N$ - Number of replicas
		- $W$ - Write quorum. For a write operation to be considered as successful, write operation must be acknowledged from $W$ replicas.
		- $R$ - Read quorum. A read operation is considered successful if atleast $R$ replicas respond to the read request.
	- In the following figure, if $W = 1$, it means that the coordinator must receive at least one acknowledgement for the write operation to be considered as successful. ![[Pasted image 20230614124802.png|ACK=acknowledgement. Coordinator acts as proxy between the client and the nodes]]
	- The configuration of $W$, $R$ and $N$ determines the tradeoff between consistency and latency. For instance, if $W = 1$ or $R = 1$, the operation is performed quickly since the coordinator only needs to wait for a response from only one of the replicas, but the consistency of the system will take a hit.
	- If $W = 1$ and $R = N$, the system is optimized for a fast write
	- If $R = 1$ and $W = N$, the system is optimized for a fast read
	- If $W +R>N$, strong consistency is guaranteed because there must be at least one overlapping node that has the latest data to ensure consistency
	- If $W + R \leq N$, strong consistency is not guaranteed

- There are various consistency models that a system may choose to adopt
	- Strong consistency
		- Any read operation always returns the most recent data item.
		- Client never sees stale data
		- Usually achieved by forcing a replica not to accept new reads/writes until replica has agreed on latest write
	- Weak consistency
		- Read operations may not see the most updated value
	- Eventual consistency
		- Specific form of weak consistency
		- All updates are propagated with time. Eventually, all replicas get the same value (the most recent data)
		- When concurrent (parallel) writes happen, the system allows the inconsistent values to enter the system and eventually reconciles the nodes to consistent values
		- Examples: Dynamo, Cassandra

- Resolving inconsistencies using versioning
	- Replication gives high availability but causes inconsistencies among replicas
	- Versioning
		- Means treating each data modification as a new immutable version of data
		- Assume that there are two nodes $n_{1}$ and $n_{2}$ that hold the same data: `name: "John"`. ![[Pasted image 20230614130758.png|Both servers get the same value when reading the name]]
			- Next, $\text{server 1}$ changes the name to "JohnSanFrancisco" and $\text{server 2}$ changes the name to "JohnNewYork" at the same time. ![[Pasted image 20230614130958.png]]
			- Vector clocks are commonly used to resolve such conflicts
				- Vector clock is a `[server, version]` pair associated with a data item.
				- It can be used to check if one version precedes, succeeds or conflicts with other data.
				- It can be represented in the form of $D([s_{1}, v_{1}], [s_{2}, v_{2}], \dots , [s_{n}, v_{n}])$, where $D$ is the data item (key-value pair), $v_{i}$ is the version counter and $s_{i}$ is the server number
				- When a data item, $D$, is written to server $s_{i}$, one of the following things happen:
					- Increment $v_{i}$ if $[s_{i}, v_{i}]$ exists
					- Else, create a new entry $[s_{i}, 1]$ - '$1$' being the first time version number

- Example of conflict resolution using vector clocks ![[Pasted image 20230614131654.png]]
	- Here, when the client reads $\text{D3}$ and $\text{D4}$, it will discover a conflict (caused by $\text{D2}$ being modified by $s_{y}$ and $s_{z}$). The conflict is resolved by client and updated data is sent to the server. Assuming that the write is handled by $s_{x}$, we end up with $\text{D5}$

- Detecting conflicts
	- We can tell that a version X is an ancestor (no conflict) of version Y if the version counters of each participant in the vectors clock of Y is greater than or equal to the ones in version X.
		- Example: $D([s_{0}, 1], [s_{1}, 1])$ is an ancestor of $D([s_{0}, 1], [s_{1}, 2])$
	- Version X is a sibling (conflict exists) of version Y if there is any participant in Y's version clock who has a counter that is less than its corresponding counter in X
		- Example: $D([s_{0}, 1], [s_{1}, 2])$ and $D([s_{0}, 2], [s_{1}, 1])$ have a conflict

- Drawbacks of vector clocks
	- Adds complexity to the client because it needs to implement conflict resolution logic
	- The $[\text{server}, \text{version}]$ pairs in the vector clock could grow rapidly.
		- To fix this, we can set a threshold for the number of pairs we want to hold. The oldest pairs are removed as the limit is exceeded.
		- This may lead to inefficiencies in reconciliation because the descendant relationship cannot be determined accurately. However, based on this [research paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) published by Amazon on Dynamo, Amazon has not yet encountered this problem in production.

- Handling failures
	- In a distributed system, we cannot believe that a server is down just because another server says so.
	- Better solution is to use decentralized failure detection methods like **gossip protocol**.
		- Each node maintains a node membership list, which contains member IDs and heartbeat counters.
		- Each node periodically increments its heartbeat counter
		- Each node periodically sends heartbeats to a set of random nodes, which in turn propagate to another set of nodes
		- Once nodes receives heartbeats, membership list is updated to the latest info.
		- If the heartbeat has not increased for more than predefined periods, the member (node) is considered to be "offline".
	- To improve availability after failures, we use a technique called **sloppy quorum**.
		- Instead of enforcing the quorum requirement, the system chooses the first $W$ healthy servers for writes and the first $R$ healthy servers for reads. Offline servers are ignored.
	- If a server is down temporarily, another server will process requests temporarily.
		- When the down server is up, changes will be pushed back to achieve data consistency.
		- This process is called hinted handoff.
		- In the image below, reads and writes will be handled by $s_{3}$ temporarily. When $s_{2}$ comes back online, $s_{3}$ will hand the data back to $s_{2}$. ![[Pasted image 20230615172915.png]]

- Example of gossip protocol
	- ![[Pasted image 20230615172020.png]]
	- Node $s_{0}$ maintains a node membership list shown on the left side.
	- Node $s_{0}$ notices that the heartbeat counter of $s_{2}$ has not increased for a long time.
	- Node $s_{0}$ sends heartbeats that include the info of $s_{2}$ to a set of random nodes. Once other nodes confirm that $s_{2}$'s heartbeat counter has not been updated for a long time, node $s_{2}$ is marked as "down", and this information is propagated to other nodes.

 - Handling permanent failures
	 - We implement an anti-entropy protocol to keep replicas in sync.
	 - Anti-entropy involves comparing each piece of data on replicas and updating each replica to the newest version.
	 - A **Merkle tree** is used for inconsistency detection and minimizing the amount of data transferred.

- Understanding Merkle tree with an example
	- Assume a key space from 1 to 12
	- Divide the key space into buckets (4 in our case).  ![[Pasted image 20230615174115.png]]
	- Each key in a bucket is hashed using a uniform hashing method. ![[Pasted image 20230615174232.png]]
	- Create a single hash node per bucket ![[Pasted image 20230615174313.png]]
	- Build the tree upwards till root by calculating hashes of children ![[Pasted image 20230615174405.png]]
	- Two merkle trees (nodes) have the same data if the root hashes of both nodes match.
	- If root hashes disagree, then the corresponding child hashes are compared to find the un-synchronized buckets.

- High level architecture
	- ![[Pasted image 20230615175044.png]]
	- Clients communicate with the key-value store through APIs: `get(key)` and `put(key, value)`
	- Coordinator is a node that acts as a proxy between the client and the key-value store
	- Nodes are distributed on a hash ring
	- System is completely decentralized - adding/removing nodes can be automatic
	- Data is replicated at multiple nodes
	- No single point of failure as every node has the same set of responsibilities
	- ![[Pasted image 20230615175103.png|Responsibilities of each node]]

- Proposed design for writes (based on the architecture of Cassandra) ![[Pasted image 20230615175306.png]]
	1. The write request is persisted on a commit log file
	2. Data is saved in the memory cache
	3. After the memory cache is full or reaches a predefined threshold, data is flushed to SSTable (sorted-string table - sorted list of key-value pairs) on disk.

- Proposed design for reads (based on the architecture of Cassandra) ![[Pasted image 20230615175627.png]]
	1. System checks if data is in memory. If yes, return the data to the client.
	2. If data is not in memory, system checks the bloom filter
	3. The bloom filter is used to figure out which SSTable might contain the key
	4. SSTables return the result
	5. Result is returned to the client