- With 32-bit systems being the dominant word size until around 2010, many programs were written assuming the [[Typical sizes of basic C data types|object allocations for 32 bit systems]].
- Many programmers historically assumed that an object declared as `int` could be repurposed to store a pointer. (In 32-bit systems, the size of the pointer and `int` data type is 4 bytes.)
	- But, this has led to problems when the same programs were run in 64-bit systems.
	- Because the size of `int` is still 4 bytes, but the pointers are now 8 bytes.

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 