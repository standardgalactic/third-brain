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


## Related Notes
- [[Meaning of consistency in distributed systems]]
- [[CAP Theorem]]
- [[Replicating data on the hash ring]]
- [[Meaning of availability in distributed systems]]

## Sources
- [[(Done) Design A Key-value Store - Highlights]]