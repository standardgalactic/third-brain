## Strong consistency
- Any read operation always returns the most recent data item.
- Client never sees stale data
- Usually achieved by forcing a replica not to accept new reads/writes until replica has agreed on latest write

## Weak consistency
- Read operations may not see the most updated value

## Eventual consistency
- Specific form of [[#Weak consistency|weak consistency]]
- All updates are propagated with time. Eventually, all replicas get the same value (the most recent data)
- When concurrent (parallel) writes happen, the system allows the inconsistent values to enter the system and eventually reconciles the nodes to consistent values
- Examples: Dynamo, Cassandra

## Related Notes
- [[Meaning of consistency in distributed systems]]
- [[CAP Theorem]]

## Sources
- [[(Done) Design A Key-value Store - Highlights]]