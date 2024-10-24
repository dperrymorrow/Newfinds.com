
Often you have methods defined in your Javascript modules, that you do not need / want exposed. Consider this. In this case we are using `myModule.callbackMethod` as the callback function

### Typical Scenario:
This works fine, but there is no particular reason to expose the callback method. It will never be used outside of this module.

```javascript
(function () {
  "use strict";
  window.myModule = {
    publicMethod() {
      document.getElementById("myId")
        .addEventListener('click', this.callbackMethod.bind(this));
    },

    anotherPublicMethod() {
      // some public method
    },

    callbackMethod() { --
      console.log('callback');
    }
  };
}());
```


### Cleaned up with a protected method
This protects the `callbackMethod` and also simplifies scope in the process.

```javascript
(function () {
  "use strict";

  window.myModule = {
    publicMethod() {
      // can now call the method without binding scope.
      document.getElementById("elId")
        .addEventListener('click', _protectedMethod); --
    },

    anotherPublicMethod() {
      // some public method
    },
  };

  // this method can be called from within the anonymous function,
  // but not otherwise accessible.
  function _protectedMethod() { --
    console.log('privateMethod');
  }
}());
```

So if you were to try to call the method from outside the anonymous function.

```javascript
myModule.publicMethod();
myModule.anotherPublicMethod();

myModule._protectedMethod() --
// undefined
```

### How would this look in Node?

It would be pretty similar in Node.

```javascript
module.exports = {
  publicMethod() {
    _protectedMethod();
  },

  anotherPublicMethod() {
    // some public method
  },
};

// simply leave this outside of your export.
function _protectedMethod() {
  console.log('privateMethod');
}
```

I generally like to name methods in a node module that will not be exported with an underscore prefix. It's a handy indicator to show that this method will not be exposed.
