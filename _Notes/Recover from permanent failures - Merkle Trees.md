 - We implement an anti-entropy protocol to keep replicas in sync.
 - Anti-entropy involves comparing each piece of data on replicas and updating each replica to the newest version.
 - A **Merkle tree** is used for inconsistency detection and minimizing the amount of data transferred.

## Demonstrating Merkle Tree
- Assume a key space from 1 to 12
- Divide the key space into buckets (4 in our case).  ![[Pasted image 20230615174115.png]]
- Each key in a bucket is hashed using a uniform hashing method. ![[Pasted image 20230615174232.png]]
- Create a single hash node per bucket ![[Pasted image 20230615174313.png]]
- Build the tree upwards till root by calculating hashes of children ![[Pasted image 20230615174405.png]]
- Two merkle trees (nodes) have the same data if the root hashes of both nodes match.
- If root hashes disagree, then the corresponding child hashes are compared to find the un-synchronized buckets.

## Related Notes
- [[Failure detection using gossip protocol]]
- [[Improve availability after failures - Using sloppy quorum]]
- [[Recovering from temporary failures - Hinted handoff]]
## Sources
- [[(Done) Design A Key-value Store - Highlights]]