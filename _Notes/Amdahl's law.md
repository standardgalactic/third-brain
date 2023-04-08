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
- $T_{new}$ - Time required by the overall system after the improvement

### Derivation
$$
\begin{align}
Time\ originally\ required\ by\ the\ improved part &= \alpha T_{old}\\
Time\ required\ by\ the\ part\ after\ improvement &= \dfrac {\alpha T_{old}} {k}\\
\therefore T_{new} &= T_{old} - \alpha T_{old} + \dfrac{\alpha T_{old}}{k}\\
&= T_{old}\left[(1 - \alpha) + \dfrac{\alpha}{k}\right]\\
Speedup\ (S) &= \dfrac{1}{(1 - \alpha) + \dfrac{\alpha}{k}}
\end{align}
$$

## Example
- Consider the case where a part of the system initially consumed $\text{60

## Attachments
- 

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 