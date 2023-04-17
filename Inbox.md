- Negation of an unsigned number, $x$:
$$
-_{w}^{w}\,x=\left\{\begin{array}{l l}{{x,}}&{{x=0}}\\ {{2^{w}-x,}}&{{x>0}}\end{array}\right.
$$
- Modular addition forms a mathematical structure known as an abelian group, named after the Norwegian mathematician Niels Henrik Abel (1802-1829).
	- It is commutative, associative, has an identity element 0, and every element has an additive inverse
- Addition of two's complement numbers
	- For integer values $x$ and $y$ in the range $-2^{w-1}\le x,\,y\le2^{w-1}-1$
![[Pasted image 20230416123253.png]]

![[Pasted image 20230416123425.png|Case 1 and Case 4 demonstrate overflow situations]]

![[Pasted image 20230416125238.png]]

- Detecting overflow in two's complement addition
	- When $s = x +_{w}^t y$, then $s$ is a positive overflow if and only if $x > 0$ and $y > 0$ but $s \leq 0$. The computation is a negative overflow if and only if $x < 0$ and $y < 0$ but $s \geq 0$
- Two's complement negation: 
	- For $x$ in the range $TMin_{w} \leq x \leq TMax_{w}$, it's two's complement negation is given by:

$$
-_{w}^{t}x={\left\{\begin{array}{l l}{T M i n_{w},}&{x=T M i n_{w}}\\ {-x,}&{x>T M i n_{w}}\end{array}\right.}
$$

- Performing two's complement negation in binary form:
	- Complement the bits and increment the result by 1.
		- `-x = ~x + 1`
![[Pasted image 20230417132857.png]]
- Second way is to complement each bit that is to the left of rightmost 1. You can use the above table for examples
- Unsigned multiplication:
	- Multiplication of two unsigned $w$-bit numbers can require as many as $2w$ bits to represent the product. So, the result is truncated.
	- For $x$ and $y$ such that $0 \leq x, y \leq UMax_{w}$, $x *_{w}^u y = (x \cdot y) \mod 2^w$
- Two's complement multiplication:
	- For $x$ and $y$ such that $TMin_{w} \leq x, y \leq TMax_{w}$, $x *_{w}^t y = \text{U2T}_{w}((x \cdot y) \mod 2^w)$
	- 