- As mentioned [[Same data bits can mean different things in different context|here]], same bit pattern can represent different things depending on the context, like the program reading the bit pattern, etc.

## Representing integers
- A typical program may either be dealing with [[Encoding unsigned integers as binary|unsigned integers]] or [[Encoding signed integers as binary|signed integers]].
- The following image shows the representation of various values for different word sizes, $w$:

![[Pasted image 20230412124455.png]]

### Same bit pattern encode different data - context matters
- The following table gives the two's complement representation of $12,345$ and $-12,345$, and the unsigned representation of $53,191$. Notice that the bit pattern of $-12,345$ and $53,191$ are identical.
![[Pasted image 20230412125235.png]]

- The same bit pattern can be read as an unsigned integer as well as a two's complement integer. This happens when we perform **type casting** between the two data types. [[Conversion between signed and unsigned integer|Read more about these conversions here]]

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- [[Same data bits can mean different things in different context]]