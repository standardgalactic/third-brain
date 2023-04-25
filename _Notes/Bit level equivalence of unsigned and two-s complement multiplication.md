- Let $\vec{x}$ and $\vec{y}$ be bit vectors of length $w$
- Define $x$ and $y$ as the values represented by these bits in [[Encoding signed integers as binary|two's complement form]]
	- $x = B 2 T_{w}(\vec{x})$ and $B 2 T_{w}(\vec{y})$
- Let $x'$ and $y'$ as the values represented by the bits $\vec{x}$ and $\vec{y}$ in [[Encoding unsigned integers as binary|unsigned form]]
	- $x' = B 2U_{w}(\vec{x})$ and $y' = B 2U(\vec{y})$
 
$$
T 2B_{w}(x *_{w}^t y) = U 2B(x' *_{w}^u y')
$$

## Demonstration
![[Pasted image 20230425095807.png|Although the bit representations of full products may differ; the truncated results match]]

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- [[Multiplying signed integers]]
- [[Multiplying unsigned integers]]