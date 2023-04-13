## Conversion from two's complement to unsigned
- Assume an integer, $x$, which is encoded in two's complement form in a $w$-bit word $\vec{x}$, such that $TMin_w \leq x \leq TMax_w$, then the unsigned integer represented by the bit vector $\vec{x}$ will be given by:
$$
T2U_{w}(x)={\left\{\begin{array}{l l}{x+2^{w},}&{x<0}\\ {x,}&{x\geq0}\end{array}\right.}
$$

### Visual representation
![[Pasted image 20230413113826.png]]

## Conversion from unsigned to two's complement
- For an unsigned integer $u$ such that $0 \leq u \leq UMax_w$ represented by $\vec{u}$, the corresponding two's complement integer is given by:
$$
U2T_{w}(u)=\left\{{\begin{array}{l l}{u,}&{u\leq T M a x_{w}}\\ {u-2^{w},}&{u>T M a x_{w}}\end{array}}\right.
$$

### Visual representation
![[Pasted image 20230413114341.png]]

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- [[Encoding signed integers as binary]]
- [[Encoding unsigned integers as binary]]