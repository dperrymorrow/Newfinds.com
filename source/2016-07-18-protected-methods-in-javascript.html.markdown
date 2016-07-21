---
title: Protected Methods In Javascript
date: 2016-07-18 21:04 UTC
tags: Javascript
intro: Easily add private methods to your Javascript Module or Class, while also avoiding scope issues on callbacks.
---

Often you have methods defined in your Javascript modules, that you do not need / want exposed. Consider this. In this case we are using ``myModule.callbackMethod`` as the callback function

### Typical Scenario:
This works fine, but there is no particular reason to expose the callback method. It will never be used outside of this module.

```javascript
(function () {
  "use strict";
  window.myModule = {
    publicMethod: function () {
      document.getElementById("myId").addEventListener('click', this.callbackMethod.bind(this));
    },

    anotherPublicMethod: function () {
      // some public method
    },

    callbackMethod = function () {
      console.log('callback');
    }
  };
}());
```


### Cleaned up with a protected method
This protects the ``callbackMethod`` and also simplifies scope in the process.

```javascript
(function () {
  "use strict";

  window.myModule = {
    publicMethod: function () {
      // can now call the method without binding scope.
      document.getElementById("elId").addEventListener('click', callbackMethod);
    },

    anotherPublicMethod: function () {
      // some public method
    }
  };

  // this method can be called from within the anonymous function,
  // but not otherwise accessible.
  callbackMethod = function () {
    console.log('privateMethod');
  }
}());
```

So if you were to try to call the method from outside the anonymous function.

```javascript
myModule.publicMethod();
myModule.anotherPublicMethod();

myModule.callbackMethod() // undefined
callbackMethod() // undefined
```