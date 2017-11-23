
ES6 is becoming more and more mainstream as of writing this article all evergreen _(self updating)_ browsers support the ES6 features I am going to talk about here. It's best to run in strict mode, declare ``"use strict";`` at the top of your file, or inside your closure.

### Let

Declares a variable with block level scope. Meaning that the variable cannot be referenced outside of the current block that it is defined in.

- only lives inside the current block _enclosed {}_
- cannot be defined on the global scope

```javascript
// example taken from MDN
function letTest() {
  let x = 1;
  if (true) {
    let x = 2;  // different variable
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
letTest();
```

Does not let you create a global let

```javascript
// in global scope
let x = 1;
console.log(x) // undefined
```

[➜ Read more on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)

---

### Const

Javascript now lets you define constants. Variables that cannot be re-assigned.

```javascript
const NUM = 7;
// will throw an error, cannot be redefined.
// as of the writing of this article Safari will not throw an error.
NUM = 20;
```

You can also have constants in a block scope, similar to let.

```javascript
const NUM = 23;

if (NUM === 23) {
  // creates a new constant in this block
  const NUM = 45;
  console.log(NUM) // 45;
}

console.log(NUM) // 23;
```

When a constant is an Object, the values and keys can change. Just the object itself cannot be resigned.

```javascript
const PERSON = {
  name: 'Dave'
};

PERSON.name = "Mike"; --
PERSON.hobby = 'bonsai';

console.log(PERSON) // Object {name: "Mike", hobby: "bonsai"}
```

[➜ Read more on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

---

### Arrow Functions

Allows you to use shorthand for anonymous functions while retaining the current scope. Extremely useful for callback functions.

```javascript
// using arrow functions
const lengths = ["Larry", "Moe", "Curly"].map(s => s.length);
```

Notice that I did not have to `return s.length` if there are no brackets around the arrow function _its a one liner_ then it automatically returns the value.

Also if there is more than one parameter, then the parens may not be omitted.

```javascript
const sum = [1, 2, 3].reduce((a, b) => a + b);  // 6
```

If there are no parameters, then empty ``()`` must be used.

```javascript
setInterval(() => {
  // your code here...
}, 1000);
```

If the function is __NOT__ a _"one liner"_ then you will need the brackets and the implicit ``return``

```javascript
var sum = [1, 2, 3].reduce((a, b) => {
  if (a > 1) {
    return a + b;
  } else {
    return b;
  }
});  // 5
```

The scope of the arrow function is bound to the current scope. Prior to ES6 you would have to bind the function.

```javascript
function Bank() {
  this.money = 0;

  setInterval(() => {
    this.money ++;
  }, 1000);
}

const branch = Bank();
```

[➜ Read more on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

---

### Template literals

Template literals is one of the features I am most excited about. I have wanted this for a really long time. It's self explanatory once you see it.

```javascript
var feature = "Template Literals";
console.log( `I have waited for ${feature} for a while.` );
// I have waited for Template Literals for a while.
```

Pretty awesome right? And you can do just about any legal Javascript inside of one.

```javascript
console.log( `2 + 5 is ${2 + 5}` );
// 2 + 5 is 7
```

Also multi line strings.

```javascript
console.log(`super long string that
is two lines`);
// super long string that
// is two lines
```
[➜ Read more on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

---

### Classes

Javascript now allows you to create proper classes with constructors, super, static, getters and more.

> !! As of writing this article Opera does not support Classes

MDN goes into much more detail than I will here, But I will give you an overview of whats possible with the new Classes.

```javascript
// parent class
class Worker {
  constructor(profession, name) {
    this.profession = profession;
    this.name = name;
  }
}

// child class
class Janitor extends Worker {
  constructor(name) {
    super(name, 'Janitor')
  }

  set working(work) {
    this.isWorking = work;
  }

  get working() {
    return this.isWorking;
  }

  static role() {
    return 'Janitor';
  }
}

var guy = new Janitor('Mike');
console.log(guy.name); // Mike
console.log(guy.profession); // Janitor

// use a static method on the class not the instance
console.log(Janitor.role()) // Janitor

// use getter and setters
guy.working = true;
console.log(guy.working);
```

[➜ Read more on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
