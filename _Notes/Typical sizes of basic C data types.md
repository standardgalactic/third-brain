| Signed            | Unsigned          | 32-bit    | 64-bit |
| ----------------- | ----------------- | --------- | ------ |
| **C declaration** | **C declaration** | **Bytes** | **Bytes**  |
| [signed] `char`   | `unsigned char`   | 1         | 1      |
| `short`           | `unsigned short`  | 2         | 2      |
| `int`             | `unsigned`        | 4         | 4      |
| `long`            | `unsigned long`   | 4         | 8      |
| `int32_t`         | `uint32_t`        | 4         | 4      |
| `int64_t`         | `uint64_t`        | 8         | 8      |
| `char *`          |                   | 4         | 8      |
| `float`           |                   | 4         | 4      |
| `double`          |                   | 8         | 8      |

## Observation
- The size of an object changes with the [[Some definitions - buses, word size, main memory, program counter, operating system|word size]] of the processor where the program is run.
- Using fixed size integer types like `int32_t` and `int64_t` is the best way to have close control over data representation regardless of the processor the compiler is run.

## Ranges of various C data types
### 32-bit programs
![[Pasted image 20230412124731.png]]

### 64-bit programs
![[Pasted image 20230412124828.png]]

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- [[Encoding unsigned integers as binary]]
- [[Encoding signed integers as binary]]