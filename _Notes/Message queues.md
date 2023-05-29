- Stored in memory, that supports asynchronous communication
- Serves as a buffer and distributes asynchronous requests

## Basic architecture
- Input services, called producers/publishers, create messages and publish them to a message queue
- Other services called consumers/subscribers connect to the queue, and perform actions defined by the messages

![Message queue architecture](Assets/Message_queue_architecture.svg)

## Advantage: Decoupling
- The producer can post a message even when the consumer is unavailable.
- Likewise, the consumer can read messages even when the producer is offline

## Sources
- [[(Done) Scale From Zero To Millions Of Users by ByteByteGo]]

## Related Notes
- 