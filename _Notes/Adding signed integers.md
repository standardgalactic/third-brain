- For integer values $x$ and $y$ in the range $-2^{w-1}\le x,\,y\le2^{w-1}-1$
![[Pasted image 20230416123253.png]]

## Visual demonstration
![[Pasted image 20230416123425.png|Case 1 and Case 4 demonstrate overflow situations]]

## Examples
| $x$         | $y$         | $x+y$         | $x +_{4}^{t} y$ | Case |
| ----------- | ----------- | ------------- | --------------- | ---- |
| -8 [`1000`] | -5 [`1011`] | -13 [10011]   | 3 [`0011`]      | 1    |
| -8 [`1000`] | -8 [`1000`] | -16 [`10000`] | 0 [0000]        | 1    |
| -8 [`1000`] | 5 [`0101`]  | -3 [`11101`]  | -3 [`1101`]     | 2    |
| 2 [`0010`]  | 5 [`0101`]  | 7 [`00111`]   | 7 [`0111`]      | 3    |
| 5 [`0101`]  | 5 [`0101`]  | 10 [`01010`]  | -6 [`1010`]     | 4     |

*The column "Case" corresponds to the "Case" shown in the figure above*

## Detecting overflow in two's complement addition
- Assume $s = x +_{w}^t y$
- Then $s$ is a positive overflow if and only if $x > 0$ and $y > 0$ but $s \leq 0$.
- The computation is a negative overflow if and only if $x < 0$ and $y < 0$ but $s \geq 0$

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 