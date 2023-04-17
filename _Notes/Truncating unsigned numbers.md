- Assume that $x'$ is the result of truncating $x$
- If $x = B2U_w(\vec{x})$ and $x' = B2U_k(\vec{x'})$, then $x' = x \mod 2^k$.
	- This is equivalent to dropping the extra higher bits since the $(k+1)^{th}$ bit has the weight of $2^k$.

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- [[Representing different data types in binary]]