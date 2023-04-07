- Portion of the OS code that is always resident in memory
- When an application program requires some action by the OS (such as reading/writing a file), it executes a special system call instruction.
	- This system call transfers control of the processor to the kernel
- The kernel, then, performs the requested operation and returns back to the application program

> [!NOTE] Kernel is not a separate process. It is a collection of code and data structures

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 