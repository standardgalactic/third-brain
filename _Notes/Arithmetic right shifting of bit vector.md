- Right shifting $x$ by $k$, fills the left end with $k$ repetitions of the most significant bit.
- Assuming a $w-$[[Bit vectors|bit vector]], $x = \left[x_{w-1}, x_{w-2}, \ldots, x_0\right]$, $x\gg k$ will give:
	- $\left[x_{w-1}, \ldots, x_{w-1}, x_{w-1}, x_{w-2}, \ldots x_k\right]$
- Almost all machine instructions use arithmetic right shifts for signed data

## Example
- $x = [1100]$
	- Here, `MSB = 1`
- $x >> 2 = [\textit{11}\text{11}]$
	- *The italicised 1s indicate the values that fill the left end*

### Another example
- $x = [0100]$
	- Here, `MSB = 0`
- $x >> 2 = [\textit{00}\text{01}]$
	- *The italicised `0`s indicate the values that fill the left end*

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 