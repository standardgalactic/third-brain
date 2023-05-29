![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article2.74d541386bbf.png)

## Metadata
- Author: [[Eric Normand]]
- Full Title: Grokking Simplicity: Taming Complex Software With Functional Thinking
- URL: https://bagerbach.com/books/grokking-simplicity

## Highlights
- Functional programming is a programming paradigm that uses mathematical functions & aims to avoid side effects by using pure functions. ([View Highlight](https://read.readwise.io/read/01gzv23qdj1d8fav7k8man104s))
- **Functional thinking** is the set of skills and ideas used by functional programmers to solve problems with software. ([View Highlight](https://read.readwise.io/read/01gzv243xqqnzve4p81xe9vbk7))
- We classify code into 3 categories.
  1. **Actions**: depend on when they are called or how many times they are called. E.g. you wouldn't want to call a function that makes a web request twice unintentionally, that could be costly.
  2. **Calculations**: no matter how many times you call these or when you call them, given the same inputs, they'll give the same outputs.
  3. **Data** is simply raw data. ([View Highlight](https://read.readwise.io/read/01gzv251xmw44drf79fkstz207))
- You want to separate calculations from actions. ([View Highlight](https://read.readwise.io/read/01gzv25b66q4wj5qmxn4rfy4pt))
- Actions have implicit inputs and outputs. E.g. reading / modifying global variables. Calculations do not have these. ([View Highlight](https://read.readwise.io/read/01gzv25pze5s2hag7z2qvwqxky))
- You can often replace implicit inputs with arguments, and implicit outputs by return values. ([View Highlight](https://read.readwise.io/read/01gzv25v2mff7mmg9h6x3gm5zd))
- In stratified design, each layer builds on those beneath it.
  Towards the top layers, changes occur frequently. Towards the bottom layers, changes are seldom. The main layers are business rules (top) → domain rules (mid) → tech stack (bot).
  Business rules can change frequently, whereas the rules for the domain change less frequently. And finally, the rules for the tech stack rarely changes... e.g. JS objects, which rarely change (not the object instances, but the concept of objects). ([View Highlight](https://read.readwise.io/read/01gzv28v99dmxdbmcgtmf4edqb))
- The longer the arrow (dependency between layers) is (more layers between dependencies), the harder it is to change. If something on the top layer relies on something on the bottom layer directly, then the bottom layer code becomes very hard to change. ([View Highlight](https://read.readwise.io/read/01gzv29sy9s7193a43s8z86pnh))
- Code at the bottom is more reusable as well. As you move further up, the code becomes increasingly more niche to particular business rules & logic. ([View Highlight](https://read.readwise.io/read/01gzv29zhstah8pvvd2wyth32s))
