Assuming that data needs to be replicated across $N$ servers on the hash ring.

After a key is mapped on the [[Consistent hashing|hash ring]], the first $N$ servers that lie on the clockwise direction of the key store copies of the data 

![[Pasted image 20230614123558.png|N=3]]

With [[Virtual nodes in consistent hashing|virtual nodes]], the first $N$ nodes on the ring may be owned by fewer than $N$ actual servers. So, we can choose to only choose unique servers while performing this replication

We can also take care to place replicas in distinct data centers to avoid [[Single point of failure|single point of failure]] (by placing all replicas in a single data center)

## Related Notes
- [[Single point of failure]] 
- [[Consistent hashing]]

## Sources
- [[(Done) Design A Key-value Store - Highlights]]