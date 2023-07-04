- [[Common divisor also divides GCD]]
	- Source: https://leetcode.com/problems/greatest-common-divisor-of-strings/

- To reverse a string, use two pointers, `i` and `j`. `i` starts from the `0th` index and `j` starts backwards from the last character of the string. Keep swapping the `i`<sup>th</sup> and `j`<sup>th</sup> elements.
	- Source: https://leetcode.com/problems/reverse-vowels-of-a-string/

- In order to reverse a string, you can also iterate character by character on the string. Each character in the string can be added to a deque (`appendLeft`). Then, finally, you can join the characters
- Questions requiring you to find a sub-array or a sub-string generally might involve creating a prefix Sum (cumulative sum).

# Linked list
## Finding middle node
Use two pointers: fast and slow

fast pointer jumps two nodes at a time; slow jump only to the next node

If the fast pointer becomes `None` or reaches the last node, the slow pointer gives the middle node (first node of the second half in case of even number of nodes)

```python
    def find_middle_node(self):
        slow = fast = self.head
        while fast is not None and fast.next is not None:
            fast = fast.next.next
            slow = slow.next
        return slow
```

## Detecting a loop
Again use the fast and slow pointers.

If they meet at any point, then you have a loop. This is called **Floyd's cycle finding algorithm**

```python
    def has_loop(self):
        slow = fast = self.head
        while fast is not None and fast.next is not None:
            if slow == fast:
                return True
            slow = slow.next
            fast = fast.next.next
        return False
```