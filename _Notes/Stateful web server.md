- Stateful server remembers client data (state) from one request to the next

![Demonstrating stateful architecture](Assets/Demonstrating_stateful_architecture.png)

## Problem
- As per the above image, every request related to user A must be routed to Server 1. In general, requests from a client must be routed to the same server.
	- This can be done with sticky sessions in most [[Load balancers|load balancers]]
- This leads to difficulties in adding or removing servers
- Also, it becomes challenging to handle server failures

## Solution
[[Stateless web server]]

## Sources
- [[(Done) Scale From Zero To Millions Of Users by ByteByteGo]]

## Related Notes
- 