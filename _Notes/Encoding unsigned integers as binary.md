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

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 