## Explicit casting
- The following code block adequately demonstrates explicit type casting
```c
int tx, ty;
unsigned ux, uy;

tx = (int) ux; // Type casting ux into signed integer int
uy = (unsigned) ty; // Type casting ty into unsigned integer
```

## Implicit casting
- The following code block adequately demonstrates explicit type casting
```c
int tx, ty;
unsigned ux, uy;

tx = ux; // Cast to signed
uy = ty; // Cast to unsigned
```

### Operation between mixture of signed and unsigned
- When an operation is performed where one operand is signed and other is unsigned, C implicitly casts the signed argument to unsigned
- **Demonstration**:
```c
int tx;
unsigned ux;

tx + ux; // tx is casted to unsigned
```

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 