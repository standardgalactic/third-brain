- Functional programming is good for boring line of business applications (BLOBAs)
	- Must haves for BLOBA
		- Express requirements clearly
		- Rapid development cycle
		- High quality deliverables
- Domain driven design:
	- your model and domain experts' model should be the same
	- Communication (UNIONIZE):
		- Bounded context:
			- In Sales, "product" means something you can sell. In warehouse, it can mean some good
			- In Marketing, "customer" means somebody you can send email to. In finance, it is someone who owes you money
			- Divide the business into chunks bound by contexts, where a word or a concept means the same
		- Ubiquitous language
			- every domain has its own language or terms which mean something in that domain or context

![[Pasted image 20221108162204.png]]
In the above image, there is no persistence (database). It just defines the domain.

- The design is the code, the code is the design
- Composable types:
	- new types are constructed by combining otehr types using two basic operations
	- ![[Pasted image 20221108162631.png]]
	- ![[Pasted image 20221108162704.png]]
	- ![[Pasted image 20221108162748.png]]
	- ![[Pasted image 20221108162929.png]]
	- ![[Pasted image 20221108163007.png]]
	- ![[Pasted image 20221108163239.png]]
	- ![[Pasted image 20221108163304.png]]
	- ![[Pasted image 20221108163347.png]]

- In many languages, `null` is accepted as part of a data type like string. Not so in functional languages
- ![[Pasted image 20221108163643.png]]
- But, this cannot be scaled. Every type would want an optional type
- ![[Pasted image 20221108163748.png]]
- ![[Pasted image 20221108164000.png]]
- ![[Pasted image 20221108164111.png]]
- ![[Pasted image 20221108164130.png]]
- This is kind of self documenting
- ![[Pasted image 20221108164435.png]]
- ![[Pasted image 20221108164542.png]]
- ![[Pasted image 20221108164751.png]]
- ![[Pasted image 20221108164800.png]]
- ![[Pasted image 20221108164941.png]]
- New requirement: 
- ![[Pasted image 20221108165023.png]]
- ![[Pasted image 20221108165058.png]]
- ![[Pasted image 20221108165134.png]]
- ![[Pasted image 20221108165146.png]]
- ![[Pasted image 20221108165238.png]]
- One more tweak:
- ![[Pasted image 20221108165356.png]]
- ![[Pasted image 20221108165429.png]]

## source
https://fsharpforfunandprofit.com/ddd/