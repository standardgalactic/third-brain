- Multiplication of two unsigned $w$-bit numbers can require as many as $2w$ bits to represent the product. So, the result is truncated.
- For $x$ and $y$ such that $TMin_{w} \leq x, y \leq TMax_{w}$, 
$$
x *_{w}^t y = \text{U2T}_{w}((x \cdot y) \mod 2^w)
$$
- Here, $\text{U2T}$ implies that the result should be [[Conversion between signed and unsigned integer|converted from unsigned to signed integer]]

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 