

- Unsigned multiplication:
	- Multiplication of two unsigned $w$-bit numbers can require as many as $2w$ bits to represent the product. So, the result is truncated.
	- For $x$ and $y$ such that $0 \leq x, y \leq UMax_{w}$, $x *_{w}^u y = (x \cdot y) \mod 2^w$
	- 