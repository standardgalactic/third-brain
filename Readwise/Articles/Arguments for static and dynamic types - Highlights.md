![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article3.5c705a01b476.png)

## Metadata
- Author: [[destroyallsoftware.com]]
- Full Title: Arguments for static and dynamic types
- URL: https://www.destroyallsoftware.com/compendium/types?share_key=c7c716b02817795a

## Highlights
- The terms "strong" and "weak" are extremely ambiguous. Here are some ways that the terms are used:
  • Sometimes, "strong" means "static". That's easy enough, but it's better to say "static" instead because most of us agree on its definition.
  • Sometimes, "strong" means "doesn't convert between data types implicitly". For example, JavaScript allows us to say `"a" - 1`, which we might call "weak typing". But almost all languages provide some level of implicit conversion, allowing automatic integer-to-float conversion like `1 - 1.1`. In practice, most people using "strong" in this way have drawn a line between "acceptable" and "unacceptable" conversions. There is no generally accepted line; they're all arbitrary and specific to the person's opinions.
  • Sometimes, "strong" means that there's no way to escape the language's type rules.
  • Sometimes, "strong" means memory-safe. C is a notable example of a memory-unsafe language. If `xs` is an array of four numbers, C will happily allow code that does `xs[5]` or `xs[1000]`, giving whatever value happens to be in the memory addresses after those used to store `xs`. ([View Highlight](https://read.readwise.io/read/01hq5bfkghnsftazkkkkxq9d57))
- When compiling statically typed code, syntax is checked first, as in any compiler. Types are checked second. This means that a static language will sometimes give us one syntax error, but fixing that error leads to 100 type errors. Fixing the syntax error didn't create those 100 type errors; the compiler was just unable to check the types until the syntax was fixed. ([View Highlight](https://read.readwise.io/read/01hq633zjyfjtrta30evfq2fec))
- An entry of "Depends" in the "Implicit Conversions" column means that the strong/weak distinction depends on which conversions we consider acceptable. ([View Highlight](https://read.readwise.io/read/01hq5c8psthr6jeqpbstp5d1ke))
    - Note: https://dl.dropboxusercontent.com/s/9sdh45fiawa5lcg/Screenshot%202024-02-21%20at%2015248%20PM_9sdh45fiawa5lcg.png?dl=0
