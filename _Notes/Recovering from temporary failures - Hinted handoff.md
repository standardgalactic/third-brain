## Hinted handoff
- If a server is down temporarily, another server will process requests temporarily.
- When the down server is up, changes will be pushed back to achieve data consistency.
- In the image below, reads and writes will be handled by $s_{3}$ temporarily. When $s_{2}$ comes back online, $s_{3}$ will hand the data back to $s_{2}$.
![[Pasted image 20230615172915.png]]