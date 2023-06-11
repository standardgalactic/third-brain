- Impossible to keep the same size of partitions on the ring for all servers considering a server can be added or removed anywhere on the hash ring. *A partition is the hash space between adjacent servers*
- Possible to have non-uniform key distribution on the ring. 

![[Pasted image 20230610174518.png|Most keys will be stored on server 2]]

- Solved by adopting [[Virtual nodes in consistent hashing]]

## Related Notes
- 

## Sources
- [[(Done) Design Consistent Hashing - BytebyteGo - Highlights]]