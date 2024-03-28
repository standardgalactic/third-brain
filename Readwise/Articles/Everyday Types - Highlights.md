![rw-book-cover](https://readwise-assets.s3.amazonaws.com/static/images/article1.be68295a7e40.png)

## Metadata
- Author: [[typescriptlang.org]]
- Full Title: Everyday Types
- URL: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html

## Highlights
- JavaScript has three very commonly used [primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive): `string`, `number`, and `boolean`. Each has a corresponding type in TypeScript. As you might expect, these are the same names you’d see if you used the JavaScript `typeof` operator on a value of those types: ([View Highlight](https://read.readwise.io/read/01h5jsxcsqw2fsxkmqj601hwm9))
- The type names `String`, `Number`, and `Boolean` (starting with capital letters) are legal, but refer to some special built-in types that will very rarely appear in your code. *Always* use `string`, `number`, or `boolean` for types. ([View Highlight](https://read.readwise.io/read/01h5jsxtk567nfwxnrgaqpxnq8))
- To specify the type of an array like `[1, 2, 3]`, you can use the syntax `number[]`; this syntax works for any type (e.g. `string[]` is an array of strings, and so on). You may also see this written as `Array<number>`, which means the same thing. ([View Highlight](https://read.readwise.io/read/01h5jtk4avawmvqer6azpmeewz))
- TypeScript also has a special type, `any`, that you can use whenever you don’t want a particular value to cause typechecking errors.
  When a value is of type `any`, you can access any properties of it (which will in turn be of type `any`), call it like a function, assign it to (or from) a value of any type, or pretty much anything else that’s syntactically legal ([View Highlight](https://read.readwise.io/read/01h5jtp7p2bhnbee9r0ncrdphg))
- When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to `any`. ([View Highlight](https://read.readwise.io/read/01h5jtq4ms6ydjqf9tk09nk5q2))
- Use the compiler flag [`noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny) to flag any implicit `any` as an error. ([View Highlight](https://read.readwise.io/read/01h5jtqayq9k6tjrj1m28ybccz))
- When you declare a variable using `const`, `var`, or `let`, you can optionally add a type annotation to explicitly specify the type of the variable:
  ts
  ` let myName: string = "Alice"; ` ([View Highlight](https://read.readwise.io/read/01h5jtrfgngj47yjmq9xmk8c3f))
- Wherever possible, TypeScript tries to automatically *infer* the types in your code. For example, the type of a variable is inferred based on the type of its initializer:
  ts
  ` // No type annotation needed -- 'myName' inferred as type 'string' let myName = "Alice"; ` ([View Highlight](https://read.readwise.io/read/01h5jtrr0we1d7b8gprhvpkg20))
- When you declare a function, you can add type annotations after each parameter to declare what types of parameters the function accepts. Parameter type annotations go after the parameter name: ([View Highlight](https://read.readwise.io/read/01h5jtsra5r8h5jdhz48g4gdn8))
- // Parameter type annotation
  function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
  } ([View Highlight](https://read.readwise.io/read/01h5jtsxjw1s1mwdbvv076j45e))
- You can also add return type annotations. Return type annotations appear after the parameter list:
  ts
  ` function getFavoriteNumber(): number { return 26; } ` ([View Highlight](https://read.readwise.io/read/01h5jttm3pexzvr71se4hkckh0))
- Much like variable type annotations, you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its `return` statements. ([View Highlight](https://read.readwise.io/read/01h5jtv8a38v9xdw0s6grvhs91))
- Anonymous functions are a little bit different from function declarations. When a function appears in a place where TypeScript can determine how it’s going to be called, the parameters of that function are automatically given types. ([View Highlight](https://read.readwise.io/read/01h5jtxqmym9kvcn282ns7tqet))
- const names = ["Alice", "Bob", "Eve"];
  // Contextual typing for function - parameter s inferred to have type string
  names.forEach(function (s) {
  console.log(s.toUpperCase());
  });
  // Contextual typing also applies to arrow functions
  names.forEach((s) => {
  console.log(s.toUpperCase());
  }); ([View Highlight](https://read.readwise.io/read/01h5jtxw2n2s43e3jxzww252xm))
- Even though the parameter `s` didn’t have a type annotation, TypeScript used the types of the `forEach` function, along with the inferred type of the array, to determine the type `s` will have.
  This process is called *contextual typing* because the *context* that the function occurred within informs what type it should have. ([View Highlight](https://read.readwise.io/read/01h5jty2srj8ace7skyxcc57dh))
