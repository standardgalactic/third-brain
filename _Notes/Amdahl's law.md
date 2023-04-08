- Observation made by **Gene Amdahl**

## Observation
- When we speed up one part of a system, the effect on the overall system performance depends on:
	- Significance of that part
	- How much did the part speed up

## Mathematical formula
### Assumptions
- Assume that $T_{old}$ is the time required by the overall system to perform an operation before the improvement
- $\alpha$ - Fraction of the overall time consumed by the part that will be improved
- $k$ - Factor by which the part is improved

### Derivation
- Time originally required by the improved part $= \alpha T_{old}$
- Time require
$$
\begin{align}
Time\ originally\ required\ by\ the\ improved part &= \alpha T_{old}\\
Time\ required\ by\ the\ part\ after\ improvement &= \dfrac {\alpha T_{old}} {k}
\end{align}
$$

## Attachments
- 

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 