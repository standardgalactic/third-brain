Course link: Design Patterns in Python by Dmitri Nesteruk

# SOLID Principles
## Single Responsibility Principle
- A class should accept code modifications only for one reason which is related to the functionality of the class
- For example, if I have journal class, which is responsible for noting down a user's journal entries. 
	- It should not have methods which concern with saving the data to a persistent storage.
	- Because the way we save the data to the persistent storage might change in the future
- It is necessary to mostly think in terms of anticipated changes. We need to identify the changes which are more likely to happen - and then the class should be designed to handle only one reason to change.
	- We cannot design for every possible requirement that may come up in the future.
- Demo snippet: https://gist.github.com/ayushpoddar/46e5b1ffa4b7d135d042f26c3617e477
---
## Open Closed Principle
- Open for extension; closed for modification
- A good way to think about it is what if your class was packaged as a library and the end user could not make any changes.
	- How would they add a feature if they had to
- For example: If you have a class which builds products using attributes like size, color, etc.
	- And you have a `Filter` class that provides methods for filtering by a combination of these attributes
	- In this case, if the end user wants to create a new filter using some combination of attributes, they won't be able to do it easily
	- So, its better to provide the working blocks which they can use to extend the features you've provided out of the box
- Example snippet: https://gist.github.com/ayushpoddar/9e94c7c92e107dd878ebc4156bc7bb6e
---
## Liskov Substitution Principle
- If at all lines of code, I replace method calls to a class with method calls to the subclass, there should be no unexpected behaviour.
	- The client consuming the methods should feel no difference
- [This python snippet](https://gist.github.com/ayushpoddar/10fca60a5da447de9d36028e26257529) shows how the square class violates this principle
- 