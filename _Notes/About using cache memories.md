## Why we need cache?
- The system spends a lot of time moving data, information from one place to another
- Due to physical limitations:
	- larger the storage device, slower it is
	- cheaper the storage device, slower it is
	- So, hard disks are slower than RAMs
- RAMs, too, are on the slower side when it comes to executing programs fast.

## What are cache memories?
- Smaller, faster storage devices that serve as temporary staging areas for information that the processor is likely to need in the near future
- Caching can get the effect of both a very large memory and very fast one by exploiting locality.
![[Pasted image 20230407091633.png]]

## L1 and L2 cache memories
- Both L1 and L2 are implemented using a hardware technology called **Static random access memory (SRAM)**
- **L1 cache:** Can hold tens of thousands of bytes and can be accessed nearly as fast as register file
- **L2 cache:**
	- Larger than L1
	- Hundreds of thousands to millions of bytes
	- Around 5 times slower than L1, still 5 to 10 times faster than main memory.

## Example of memory hierarchy
![[Pasted image 20230407092439.png]]

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 