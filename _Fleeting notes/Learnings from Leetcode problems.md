- [[Common divisor also divides GCD]]
	- Source: https://leetcode.com/problems/greatest-common-divisor-of-strings/

- To reverse a string, use two pointers, `i` and `j`. `i` starts from the `0th` index and `j` starts backwards from the last character of the string. Keep swapping the `i`<sup>th</sup> and `j`<sup>th</sup> elements.
	- Source: https://leetcode.com/problems/reverse-vowels-of-a-string/

- In order to reverse a string, you can also iterate character by character on the string. Each character in the string can be added to a deque (`appendLeft`). Then, finally, you can join the characters