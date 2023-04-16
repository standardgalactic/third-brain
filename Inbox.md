- Truncating a $w$-bit number to a $k$-bit number:
	- Drop the higher order extra bits
- Truncating unsigned number:
	- If $x = B2U_w(\vec{x})$ and $x' = B2U_k(\vec{x'})$, then $x' = x \mod 2^k$.
	- This is equivalent to dropping the extra higher bits since the $(k+1)^{th}$ bit has the weight of $2^k$.
- Truncating two's complement number:
	- If $x = B2U_w(\vec{x})$ and $x' = B2U_k(\vec{x'})$, then $x' = U2T_k(x \mod 2^k)$
 - Addition of unsigned numbers:
	 - For $x$ and $y$ such that $0 \leq x, y < 2^w$:
$$
x+_{w}^{\mathrm{u}}y={\left\{\begin{array}{l l}{x+y,}&{x+y<2^{w}}&{{\mathrm{Normal}}}\\ {x+y-2^{w},}&{2^{w}\leq x+y<2^{w+1}}&{{\mathrm{Overflow}}}\end{array}\right.}
$$
![[Pasted image 20230416094138.png]]
- The sum of two unsigned numbers, $s = x +_{w}^{u} y$ can be detected as an overflow if $s < x$ (or equivalently, $s < y$). 
- Negation of an unsigned number, $x$:
$$
-_{w}^{w}\,x=\left\{\begin{array}{l l}{{x,}}&{{x=0}}\\ {{2^{w}-x,}}&{{x>0}}\end{array}\right.
$$
- Modular addition forms a mathematical structure known as an abelian group, named after the Norwegian mathematician Niels Henrik Abel (1802-1829).
	- It is commutative, associative, has an identity element 0, and every element has an additive inverse