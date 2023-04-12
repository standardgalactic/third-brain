- Assume a bit vector $\vec{x}=\left[x_{w-1}, x_{w-2}, \ldots, x_0\right]$
- Then, the unsigned integer encoded by $\vec{x}$ is given by, where the symbol $\text{B2U}_w$ means **binary to unsigned, $w$-bit [[Some definitions - buses, word size, main memory, program counter, operating system|word size]]**
$$
\text{B2U}_{w}({\vec{x}}) \doteq\sum_{i=0}^{w-1}x_{i}2^{i}
$$

## Examples
$$
\begin{aligned}
& B 2 U_4\left([0001]=0 \cdot 2^3+0 \cdot 2^2+0 \cdot 2^1+1 \cdot 2^0=0+0+0+1=1\right. \\
& B 2 U_4([0101])=0 \cdot 2^3+1 \cdot 2^2+0 \cdot 2^1+1 \cdot 2^0=0+4+0+1=5
\end{aligned}
$$

## Visual help
![[Pasted image 20230412115241.png]]

## Range of values
- If we have a bit vector $\vec{x}$ of word length, $w$ bits.
- The least value that can be represented is given by $\vec{x} = [00\cdots 00]$, which represents the integer $0$.
- The maximum value can be represented by $\vec{x} = [11 \cdots 11]$ which represents the integer:
$$
UMax_w = \sum_{i = 0}^{w-1}2^i = 2^w - 1
$$

### Example
- When $w=4$, $UMax_4 = 2^4 - 1 = 15$

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 