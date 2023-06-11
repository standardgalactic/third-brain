Assume that the range of values of the hash function is in the range of $x_{0}, x_{1}, x_{2}, \dots, x_{n}$.  This range of values is called the **hash space**

![Hash space](Assets/Displaying_the_hash_space_in_consistent_hashing.svg)

We collect both ends of the hash space to get a hash ring: 

![Hash Ring](Assets/Consistent_Hashing_-_Hash_Ring.svg)

Using the same hash function, we map servers based on server IP or server name onto the ring.

![Mapping servers on the hash ring](Assets/Mapping_servers_on_the_hash_ring.svg)

To determine the server for a particular key:
- Map the key on the hash ring
- Move clockwise from the key position on the ring until a server is found.

![Demonstrating the key to server mapping](Assets/Demonstrating_the_key_to_server_mapping.svg)

## Related Notes
- 

## Sources
- [[(Done) Design Consistent Hashing - BytebyteGo - Highlights]]