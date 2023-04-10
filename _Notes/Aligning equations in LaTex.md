In order to align your equations based on a character (such as `=`), wrap the code inside `\begin{align}` and prefix the character with `&`
```latex
$$
\begin{align}
first\ equation &= 2\\
tiny\ eq &= 3
\end{align}
$$
```
$$
\begin{align}
first\ equation &= 2\\
tiny\ eq &= 3
\end{align}
$$
Also, as can be observed, using `\\` introduces a new line. Without using `\\` will render both the equations in the same line.

The `\\` only works when the code block is wrapped inside `begin{align}` and `end{align}`

---