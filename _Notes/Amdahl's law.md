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
- Consider the case where a part of the system initially consumed $\text{60\%}$ of the time. $(\alpha = 0.6)$
- It is sped up by the factor of 3 $(k = 3)$
- Then the overall system sped up by:
$$
\begin{align}
S &= \dfrac{1}{1 - 0.6 + \dfrac{0.6}{3}}
\\
&= \dfrac{1}{0.4 + 0.2}
\\
&= \dfrac{1}{0.6} = \dfrac{10}{6} = \dfrac{5}{3}
\\
&= 1.67\text{x}
\end{align}
$$

$$
\text{Thus the speedup, }S = 1.67\textbf{x}
$$

## Implication
When $k = \infty$, $S_{\infty} = \dfrac{1}{1 - \alpha}$.

Thus, high improvement can only be achieved by improving large parts of the system

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 