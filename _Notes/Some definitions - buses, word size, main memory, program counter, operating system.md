## Buses
- Electrical conduits running throughout a computer system that transfer bytes back and forth.
- They are typically designed to transfer fixed-size chunks of bytes known as **words**.

## Word size
- Fundamental system parameter
- Generally, they are either 4-byte (32-bit) or 8-byte (64-bit). 32-bit systems have 32 bit word sizes
- Size of a CPU register
- It also indicates the nominal size of a [[What are pointers|pointer]]

### Impact of word size on size of virtual address space
- Since the [[Virtual memory|virtual address space]] is encoded by such words, the maximum size of the virtual address space.
- For a $w$-bit word size, the virtual addresses can range from `0` to $2^w - 1$, giving the program access to $2^w$ bytes.
	- For example, for a 32-bit system , the word size is 32 bit. Therefore, the maximum size of the virtual memory can be $2^{32}\ \text{bytes} = 4\ \text{GB}$

## Main memory
- Temporary storage that holds both the program code and the data it works on.
- Consists of a collection of **dynamic random access memory (DRAM)** chips.
- Logically, memory is organized as an array of bytes, each with its own unique address (array index) starting at 0.

## Program counter (PC)

^0bb494

- Special register that points at some machine instruction in main memory
- Processor executes the instruction pointed at by the PC and updates the PC to point to the next instruction

## Attachments
- 

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 