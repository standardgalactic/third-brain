## Distributive property
$$
\begin{align}
a\ \&\ (b \mid c) &= (a\ \&\ b) \mid\ (a\ \&\ c)\\
a\ \mid (b\ \&\ c) &= (a \mid b)\ \&\ (a \mid c)
\end{align}
$$

## Playing with the XOR (`^`) operator
- We have `a ^ a = 0`, where `0` represents a [[Bit vectors|vector (bits)]] of all zeroes
- This property holds even when the terms of an expression are re-arranged, leading to interesting expressions like:
$$
(a\ ^\wedge\ b)\ ^{\wedge}\ a=b
$$

## Shift operations
- Left shift
- Right shift
	- Two types of right shift:
		- [[Logical right shifting of bit vector|Logical right shift]]
		- [[Arithmetic right shifting of bit vector|Arithmetic right shift]]

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 