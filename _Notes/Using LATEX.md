## Inline equation
An inline LATEX equation should be put inside single `$`.

```latex
$x = 2$ %(will output)
```
$x = 2$

---
## Block equation
Using `$$` will put the equation inside its own paragraph
```latex
$$x = 2$$ %(will output)
```
$$x = 2$$

---
## Adding space between normal text
If we do not use space inside a piece of text:
```latex
$this is a text without space$ %(outputs text without any space)
```
$this is a text without space$

To add space we need to use the `\` escape character
```latex
$this\ will\ have\ space$ %(text will have space)
```
$this\ will\ have\ space$

---
## Aligning equations
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