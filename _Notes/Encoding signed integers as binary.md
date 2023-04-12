- Signed integers are generally encoded in two's complement.
	- The most significant bit (MSB) is interpreted as having a negative weight

## Two's complement encoding
### Formula
For a vector $\vec{x}=\left[x_{w-1}, x_{w-2}, \ldots, x_0\right]$, the corresponding integer can be calculated using the following formula (where $B2T_w$ means **binary to two's complement, length $w$ bits**)

$$
B2T_{w}(\vec{x})\doteq-x_{w-1}2^{w-1}+\sum_{i=0}^{w-2}x_{i}2^{i}
$$

### About the most significant bit (MSB)
- The MSB $x_{w-1}$ is called the **sign bit**
- Its weight is $-2^{w-1}$ - the negation of its weight in [[Encoding unsigned integers as binary|unsigned representation]]
- When it is set to $1$, the represented integral value is negative. When it is set to $0$, the represented integral value is non-negative.

### Examples
$$
B2T_4([1011]) = -1\cdot2^3 + 0\cdot2^2 + 1\cdot2^1 + 1\cdot2^0 = -8 + 0+2 + 1 = -5
$$

### Visual example

![[Pasted image 20230412123431.png]]

### Range of values
- Consider a $w$-bit two's complement number
- The least representable value is given be vector $[100\cdots0]$, having integer value $TMin_w \doteq -2^{w-1}$
- The largest value is given by the vector $[011\cdots1]$, which has the integer value of: $TMax_w \doteq \sum_{i=0}^{w-2}2^i = 2^{w-1} -1$

#### Example
- When $w=4$
$$
\begin{align}
TMin_4 &= -2^{4-1} = -2^3 = -8\\
TMax_4 &= 2^{4-1} - 1 = 8-1 = 7
\end{align}
$$

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 