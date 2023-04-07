- Layer of software interposed between the application program and the hardware.
- All attempts by an application program must go through the operating system.
- It provides applications with simple and uniform mechanisms for manipulating complicated and different low-level hardware devices
- It also protects the hardware from misuse by malicious applications

![[Pasted image 20230407092746.png]]

## Abstractions provided by the OS
![[Pasted image 20230407093503.png]]

### Processes
- It is the operating system's abstraction of a running program
- Multiple processes can run concurrently, and each process appears to have exclusive use of the hardware

#### How does the CPU appear to run concurrent processes?
- By having the processor continuously switch between them
- OS performs this *interleaving* with a mechanism called **context switching**

![[Pasted image 20230407093812.png]]
- At any time, a uniprocessor can run a single process only
- OS keeps track of all the state information related to the process. This state is called **context**, and includes current values of [[Some definitions - buses, word size, main memory, program counter, operating system#^0bb494|PC]], registers, contents of main memory, etc.
- When the OS decides to switch the process, it performs a **[[Context switching by the OS|context switch]]**.

## Attachments
- 

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 