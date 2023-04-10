- A multi-byte object is stored as contiguous sequence of bytes, with the address of the object given by the smallest address of the bytes used.
- The bytes of an object can be ordered in two ways:
	- **Little endian**: Bytes of the object are ordered **from least significant byte to most significant byte**
	- **Big endian**: Bytes of the object are ordered **from most significant byte to least significant byte**

## Example of little and big endian
```c
int x = 0x01234567; // The address of x is 0x100
```

![[Pasted image 20230410150424.png]]

## Problems with byte ordering
- When data produced from little endian machine is received by big endian machine, or vise-versa, it can cause problems.
- To avoid such scenarios, code written must follow established conventions to make sure that the bytes are ordered in a pre-agreed way for both the machines.

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 