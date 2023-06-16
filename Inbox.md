- Example of conflict resolution using vector clocks 
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