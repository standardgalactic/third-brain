- Separates large databases into smaller, manageable parts called **shards**
- Each shard shares the same schema.
- Actual data on each shard is unique to the shard

## Example
![The hash function user_id % 4 is used to find the server with the relevant user data](Assets/The_hash_function_is_used_to_find_the_server_with_the_relevant_user_data.svg)

## Choosing the right sharding key
- **Sharding key (Partition key)** consists of one or more columns that determine how data is distributed. In the example above, `user_id` is the sharding key.
- It allows you to determine the correct database for a query
- Choose a key that can ensure that the data is evenly distributed

## Challenges
- **Resharding data**:
	- Needed when
		- A single shard can no longer hold more data
		- Certain shards are exhausted due to uneven data distribution
	- Requires updating the sharding function and moving data around to comply with the new function
		- [[Consistent hashing]] is a commonly used technique to solve this problem
- **Celebrity problem**:
	- Also called the **hotspot key problem**
	- Excessive access to a specific shard could cause server overload
	- Example: Data for a celebrity such as Lionel Messi is on a particular shard. In case of a social application, that shard will be overwhelmed with read operations

## Sources
- [[Scale From Zero To Millions Of Users by ByteByteGo]]

## Related Notes
- 