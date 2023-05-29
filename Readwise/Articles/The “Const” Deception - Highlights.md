![rw-book-cover](https://www.joshwcomeau.com/images/og-default.png)

## Metadata
- Author: [[joshwcomeau.com]]
- Full Title: The “Const” Deception
- URL: https://www.joshwcomeau.com/javascript/the-const-deception/

## Highlights
- When we use the `let` keyword to create a variable, we're able to change which “thing” that label refers to. ([View Highlight](https://read.readwise.io/read/01h04vfs00wvca7tep74zk070y))
- ![](https://www.joshwcomeau.com/images/the-const-deception/reassignable-thumbnail.png) ([View Highlight](https://read.readwise.io/read/01h04vfssdrbhnge96e9mvy4x1))
- This is known as *re-assignment.* We're saying that actually, the `fruits` label should refer to an *entirely different value:* ([View Highlight](https://read.readwise.io/read/01h04vfvjny8hbkdf2k989cx2t))
- By contrast, variables created with `const` **cannot be reassigned:** ([View Highlight](https://read.readwise.io/read/01h04vgch6hdsgacfz70qfwqb5))
- ![](https://www.joshwcomeau.com/images/the-const-deception/locked-variable-thumbnail.png) ([View Highlight](https://read.readwise.io/read/01h04vgdc9at0ytaz2gbn26zhw))
- **Here's the thing, though:** we're still allowed to modify the data itself! As long as the label remains intact. ([View Highlight](https://read.readwise.io/read/01h04vgp6qcg269qksm29m211q))
- When we create a constant with `const`, we can be 100% sure that the variable will never be *re-assigned*, but no promises are made when it comes to mutation. **`const` doesn't block mutation at all.** ([View Highlight](https://read.readwise.io/read/01h04vjyy4qs2vm4gx4gg08e2k))
- As far as I know, `Object.freeze()` is bulletproof. There's no way to modify an object/array that has been frozen using this method. ([View Highlight](https://read.readwise.io/read/01h04vknhvmng8q4qp3d3wrfre))
- **Here's the deal:** all primitive data types in JavaScript are *immutable*. It's impossible to "edit" the value of a number. We can only reassign the variable to a different value. ([View Highlight](https://read.readwise.io/read/01h04vmknw0ryjv8q9bee9w4ee))
