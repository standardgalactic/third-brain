- Replication of data centers across different regions
- When a user tries to access your application using a domain name, the domain name is resolved to the IP address of the data center that is closest to the user

![Demonstrating GeoDNS routing](Assets/Demonstrating_GeoDNS_routing.png)

## Data synchronisation
- Different data centers could have different local databases and caches.
- In failover cases, traffic might be routed to a data center where data is unavailable.
	- To avoid this, data is replicated across multiple data centers

## Sources
- [[(Done) Scale From Zero To Millions Of Users by ByteByteGo]]

## Related Notes
- 