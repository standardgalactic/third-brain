- For $x$ in the range $TMin_{w} \leq x \leq TMax_{w}$, it's two's complement negation is given by:

$$
-_{w}^{t}x={\left\{\begin{array}{l l}{T M i n_{w},}&{x=T M i n_{w}}\\ {-x,}&{x>T M i n_{w}}\end{array}\right.}
$$

## Performing the negation in binary form
There are two methods to do this.
1. Complement the bits and increment the result by 1.
	- `-x = ~x + 1`
2. Complement each bit that is to the left of rightmost 1

## Example
| $\vec{x}$ | $~\vec{x}$ | $\text{incr}(~\vec{x}) = -\vec{x}$ |
| --------- | ---------- | ---------------------------------- |
| 5 [0101]  | -6 [1010]  | -5 [1011]                          |
| 7 [0111]  | -8 [1000]  | -7 [1001]                          |
| -4 [1100] | 3 [0011]   | 4 [0100]                           |
| 0 [0000]  | -1 [1111]  | 0 [0000]                           |
| -8 [1000] | 7 [0111]   | -8 [1000]                                   |


## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 