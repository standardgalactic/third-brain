- Assume a executable program called `hello`

## Steps of execution
1. When we ask the shell (terminal) to run the program `hello`, it loads the executable file, `hello`, by executing a sequence of instructions that copies the code and the data in the `hello` object file from disk to main memory.
2. Using a technique called **Direct memory access (DMA)**, the data travels directly from disk to memory without passing the processor.
   ![[Pasted image 20230407090631.png]]
3. Once the code and the associated data is loaded into memory, the processor begins executing the instructions in `hello` 

## Attachments
- 

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 