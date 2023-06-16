In this technique, the system's nodes work together to process and store data, and decisions are made based on the agreement of a majority of these nodes

> [!info] Assumptions
> $N$ - Number of replicas
> $W$ - Write quorum. For a write operation to be considered as successful, write operation must be acknowledged from $W$ replicas.
> $R$ - Read quorum. A read operation is considered successful if atleast $R$ replicas respond to the read request.

In the following figure, if $W = 1$, it means that the coordinator must receive at least one acknowledgement for the write operation to be considered as successful.

![[Pasted image 20230614124802.png|ACK=acknowledgement. Coordinator acts as proxy between the client and the nodes]]

The configuration of $W$, $R$ and $N$ determines the tradeoff between consistency and latency. For instance, if $W = 1$ or $R = 1$, the operation is performed quickly since the coordinator only needs to wait for a response from only one of the replicas, but the consistency of the system will take a hit.

## Different quorum configurations
- If $W = 1$ and $R = N$, the system is optimized for a fast write
- If $R = 1$ and $W = N$, the system is optimized for a fast read
- If $W +R>N$, strong consistency is guaranteed because there must be at least one overlapping node that has the latest data to ensure consistency
- If $W + R \leq N$, strong consistency is not guaranteed

## Related Notes
- [[Meaning of consistency in distributed systems]]
- [[CAP Theorem]]
- [[Replicating data on the hash ring]]

## Sources
- [[(Done) Design A Key-value Store - Highlights]]