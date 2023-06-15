![rw-book-cover](https://bytebytego.com/social.png)

## Metadata
- Author: [[ByteByteGo]]
- Full Title: Design A Key-value Store
- Document Note: 1. What is partition tolerance?
   2. When choosing CP system, are the read operations also unavailable?
   3. By saying that n3 goes down, does it mean that its connection to n1 and n2 goes down OR the n3 server itself goes down
   4. After detecting conflict via vector clocks, how is the conflict even resolved
   5. More info on gossip protocol
   6. Gossip protocol vs master heartbeat protocol
   7. In anti-entropy protocol, if two servers have same data, then how it is ensured that the buckets created inside them have the same keys
   8. What is a bloom filter?
- URL: https://bytebytego.com/courses/system-design-interview/design-a-key-value-store

## Highlights
- In this chapter, we design a key-value store that comprises of the following characteristics:
  • The size of a key-value pair is small: less than 10 KB.
  • Ability to store big data.
  • High availability: The system responds quickly, even during failures.
  • High scalability: The system can be scaled to support large data set.
  • Automatic scaling: The addition/deletion of servers should be automatic based on traffic.
  • Tunable consistency.
  • Low latency. ([View Highlight](https://read.readwise.io/read/01gypedhpxxtabz88wsar27wdw))
- CAP theorem states it is impossible for a distributed system to simultaneously provide more than two of these three guarantees: consistency, availability, and partition tolerance. Let us establish a few definitions.
  **Consistency**: consistency means all clients see the same data at the same time no matter which node they connect to.
  **Availability:** availability means any client which requests data gets a response even if some of the nodes are down.
  **Partition Tolerance:** a partition indicates a communication break between two nodes. Partition tolerance means the system continues to operate despite network partitions. ([View Highlight](https://read.readwise.io/read/01gypefe514b5v7vkkfbgxv4wg))
    - Note: Partition Tolerance is a key concept in distributed systems, specifically relating to the CAP theorem, which outlines the trade-offs between Consistency, Availability, and Partition Tolerance in such systems.
      A partition in a distributed system refers to a communication break or failure between two or more nodes, which may occur due to network issues, hardware failures, or other unforeseen events. When a partition occurs, the nodes on one side of the partition cannot communicate with the nodes on the other side, which can lead to inconsistencies or unavailability of data.
      Partition Tolerance means that a distributed system is designed to continue operating even in the presence of network partitions. This is an important property because it allows the system to maintain its functionality and ensure that at least a portion of the data remains accessible, even when communication failures occur.
      In practice, achieving partition tolerance often involves implementing strategies like replication, sharding, and consensus algorithms, which help maintain the overall integrity of the system during periods of network disruption. However, according to the CAP theorem, it is impossible for a distributed system to simultaneously provide perfect consistency, availability, and partition tolerance; therefore, system designers must make trade-offs based on their specific use cases and requirements.
- **CA (consistency and availability) systems**: a CA key-value store supports consistency and availability while sacrificing partition tolerance. Since network failure is unavoidable, a distributed system must tolerate network partition. Thus, a CA system cannot exist in real-world applications. ([View Highlight](https://read.readwise.io/read/01gypemwgtaac83d3a5h1jh7s7))
- In distributed systems, data is usually replicated multiple times. Assume data are replicated on three replica nodes, *n1*, *n2* and *n3* as shown in Figure 2.
  **Ideal situation**
  In the ideal world, network partition never occurs. Data written to *n1* is automatically replicated to *n2* and *n3*. Both consistency and availability are achieved.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27311%27%20height=%27259%27/%3e)![Figure 2](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-2-KZYRLJFF.svg) ([View Highlight](https://read.readwise.io/read/01gypep0n9dpw07e6enb87crn8))
- n a distributed system, partitions cannot be avoided, and when a partition occurs, we must choose between consistency and availability. In Figure 3, *n3* goes down and cannot communicate with *n1* and *n2*. If clients write data to *n1* or *n2*, data cannot be propagated to n3. If data is written to *n3* but not propagated to *n1* and *n2* yet, *n1* and *n2* would have stale data.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27311%27%20height=%27259%27/%3e) ([View Highlight](https://read.readwise.io/read/01gypepnfhcrgwvx0zjczz1n12))
- If we choose consistency over availability (CP system), we must block all write operations to *n1* and *n2* to avoid data inconsistency among these three servers, which makes the system unavailable. Bank systems usually have extremely high consistent requirements. For example, it is crucial for a bank system to display the most up-to-date balance info. If inconsistency occurs due to a network partition, the bank system returns an error before the inconsistency is resolved. ([View Highlight](https://read.readwise.io/read/01gypeqwxzp83b7y93hzcgwjk3))
- However, if we choose availability over consistency (AP system), the system keeps accepting reads, even though it might return stale data. For writes, *n1* and *n2* will keep accepting writes, and data will be synced to *n3* when the network partition is resolved. ([View Highlight](https://read.readwise.io/read/01gyper03mjehgyvjrcrn51d5g))
- For large applications, it is infeasible to fit the complete data set in a single server. The simplest way to accomplish this is to split the data into smaller partitions and store them in multiple servers. There are two challenges while partitioning the data:
  • Distribute data across multiple servers evenly.
  • Minimize data movement when nodes are added or removed.
  Consistent hashing discussed in the previous chapter is a great technique to solve these problems ([View Highlight](https://read.readwise.io/read/01gypevxj76p7pnjyswfm2y58c))
- Using consistent hashing to partition data has the following advantages:
  **Automatic scaling:** servers could be added and removed automatically depending on the load.
  **Heterogeneity:** the number of virtual nodes for a server is proportional to the server capacity. For example, servers with higher capacity are assigned with more virtual nodes. ([View Highlight](https://read.readwise.io/read/01gypexaz8h67q65a6w87e54kw))
- To achieve high availability and reliability, data must be replicated asynchronously over *N* servers, where *N* is a configurable parameter. These *N* servers are chosen using the following logic: after a key is mapped to a position on the hash ring, walk clockwise from that position and choose the first *N* servers on the ring to store data copies. In Figure 5 (*N = 3*), *key0* is replicated at *s1, s2,* and *s3*.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27347%27%20height=%27355%27/%3e)![Figure 5](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-5-NG3WIQQO.svg) ([View Highlight](https://read.readwise.io/read/01gypfdakytt8qp5n6r78krqch))
- With virtual nodes, the first *N* nodes on the ring may be owned by fewer than *N* physical servers. To avoid this issue, we only choose unique servers while performing the clockwise walk logic. ([View Highlight](https://read.readwise.io/read/01gypfeayzdmq5kkaw85rpmhft))
- Nodes in the same data center often fail at the same time due to power outages, network issues, natural disasters, etc. For better reliability, replicas are placed in distinct data centers, and data centers are connected through high-speed networks. ([View Highlight](https://read.readwise.io/read/01gypfer0wnew8h8kn402pzvbp))
- Since data is replicated at multiple nodes, it must be synchronized across replicas. Quorum consensus can guarantee consistency for both read and write operations. ([View Highlight](https://read.readwise.io/read/01gypfmk07vevfkf1bvh07vmsy))
    - Note: Quorum consensus is a technique used in distributed systems to achieve consistency, reliability, and fault tolerance by ensuring that a majority of nodes agree on the values of read and write operations. In a quorum consensus algorithm, a distributed system's nodes work together to process and store data, and decisions are made based on the agreement of a majority of these nodes. This approach can guarantee consistency for both read and write operations, as explained below:
      1. Write operations: When a client wants to write data to the distributed system, the request is sent to a specific number of nodes, typically a majority of the total nodes, called the write quorum. The write operation is considered successful only when the majority of the nodes acknowledge the write. This ensures that even if some nodes fail or become unavailable, the data is still consistently written to the system as long as the majority of nodes agree on the update.
      2. Read operations: When a client wants to read data from the distributed system, the request is sent to a specific number of nodes, typically a majority, called the read quorum. The nodes respond with the latest data they have, and the client waits for the responses from the majority of the nodes. By requiring a majority for read operations, the system ensures that the client reads the most up-to-date and consistent data, even in the presence of node failures or network partitions.
      To guarantee consistency for both read and write operations, the quorum consensus algorithm requires that the intersection of the read quorum and write quorum is non-empty. In other words, there should be at least one node common in both read and write quorums. This condition ensures that the latest written data is always available for reading, even when some nodes in the system fail or become temporarily unavailable.
      In summary, quorum consensus guarantees consistency for read and write operations in distributed systems by ensuring that a majority of nodes agree on the values of these operations. This approach makes the system more fault-tolerant and resilient to failures, providing a consistent and reliable data store for clients.
- ***N*** = The number of replicas
  ***W*** = A write quorum of size *W*. For a write operation to be considered as successful, write operation must be acknowledged from *W* replicas.
  ***R*** = A read quorum of size *R*. For a read operation to be considered as successful, read operation must wait for responses from at least *R* replicas. ([View Highlight](https://read.readwise.io/read/01gypg75ssma02yzg07rgfqpj1))
- ![Figure 6](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-6-RNMG7AUI.svg)
  Figure 6 (ACK = acknowledgement)
  *W = 1* does not mean data is written on one server. For instance, with the configuration in Figure 6, data is replicated at *s0*, *s1,* and *s2*. *W = 1* means that the coordinator must receive at least one acknowledgment before the write operation is considered as successful. For instance, if we get an acknowledgment from *s1*, we no longer need to wait for acknowledgements from *s0* and *s2*. A coordinator acts as a proxy between the client and the nodes. ([View Highlight](https://read.readwise.io/read/01gypg7adn2y9y6qqf5m4zxzgr))
- The configuration of *W, R* and *N* is a typical tradeoff between latency and consistency. If *W = 1* or *R = 1*, an operation is returned quickly because a coordinator only needs to wait for a response from any of the replicas. If *W* or *R > 1*, the system offers better consistency; however, the query will be slower because the coordinator must wait for the response from the slowest replica.
  If *W + R > N*, strong consistency is guaranteed because there must be at least one overlapping node that has the latest data to ensure consistency. ([View Highlight](https://read.readwise.io/read/01gypg8ye9bfzgxsexec8nhhdk))
- If *R = 1* and *W = N*, the system is optimized for a fast read.
  If *W = 1 and R = N*, the system is optimized for fast write.
  If *W + R > N*, strong consistency is guaranteed (Usually *N = 3, W = R = 2*).
  If *W + R <= N*, strong consistency is not guaranteed. ([View Highlight](https://read.readwise.io/read/01gypg9hwfx04gqg9jcv8qmp01))
- A consistency model defines the degree of data consistency, and a wide spectrum of possible consistency models exist:
  • Strong consistency: any read operation returns a value corresponding to the result of the most updated write data item. A client never sees out-of-date data.
  • Weak consistency: subsequent read operations may not see the most updated value.
  • Eventual consistency: this is a specific form of weak consistency. Given enough time, all updates are propagated, and all replicas are consistent. ([View Highlight](https://read.readwise.io/read/01gypgtjgg7vnzz203c0ddfy2j))
- Strong consistency is usually achieved by forcing a replica not to accept new reads/writes until every replica has agreed on current write. This approach is not ideal for highly available systems because it could block new operations ([View Highlight](https://read.readwise.io/read/01gypgvz9ghke371m6pm0a3p7e))
- Dynamo and Cassandra adopt eventual consistency, which is our recommended consistency model for our key-value store. From concurrent writes, eventual consistency allows inconsistent values to enter the system and force the client to read the values to reconcile. ([View Highlight](https://read.readwise.io/read/01gypgw44atenxwy4dgj10cagf))
    - Note: The text provided explains that Dynamo and Cassandra, two popular distributed databases, use eventual consistency as their recommended consistency model for their key-value stores. Let's break down the key concepts in this explanation:
      1. Dynamo and Cassandra: These are distributed databases designed to handle large amounts of data across many servers. They provide high availability and scalability. Dynamo is a NoSQL database developed by Amazon, while Cassandra is an open-source database developed by the Apache Software Foundation.
      2. Key-value store: A key-value store is a simple data storage model where data is organized as a collection of key-value pairs. The key is a unique identifier, while the value is the data associated with the key. Key-value stores are particularly useful for fast and efficient data retrieval.
      3. Eventual consistency: Eventual consistency is a consistency model in distributed systems that allows temporary inconsistencies in the data. In this model, when a write operation occurs, it may not be immediately visible to all nodes in the system. However, the system guarantees that, given enough time without further writes to the same data, all nodes will eventually converge to the same value.
      4. Concurrent writes: This refers to the situation when multiple clients are writing to the same data at the same time. In distributed systems, concurrent writes can lead to data inconsistencies, as different nodes may receive updates in a different order.
      5. Inconsistent values and reconciliation: With eventual consistency, it's possible for clients to read inconsistent values temporarily. In this case, it is the client's responsibility to reconcile the differences and choose the correct value to use. This reconciliation process can be based on different strategies, such as choosing the value with the latest timestamp or applying application-specific logic.
      In summary, Dynamo and Cassandra use eventual consistency in their key-value stores to provide high availability and fault tolerance in distributed systems. This approach allows temporary data inconsistencies, which are eventually resolved, and requires clients to reconcile conflicting values when they occur.
- Inconsistency resolution: versioning
  Replication gives high availability but causes inconsistencies among replicas. Versioning and vector locks are used to solve inconsistency problems. Versioning means treating each data modification as a new immutable version of data. ([View Highlight](https://read.readwise.io/read/01gyph4gn7qgjzgjp7d0jcndjj))
- As shown in Figure 7, both replica nodes *n1* and *n2* have the same value. Let us call this value the original *value. Server 1* and *server 2* get the same value for *get(“name”)* operation.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27450%27%20height=%27263%27/%3e)![Figure 7](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-7-MX7NGSSF.svg)
  Figure 7
  Next, *server 1* changes the name to “johnSanFrancisco”, and *server 2* changes the name to “johnNewYork” as shown in Figure 8. These two changes are performed simultaneously. Now, we have conflicting values, called versions *v1* and *v2*.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27500%27%20height=%27227%27/%3e)![Figure 8](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-8-WXAQYDBT.svg) ([View Highlight](https://read.readwise.io/read/01gyph6ap6je6ehb47y0ayzhak))
- A vector clock is a common technique to solve this problem. Let us examine how vector clocks work.
  A vector clock is a *[server, version]* pair associated with a data item. It can be used to check if one version precedes, succeeds, or in conflict with others.
  Assume a vector clock is represented by *D([S1, v1], [S2, v2], …, [Sn, vn])*, where *D* is a data item, *v1* is a version counter, and *s1* is a server number, etc. If data item *D* is written to server *Si*, the system must perform one of the following tasks.
  • Increment *vi* if *[Si, vi]* exists.
  • Otherwise, create a new entry *[Si, 1]*. ([View Highlight](https://read.readwise.io/read/01gyph7dwy4rsqt0y4wj0vhvcf))
- ![Figure 9](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-9-APUHGGQW.svg) ([View Highlight](https://read.readwise.io/read/01gyph9kdjrskvr20ym3qegnx7))
- Using vector clocks, it is easy to tell that a version *X* is an ancestor (i.e. no conflict) of version *Y* if the version counters for each participant in the vector clock of *Y* is greater than or equal to the ones in version *X*. For example, the vector clock *D([s0, 1], [s1, 1])]* is an ancestor of *D([s0, 1], [s1, 2])*. Therefore, no conflict is recorded. ([View Highlight](https://read.readwise.io/read/01gyphcmkjjx1s29jtb2rhadmh))
- Similarly, you can tell that a version *X* is a sibling (i.e., a conflict exists) of *Y* if there is any participant in *Y*'s vector clock who has a counter that is less than its corresponding counter in *X*. For example, the following two vector clocks indicate there is a conflict: *D([s0, 1], [s1, 2])* and *D([s0, 2], [s1, 1]).* ([View Highlight](https://read.readwise.io/read/01gyphk6ft3wgcp4mby4fha5py))
    - Note: When a conflict is detected between two versions, the client has to resolve it before proceeding. There are several strategies to resolve conflicts, and the choice depends on the specific requirements of the distributed system and the nature of the data being managed. Here are some common conflict resolution strategies:
      1. Manual resolution: The client can present both conflicting versions to the user and ask them to manually choose one or merge the changes from both versions. This strategy is suitable when human intervention is necessary to make the best decision.
      2. Last writer wins: The client can resolve the conflict by choosing the version that was updated most recently, based on timestamps or version counters. This approach is simple but may lead to data loss if the losing version contains important changes.
      3. Merge: The client can automatically merge the conflicting versions by combining the changes from both versions. This is often used in version control systems like Git. The merging process can be straightforward if the changes are non-overlapping, but it may require a more sophisticated algorithm or user intervention if the changes overlap or conflict with each other.
      4. Application-specific rules: For some systems, it is possible to define application-specific rules to resolve conflicts. These rules may consider the type of data, the actions performed on the data, and other factors to decide which version to keep or how to merge the changes.
      5. Conflict-free replicated data types (CRDTs): CRDTs are a class of data structures that allow concurrent updates to be merged deterministically without conflicts. By using CRDTs in the distributed system, conflicts can be avoided altogether, as these data structures can automatically merge changes from different replicas.
      Once the conflict has been resolved using one of these strategies, the client can update its local version of the data and propagate the resolved version to other participants in the distributed system.

- Even though vector clocks can resolve conflicts, there are two notable downsides. First, vector clocks add complexity to the client because it needs to implement conflict resolution logic.
  Second, the *[server: version]* pairs in the vector clock could grow rapidly. To fix this problem, we set a threshold for the length, and if it exceeds the limit, the oldest pairs are removed. This can lead to inefficiencies in reconciliation because the descendant relationship cannot be determined accurately. However, based on Dynamo paper [4], Amazon has not yet encountered this problem in production; therefore, it is probably an acceptable solution for most companies. ([View Highlight](https://read.readwise.io/read/01gyphkasw7rf6289859c6mkkm))
- In a distributed system, it is insufficient to believe that a server is down because another server says so. Usually, it requires at least two independent sources of information to mark a server down. ([View Highlight](https://read.readwise.io/read/01gypj91fpx849ha38sjrc2ebp))
- A better solution is to use decentralized failure detection methods like gossip protocol. Gossip protocol works as follows:
  • Each node maintains a node membership list, which contains member IDs and heartbeat counters.
  • Each node periodically increments its heartbeat counter.
  • Each node periodically sends heartbeats to a set of random nodes, which in turn propagate to another set of nodes.
  • Once nodes receive heartbeats, membership list is updated to the latest info.
  •If the heartbeat has not increased for more than predefined periods, the member is considered as offline.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27700%27%20height=%27298%27/%3e)![Figure 11](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-11-SHKPJFQN.svg)
  Figure 11
  As shown in Figure 11:
  • Node *s0* maintains a node membership list shown on the left side.
  • Node *s0* notices that node s2’s (member ID = 2) heartbeat counter has not increased for a long time.
  • Node *s0* sends heartbeats that include *s2*’s info to a set of random nodes. Once other nodes confirm that *s2*’s heartbeat counter has not been updated for a long time, node *s2* is marked down, and this information is propagated to other nodes. ([View Highlight](https://read.readwise.io/read/01gypjftbmhr7y1rderv0tv04w))
- After failures have been detected through the gossip protocol, the system needs to deploy certain mechanisms to ensure availability. In the strict quorum approach, read and write operations could be blocked as illustrated in the quorum consensus section. ([View Highlight](https://read.readwise.io/read/01gypjpcn63pyt3nf234qgtazz))
- A technique called “sloppy quorum” [4] is used to improve availability. Instead of enforcing the quorum requirement, the system chooses the first *W* healthy servers for writes and first *R* healthy servers for reads on the hash ring. Offline servers are ignored.
  If a server is unavailable due to network or server failures, another server will process requests temporarily. When the down server is up, changes will be pushed back to achieve data consistency. This process is called hinted handoff. Since *s2* is unavailable in Figure 12, reads and writes will be handled by *s3* temporarily. When *s2* comes back online, *s3* will hand the data back to *s2*.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27381%27%20height=%27361%27/%3e)![Figure 12](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-12-TCHVLATH.svg) ([View Highlight](https://read.readwise.io/read/01gypjpkzybe09tbvmpvfy8az8))
- What if a replica is permanently unavailable? To handle such a situation, we implement an anti-entropy protocol to keep replicas in sync. Anti-entropy involves comparing each piece of data on replicas and updating each replica to the newest version. A Merkle tree is used for inconsistency detection and minimizing the amount of data transferred. ([View Highlight](https://read.readwise.io/read/01gypk9a1gwy6bb22hrxk92rkr))
- Assuming key space is from 1 to 12, the following steps show how to build a Merkle tree. Highlighted boxes indicate inconsistency.
  Step 1: Divide key space into buckets (4 in our example) as shown in Figure 13. A bucket is used as the root level node to maintain a limited depth of the tree.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27451%27%20height=%27160%27/%3e)![Figure 13](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-13-2LCEPIWQ.svg)
  Figure 13
  Step 2: Once the buckets are created, hash each key in a bucket using a uniform hashing method (Figure 14).
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27700%27%20height=%27200%27/%3e)![Figure 14](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-14-S2QAQ6NW.svg)
  Figure 14
  Step 3: Create a single hash node per bucket (Figure 15).
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27700%27%20height=%27249%27/%3e)![Figure 15](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-15-I46TOGGB.svg)
  Figure 15
  Step 4: Build the tree upwards till root by calculating hashes of children (Figure 16).
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27750%27%20height=%27446%27/%3e)![Figure 16](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-16-5GFGLUJW.svg)
  Figure 16
  To compare two Merkle trees, start by comparing the root hashes. If root hashes match, both servers have the same data. If root hashes disagree, then the left child hashes are compared followed by right child hashes. You can traverse the tree to find which buckets are not synchronized and synchronize those buckets only. ([View Highlight](https://read.readwise.io/read/01gypkeyhaxns0gs7zgazk5ymr))
- ![Figure 17](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-17-727LAZC5.svg)
  Figure 17
  Main features of the architecture are listed as follows:
  • Clients communicate with the key-value store through simple APIs: *get(key)* and *put(key, value)*.
  • A coordinator is a node that acts as a proxy between the client and the key-value store.
  • Nodes are distributed on a ring using consistent hashing.
  • The system is completely decentralized so adding and moving nodes can be automatic.
  • Data is replicated at multiple nodes.
  • There is no single point of failure as every node has the same set of responsibilities.
  As the design is decentralized, each node performs many tasks as presented in Figure 18.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27442%27%20height=%27442%27/%3e)![Figure 18](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-18-VIXXZUFG.svg)
  Figure 18 ([View Highlight](https://read.readwise.io/read/01gypknk7tgzz3fqrc4yqac5qs))
- igure 19 explains what happens after a write request is directed to a specific node. Please note the proposed designs for write/read paths are primary based on the architecture of Cassandra [8].
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27600%27%20height=%27295%27/%3e)![Figure 19](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-19-L5VIQL76.svg)
  Figure 19
  1. The write request is persisted on a commit log file.
  2. Data is saved in the memory cache.
  3. When the memory cache is full or reaches a predefined threshold, data is flushed to SSTable [9] on disk. Note: A sorted-string table (SSTable) is a sorted list of <key, value> pairs. For readers interested in learning more about SStable, refer to the reference material [9]. ([View Highlight](https://read.readwise.io/read/01gypkwkv84frgmhnfrq6ybtqr))
- After a read request is directed to a specific node, it first checks if data is in the memory cache. If so, the data is returned to the client as shown in Figure 20.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27600%27%20height=%27282%27/%3e)![Figure 20](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-20-CMQ6VUZJ.svg)
  Figure 20
  If the data is not in memory, it will be retrieved from the disk instead. We need an efficient way to find out which SSTable contains the key. Bloom filter [10] is commonly used to solve this problem.
  The read path is shown in Figure 21 when data is not in memory.
  ![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27600%27%20height=%27282%27/%3e)![Figure 21](https://bytebytego.com/images/courses/system-design-interview/design-a-key-value-store/figure-6-21-WBKMXPRG.svg)
  Figure 21
  1. The system first checks if data is in memory. If not, go to step 2.
  2. If data is not in memory, the system checks the bloom filter.
  3. The bloom filter is used to figure out which SSTables might contain the key.
  4. SSTables return the result of the data set.
  5. The result of the data set is returned to the client. ([View Highlight](https://read.readwise.io/read/01gypkwz8w5p0a2rnn3zvywaz9))
