- Signed numbers are converted to a larger data type using this method
-  Add copies of the most significant bit (MSB) to the representation

## Example
```c
char x = -56; // 0xC8

short y = (short) x; // 0xFFC8
```

## Visual representation
- The following figure shows an example of sign extending from $w=3$ to $w=4$. ($w$ → [[Some definitions - buses, word size, main memory, program counter, operating system|word size]]). Notice that the combined weights of the upper two bits ($w=4$) is $-8 + 4 = -4$, which matches the weight of the sign bit for $w=3$.
![[Pasted image 20230413120824.png]]

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 