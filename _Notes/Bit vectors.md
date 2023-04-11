## Representing finite sets
- Suppose we want to represent a set $A \subseteq \{0, 1, 2,.. , w - 1\}$. Example: $A = \{0, 3, 5, 6\}$
- It can be represented with a bit vector $\left[a_{w-1}, \ldots, a_1, a_0\right]$ where $a_i = 1$ if and only if $i \in A$

### Example
- Consider the above set, $A = \{0, 3, 5, 6\}$
- It can be encoded by the vector, $a = [01101001]$. Notice that $a_0 = a_3 = a_5 = a_6 = 1$

## Set union and intersection operations
- [[Boolean Algebra|Boolean operations]] `|` and `&` correspond to set union and intersection operations when a set is encoded by vectors as shown above.

### Example
- Consider two sets:
	- $A = \{0,3,5,6\}$ encoded by $a = [01101001]$
	- $B = \{0, 2, 4, 6\}$ encoded by $b = [01010101]$
- Then the operation $a\ \&\ b = [01000001]$ encodes $A \cap B = \{0, 6\}$

## Sources
- [[Computer Systems - A Programmer's Perspective]]

## Related Notes
- 