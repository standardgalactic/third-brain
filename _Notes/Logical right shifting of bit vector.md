- Right shifting $x$ by $k$, fills the left end with **$k$ zeroes**.
- Assuming a $w-$[[Bit vectors|bit vector]], $x = \left[x_{w-1}, x_{w-2}, \ldots, x_0\right]$, $x\gg k$ will give:
	- $\left[0, \ldots, 0, x_{w-1}, x_{w-2}, \ldots x_k\right]$
- Almost all machine instructions use logical right shifts for unsigned data

## Example
- $x = [1100]$
- $x >> 2 = [\textit{00}\text{11}]$
	- *The italicised 0s indicate the values that fill the left end*

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 