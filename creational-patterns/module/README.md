# Module Pattern
## Split up your code into smaller, reusable pieces
As your application and codebase grow, it becomes increasingly important to keep your code maintainable and separated. The module pattern allows you to split up your code into smaller, reusable pieces.

Besides being able to split your code into smaller reusable pieces, modules allow you to keep certain values within your file private. Declarations within a module are scoped (encapsulated) to that module , by default. If we don’t explicitly export a certain value, that value is not available outside that module. This reduces the risk of name collisions for values declared in other parts of your codebase, since the values are not available on the global scope.

### ES2015 Modules
ES2015 introduced built-in JavaScript modules. A module is a file containing JavaScript code, with some difference in behavior compared to a normal script.
Let's look at an example of a module called math.js, containing mathematical functions.
```
function add(x, y) {
    return x + y;
}
function multiply(x) {
    return x * 2;
}
function subtract(x, y) {
    return x - y;
}
function square(x) {
    return x * x;
}
```
We have a math.js file containing some simple mathematical logic. We have functions that allow users to add, multiply, subtract, and get the square of values that they pass.

However, we don’t just want to use these functions in the math.js file, we want to be able to reference them in the index.js file! Currently, an error gets thrown inside the index.js file: there are no functions within the index.js file called add, subtract, multiply or square. We are trying to reference functions that are not available in the index.js file.

In order to make the functions from math.js available to other files, we first have to export them. In order to export code from a module, we can use the export keyword. One way of exporting the functions, is by using named exports: we can simply add the export keyword in front of the parts that we want to publicly expose. In this case, we’ll want to add the export keyword in front of every function, since index.js should have access to all four functions.
```
export function add(x, y) {
    return x + y;
}

export function multiply(x) {
    return x * 2;
}

export function subtract(x, y) {
    return x - y;
}

export function square(x) {
    return x * x;
}
```
We just made the add, multiply, subtract, and square functions exportable! However, just exporting the values from a module is not enough to make them publicly available to all files. In order to be able to use the exported values from a module, you have to explicitly import them in the file that needs to reference them.

We have to import the values on top of the index.js file, by using the import keyword. To let javascript know from which module we want to import these functions, we need to add a from value and the relative path to the module.
```
import { add, multiply, subtract, square } from "./math.js";
```
We just imported the four functions from the math.js module in the index.js file! Let’s try and see if we can use the functions now!
```
function add(x, y) {
    return x + y;
}
function multiply(x) {
    return x * 2;
}
function subtract(x, y) {
    return x - y;
}
function square(x) {
    return x * x;
}
```
The reference error is gone, we can now use the exported values from the module!

A great benefit of having modules, is that we only have access to the values that we explicitly exported using the export keyword. Values that we didn't explicitly export using the export keyword, are only available within that module.

Let's create a value that should only be referencable within the math.js file, called privateValue.
```
const privateValue = "This is a value private to the module!";

export function add(x, y) {
    return x + y;
}

export function multiply(x) {
    return x * 2;
}

export function subtract(x, y) {
    return x - y;
}

export function square(x) {
    return x * x;
}
```
Notice how we didn't add the export keyword in front of privateValue. Since we didn’t export the privateValue variable, we don’t have access to this value outside of the math.js module!
```
import { add, multiply, subtract, square } from "./math.js";

console.log(privateValue);
/* Error: privateValue is not defined */
```
By keeping the value private to the module, there is a reduced risk of accidentally polluting the global scope. You don't have to fear that you will accidentally overwrite values created by developers using your module, that may have had the same name as your private value: it prevents naming collisions.
Sometimes, the names of the exports could collide with local values.
```
import { add, multiply, subtract, square } from "./math.js";

function add(...args) {
    return args.reduce((acc, cur) => cur + acc);
} /* Error: add has  already been declared */

function multiply(...args) {
    return args.reduce((acc, cur) => cur * acc);
}
/* Error: multiply has already been declared */
```
In this case, we have functions called add and multiply in index.js. If we would import values with the same name, it would end up in a naming collision: add and multiply have already been declared! Luckily, we can rename the imported values, by using the as keyword.

Let's rename the imported add and multiply functions to addValues and multiplyValues.
```
import {
    add as addValues,
    multiply as multiplyValues,
    subtract,
    square
} from "./math.js";

function add(...args) {
    return args.reduce((acc, cur) => cur + acc);
}

function multiply(...args) {
    return args.reduce((acc, cur) => cur * acc);
}

/* From math.js module */
addValues(7, 8);
multiplyValues(8, 9);
subtract(10, 3);
square(3);

/* From index.js file */
add(8, 9, 2, 10);
multiply(8, 9, 2, 10);
```
Besides named exports, which are exports defined with just the export keyword, you can also use a default export. You can only have one default export per module.

Let’s make the add function our default export, and keep the other functions as named exports. We can export a default value, by adding export default in front of the value.
```
export default function add(x, y) {
    return x + y;
}

export function multiply(x) {
    return x * 2;
}

export function subtract(x, y) {
    return x - y;
}

export function square(x) {
    return x * x;
}
```
The difference between named exports and default exports, is the way the value is exported from the module, effectively changing the way we have to import the value.

Previously, we had to use the brackets for our named exports: import { module } from 'module'. With a default export, we can import the value without the brackets: import module from 'module'.
```
import add, { multiply, subtract, square } from "./math.js";

add(7, 8);
multiply(8, 9);
subtract(10, 3);
square(3);
```
The value that's been imported from a module without the brackets, is always the value of the default export, if there is a default export available.

Since JavaScript knows that this value is always the value that was exported by default, we can give the imported default value another name than the name we exported it with. Instead of importing the add function using the name add, we can call it addValues, for example.
```
import addValues, { multiply, subtract, square } from "./math.js";

addValues(7, 8);
multiply(8, 9);
subtract(10, 3);
square(3);
```
Even though we exported the function called add, we can import it calling it anything we like, since JavaScript knows you are importing the default export.

We can also import all exports from a module, meaning all named exports and the default export, by using an asterisk * and giving the name we want to import the module as. The value of the import is equal to an object containing all the imported values. Say that I want to import the entire module as math.
```
import * as math from "./math.js";
```
The imported values are properties on the math object.
```
import * as math from "./math.js";

math.default(7, 8);
math.multiply(8, 9);
math.subtract(10, 3);
math.square(3);
```
In this case, we're importing all exports from a module. Be careful when doing this, since you may end up unnecessarily importing values.

Using the * only imports all exported values. Values private to the module are still not available in the file that imports the module, unless you explicitly exported them.
