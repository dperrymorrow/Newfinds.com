
Ever wanna have a backbone singleton class? Allowing you to access a classes instance from anywhere without having to pass around a handle to an instance. This strategy could really be used for anything, but I find it most useful with retrieving a handle to a Backbone Router.

### The additional backbone class

```javascript
Backbone.Singleton = {
  getInstance: function () { --
    if (this._instance === undefined) {
      this._instance = new this();
    }
    return this._instance;
  }
}
```

### Example with a Backbone.Router

Underscore _(what Backbone is built on top of)_ allows you to ```_.extend``` multiple classes, so just add the singleton to your class's inheritance.

```javascript
TestRouter = function(){};
_.extend(TestRouter, Backbone.Router);
// extend Backbone.Singleton
_.extend(TestRouter, Backbone.Singleton);
// access your router from anywhere!!
// just make sure not to call new,
// only use .getInstance()
var inst = TestRouter.getInstance();
```
