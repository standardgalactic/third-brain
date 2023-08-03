- The type comes after the `:` sign.
```ts
let sum: number = 1 + 1; // number is a type

// sum => 2
```
- The TS compiler throws away the types after compilation. It means that there is no way to inspect types at runtime. Types are only used during type checking, then they're thrown away. This is called **type erasure**

## Features
### Type inference
Consider this
```ts
let n = 2 + 2;

//n=> 4
```
In the above code, TS will infer that `n` should be of `number` type. It won't allow a string to be assigned to `n` later in the code. So,

```ts
let n = 1 + 1;
let s: string = n;

//=> Error
```

### User-defined types
You can define your own types using the keyword `type`. Conventionally, user-defined type names are UpperCamelCased.

```ts
type MyStringType = string;
let s: MyStringType = 'hello'; // s is basically a string
```

#### Caveat
`type MyStringType = string` is a Typescript syntax. After compilation to JS, this line will be removed. If the program consists of just this line, then the program will return `undefined`. In other words, the return value of this line is `undefined`

### Type definition for functions
Here's how we can define return types for functions:

```ts
function double(x: number): number {
  return 2 * x;
}

// Arrow function definition
const add1 = (n: number): number => n + 1;
```

### Representing Arrays
An array of numbers is `number[]`.

```ts
let numbers: number[] = [1,2,3]
```

## List of types
- number
- string
- boolean

## How is it better than JS?
- In JS, `'a' * 'b'` will output `NaN`. Typescript will not allow this to happen
- Expression like `1 + true` in JS will return `2`, but TS will throw error

## Peculiarities
- Addition of number and string will coerce number to string. *Similar to JS*
```ts
1 + '1'

//=> '11'
```