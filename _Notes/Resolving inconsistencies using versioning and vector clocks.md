## What does versioning mean?
Means treating each data modification as a new immutable version of data

Assume that there are two nodes $n_{1}$ and $n_{2}$ that hold the same data: `name: "John"`. 

![[Pasted image 20230614130758.png|Both servers get the same value when reading the name]]

Next, $\text{server 1}$ changes the name to "JohnSanFrancisco" and $\text{server 2}$ changes the name to "JohnNewYork" at the same time. 

![[Pasted image 20230614130958.png]]

Vector clocks are commonly used to resolve such conflicts

## What are vector clocks
- Vector clock is a `[server, version]` pair associated with a data item.
- It can be used to check if one version precedes, succeeds or conflicts with other data.
- It can be represented in the form of $D([s_{1}, v_{1}], [s_{2}, v_{2}], \dots , [s_{n}, v_{n}])$, where $D$ is the data item (key-value pair), $v_{i}$ is the version counter and $s_{i}$ is the server number
- When a data item, $D$, is written to server $s_{i}$, one of the following things happen:
	- Increment $v_{i}$ if $[s_{i}, v_{i}]$ exists
	- Else, create a new entry $[s_{i}, 1]$ - '$1$' being the first time version number

## Demonstrating conflict resolution using vector clocks
Assume the following data modifications

![[Pasted image 20230614131654.png]]

Here, when the client reads $\text{D3}$ and $\text{D4}$, it will discover a conflict (caused by $\text{D2}$ being modified by $s_{y}$ and $s_{z}$). The conflict is resolved by client and updated data is sent to the server. Assuming that the write is handled by $s_{x}$, we end up with $\text{D5}$

## Detecting conflicts
- We can tell that a version X is an ancestor (no conflict) of version Y if the version counters of each participant in the vectors clock of Y is greater than or equal to the ones in version X.
	- Example: $D([s_{0}, 1], [s_{1}, 1])$ is an ancestor of $D([s_{0}, 1], [s_{1}, 2])$
- Version X is a sibling (conflict exists) of version Y if there is any participant in Y's version clock who has a counter that is less than its corresponding counter in X
	- Example: $D([s_{0}, 1], [s_{1}, 2])$ and $D([s_{0}, 2], [s_{1}, 1])$ have a conflict

## Drawbacks of vector clocks
- Adds complexity to the client because it needs to implement conflict resolution logic
- The $[\text{server}, \text{version}]$ pairs in the vector clock could grow rapidly.
	- To fix this, we can set a threshold for the number of pairs we want to hold. The oldest pairs are removed as the limit is exceeded.
	- This may lead to inefficiencies in reconciliation because the descendant relationship cannot be determined accurately. However, based on this [research paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) published by Amazon on DynamoDB, Amazon has not yet encountered this problem in production.

## Related Notes
- [[Meaning of consistency in distributed systems]]
- [[CAP Theorem]]
- [[Replicating data on the hash ring]]
- [[Meaning of availability in distributed systems]]

## Sources
- [[(Done) Design A Key-value Store - Highlights]]