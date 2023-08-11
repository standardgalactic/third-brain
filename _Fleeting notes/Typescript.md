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

#### Function types
What if we want to hold a function in a variable. The variable needs a type that represents the function. This is how to define a function type:

```ts
type numberToNumber = (n: number) => number;
const double: numberToNumber = (n: number): number => {
  return n * 2;
}
// Equivalent to 👇🏽
function double(n: number): number {
  return n * 2
}
const myDouble: (n: number) => number = double;
```

When defining a function with an explicit function type, we can only use the arrow function syntax. Also, the name of the parameter in the function type is not important.

### Object types
Used to define types for objects. The following example will make it clear:

```ts
type User = {
  email: string,
  admin: boolean
};

let amir: User = {
  email: 'amir@example.com',
  admin: true,
};

amir.admin;
```

### Representing Arrays
An array of numbers is `number[]`.

```ts
let numbers: number[] = [1,2,3]
```

It can also be represented like: `Array<number>`

```ts
let numbers: Array<number> = [1,2,3]
let numbersNumbers: Array<Array<number>> = [[1,2], [3,4]]
```

### Tuples
Tuple is a special array. Tuple defined with length = 2 must have exactly two elements, not 1 or 3
```ts
let numbers: [number, number] = [1, 2]
```

Tuple can hold elements of different types.

```ts
let numbers: [number, string] = [1, 'a']
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