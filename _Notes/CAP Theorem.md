- It is impossible for a distributed system to simultaneously provide more than two of these three guarantees:
1. [[Meaning of consistency in distributed systems|Consistency]]
2. [[Meaning of availability in distributed systems|Availability]]
3. [[Meaning of partition tolerance in distributed systems|Partition tolerance]] 

## CA (Consistent and Available) Systems are not practical
CA (Consistent and Available) key-value systems cannot exist in real world applications. Here's why:
- Network failure is unavoidable, so a distributed system must tolerate network partition.
- Thus, a system that sacrifices partition tolerance cannot exist in the real world

## Demonstrating CP and AP systems
- Assume a data store system with three nodes - $n_{1}$, $n_{2}$ and $n_{3}$
- In the ideal world, network partition never occurs. Data written to $n_{1}$ is automatically replicated to $n_{2}$ and $n_{3}$ . Both consistency and availability are achieved (complete CAP system)
- Assume that a partition occurs and $n_{3}$ goes down and cannot communicate with $n_{1}$ and $n_{2}$.

### What will happen in a AP (Available and partition tolerant) system
- In a AP system which values availability over consistency, we would have stale data and the system will continue to accept read requests
	- Data written to $n_{3}$ will not propagate to $n_{1}$ and $n_{2}$
	- Data written to $n_{1}$ or $n_{2}$ will not propagate to $n_{3}$

### What will happen in a CP (Consistent and Partition tolerant) system
- If we choose a CP system, which values consistency over availability, we must block all write operations to $n_{1}$ and $n_{2}$ to avoid data inconsistency among these 3 servers.
	- Perhaps, this is the reason that bank systems are often down - because they cannot afford inconsistent data.


## Related Notes
- 

## Sources
- [[(Done) Design A Key-value Store - Highlights]]