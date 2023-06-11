- This is a solution to the [[Problems with consistent hashing|problem of data clustering in consistent hashing]]
- Each server is represented by multiple virtual nodes on the ring.

![s0_0, s0_1 and s0_2 represent server0 on the ring](Assets/Virtual_nodes.svg)

- This makes each server responsible for multiple partitions.
- Then, we find the first virtual node on the ring when trying to determine the key's location.
- The distribution of keys becomes more balanced as the number of virtual nodes increases. However, more space is needed to store data about virtual nodes.

## Related Notes
- 

## Sources
- [[(Done) Design Consistent Hashing - BytebyteGo - Highlights]]