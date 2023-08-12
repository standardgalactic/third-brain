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

### Generic functions
We may have a situation where we want the function to be able to accept parameters of different data types. For example, our function might be returning the first element of a given array. The array could be an array of numbers, strings, etc.

We can define such generic functions using the `<>` syntax. Like in the case of [[#Representing Arrays|arrays]], `<>` creates a type hole. It must be filled by a type. While defining the function, we can fill it using any arbitrary type. In the example below, we named the arbitrary type as `T`. The type hole is actually filled when the function is called as shown below where the type hole is filled with `boolean`.

The generic type parameter need not necessarily be `T`. It can be anything. The convention is that the name should be UpperCamelCased.

```ts
function first<T>(elements: Array<T>): T {
	return elements[0];
}

first<boolean>([true, false])
//=> true

first<numbers>([1, 2])
//=> 1
```

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

Array of arrays can be also represented this way:

```ts
const stringArrayOfArrays: (string[])[] = [['a'], ['b']];

// The round brackets aren't necessary. They are just given for clarity. It is equivalent to:
const stringArrayOfArrays: string[][] = [['a'], ['b']]
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

### Union types
The `|` operator is used to accept multiple types. `Type1 | Type2` means either `Type1` or `Type2`.

```ts
// x can be string or number 
const x: string | number = 'hello'
```

We can also define custom types for unions.

```ts
// variables with ZipCode type can be string or number
type ZipCode = string | number;
```

#### Caveat
We can't mix union types. A value with type `string | number` cannot be assigned to a variable with type `number`. 

```ts
function getZipCode(): string | number {
 return 102;
}

let zip: number = getZipCode();
// This will throw type error
```

However, the vise-versa is fine. A value with type `string` can be assigned to a variable with type `string | number`.

As a real world analogy, if we have a drawer labeled as knives and we have a handful of knives and forks. We cannot put the knives and forks in the drawer. 
But, if we have a drawer labeled as "knives and forks", and we have a handful of knives only, we can put the knives in the drawer without violating any label.

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

## Nice to know JS and TS features
### Spread syntax
Given two arrays `a1` and `a2`, the result of `[...a1, ...a2]` gives an array with all the elements of `a1` followed by the elements of `a2`

```ts
const a1: number[] = [1,2,3];
const a2: number[] = [4,5,6];

const a: number[] = [...a1, ...a2];
//a => [1,2,3,4,5,6]
```