

So you write JavaScript. That’s pretty much a given for today’s modern web apps. Unfortunately, JavaScript doesn’t always get the organization it deserves and ends up being a procedural mess of jQuery on ready statements.

In this post, I’m going to show you two of my favorite patterns for keeping JavaScript well organized. But before I do, let’s go over a few prerequisites.

### Namespace Your Code
One of the worst and most common JavaScript mistakes is assigning variable onto the global namespace (aka ‘window’) if you’re running JavaScript in a browser. This can lead to conflicting functions between you and other developers. And is just, well, messy. The best way to avoid to do this is namespacing as shown in this example:

```javascript
window.NR = window.NR || {};
window.NR.myFunction = function () {
  // your code...
};
```

And avoid this example:

```javascript
function myFunction () {   // your code... };
```

###Use Strict Mode
Even inside a name spaced function, there can still be a problem. You can accidentally assign variables to the global namespace. To prevent this, prefix all variable declarations with var or this.

Alternatively, you can use strict mode. As the name implies, strict mode parses your JavaScript in a much stricter format. For example, if you attempt to set a variable that is not yet defined, it will through an error instead of assigning to global / window.

###Lint your JavaScript
JSLint evaluates your JavaScript against Douglas Crockford’s coding suggestions. There are plug-ins for most of the popular editors to evaluate code including Sublime Text, Textmate and Vim.

The main benefits of using JSLint are:

- Your code is checked for errors before running, saving you time and debugging effort.
- Sharing linted code in a team unifies coding styles, making code more readable and consistent.

Even if you disagree with some of Douglas’s assertions about how your code should be formatted, you should still use JSLint. You can opt out of the rules with preference setting or comments on the top of your JavaScript file.

### The Module
The module pattern is great if you only need one, such as in a navigation system, and you want to be able to access the object from any scope. By convention, a module should be camelCased with a lower case first letterer.

There are many benefits and drawbacks to using the module pattern:

__Pros:__

- There’s no need to instantiate, just begin calling methods on it.
- It’s accessible from anywhere. There’s no need to retain a handle to your instance.
- It keeps state and variable values.

__Cons:__

- You can only have one. Don’t make ten of these for each type of item on the DOM or a similar situation.
- You don’t have a constructor function, so it won’t be fired automatically like with an instance.
- If you need initialization on the module, you need to call it manually the first time it’s used.

__Example:__

```javascript
(function () {
  "use strict";
  window.NR = window.NR || {};
  window.NR.myModule = {
    myVariable: "foo",

    initialize: function () {
      // your initialization code here
    },

    anotherMethod: function () {
      this.myVariable = "foobar";
    }
  };
}());
```

__Usage:__

```javascript
NR.myModule.initialize();
NR.myModule.anotherMethod();
console.log(NR.myModule.myVariable);
// outputs
// "foobar"
```

### Classes
Some folks will argue that your should never use ‘new’ when working with JavaScript as there are no true classes in the language. However, I find this pattern extremely helpful for a number of reasons described below. Also, many popular frameworks such as Backbone use class instantiation / extension patterns. Naming conventions for classes is CamelCase with an upper case first letter.

__Pros__

- It’s great for when you have many of an item and each needs its own state.
- It’s a familiar OOP pattern / work flow for many developers.
- It has a constructor function that’s immediately fired on instantiation.

__Cons__

- You have to remember to instantiate before you can use it. If you don’t, it will cause errors.
- You have to keep a handle to the instance that’s returned from the constructor.

__Example:__

```javascript
window.NR = window.NR || {};
window.NR.MyClass = (function () {
  "use strict";

  function MyClass(val) {
    this.instanceVar = MyClass.staticVar + val;
  }

  MyClass.staticVar = "prefix-";
  var instanceVar = "";

  MyClass.prototype.exampleFunction = function () {
    alert('i am an additional function');
  };

  return MyClass;
}());
```

__Usage:__

```javascript
var instance1 = new NR.MyClass('class 1');
console.log(instance1.instanceVar);

NR.MyClass.staticVar = 'PREFIX-';

var instance2 = new NR.MyClass('class 2');
console.log(instance2.instanceVar);

// Outputs
// "prefix-class 1"
// "PREFIX-class 2"
```
