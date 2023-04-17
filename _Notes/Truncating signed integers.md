- Assume that $x'$ is the result of truncating $x$, then:
	- If $x = B2U_w(\vec{x})$ and $x' = B2U_k(\vec{x'})$, then $x' = U2T_k(x \mod 2^k)$

## Explanation of the formula
- Here, $x \mod 2^{k}$ will need to be first treated as an unsigned number.
- Then, applying $U2T_{k}$ (unsigned-to-two's complement, $k$-bit word) on the above result, will convert the unsigned result to a signed number. This basically changes the weight of the highest bit (MSB) from $2^{k-1}$ to $-2^{k-1}$.

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- [[Representing different data types in binary]] 