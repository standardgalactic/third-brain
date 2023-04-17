 - For $x$ and $y$ such that $0 \leq x, y < 2^w$:
$$
x+_{w}^{\mathrm{u}}y={\left\{\begin{array}{l l}{x+y,}&{x+y<2^{w}}&{{\mathrm{Normal}}}\\ {x+y-2^{w},}&{2^{w}\leq x+y<2^{w+1}}&{{\mathrm{Overflow}}}\end{array}\right.}
$$
- This forms an [[Abelian group]]

## Visual demonstration
![[Pasted image 20230416094138.png|The grey arrow is an overflow]]

## Detecting overflow
- The sum of two unsigned numbers, $s = x +_{w}^{u} y$ can be detected as an overflow if $s < x$ (or equivalently, $s < y$). 

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 