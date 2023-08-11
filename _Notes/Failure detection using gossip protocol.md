- In a distributed system, we cannot believe that a server is down just because another server says so.
- Better solution is to use decentralized failure detection methods like **gossip protocol**.

## Working of gossip protocol
- Each node maintains a node membership list, which contains member IDs and heartbeat counters.
- Each node periodically increments its heartbeat counter
- Each node periodically sends heartbeats to a set of random nodes, which in turn propagate to another set of nodes
- Once nodes receives heartbeats, membership list is updated to the latest info.
- If the heartbeat has not increased for more than predefined periods, the member (node) is considered to be "offline".

## Demonstration/Example
![[Pasted image 20230615172020.png]]

- Node $s_{0}$ maintains a node membership list shown on the left side.
- Node $s_{0}$ notices that the heartbeat counter of $s_{2}$ has not increased for a long time.
- Node $s_{0}$ sends heartbeats that include the info of $s_{2}$ to a set of random nodes. Once other nodes confirm that $s_{2}$'s heartbeat counter has not been updated for a long time, node $s_{2}$ is marked as "down", and this information is propagated to other nodes.

## Related Notes
- [[Recovering from temporary failures - Hinted handoff]]
- [[Recover from permanent failures - Merkle Trees]]

## Sources
- [[(Done) Design A Key-value Store - Highlights]]