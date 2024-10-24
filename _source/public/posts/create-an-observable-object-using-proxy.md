Have you ever needed to _"observe"_ an object for changes? If you have ever used Vuejs or React, this is what is happening under the hood. Data gets changed, something re-renders. It's the core building block of almost every front end framework.

React uses their own `setState` to understand when data is changing, but Vue and many others use [Javascript's native Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) which is what we will look at here. Proxy lets you interact with the object like you normal, which I highly prefer to calling setters like in React or Ember.

In this little excersize, we are going to build an _"observable"_ library, that will make Javascript objects observable for change. 

> Ill take it step by step, but if you just wanna jump to the final code, [here you go](#wrapping-up)

## How does Proxy work?

So proxy works by calling `new Proxy()` wich [takes two arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#description),

- first argument: the plain object which you are going to be _"observing"_ we will refer to this from here on as poj _(Plain Javascript Object)_ to make things clearer.
- second argument: the _handler_ object aka _"the trap"_ as we will refer to it.

The trap allows you to hook into when set, delete, get and other actions are taken on the object. The `Reflect` object lets you hook into the normal actions that would occur during the operations on the object. In this case, setting the value. [More info here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

```javascript
const trap = {
  set(target, prop, value) {
    console.log(prop, "is being set to", value);
    return Reflect.set(...arguments);
  },
};

const poj = { name: "David" };
new Proxy(poj, trap);
```

## Let's see it in action

So given the code above, lets see how we could observe changes to our object.

```javascript
const data = new Proxy(poj, trap);
data.name = "fred";
```

```
name is being set to fred
```

Cool that worked! We can see when a change happens to our object.

## What about nested Objects?

But what about if our _POJ_ has nested objects?

```javascript
const poj = {
  name: "David",
  children: [{ name: "Oliver" }],
};

const data = new Proxy(poj, trap);
data.children[0].name = "fred";
```

Nothing happens. Why? Well what's happening is that our object has child objects, which are not Proxys, they are _Plain Old Javascript Objects_. In order to listen for changes in nested objects, we would need to wrap those in `new Proxy()` as well. But how can we do that?

## Add a get hook into our trap

The Proxy handler object, our _trap_ provides a get function that can be used. This will trigger each time a value is retrieved, and we can hook into this and control what gets returned.

Instead of just returning the value, if we are working with an Object, we will wrap it in Proxy and then return it just like we did on the top level.

```javascript
const trap = {
  ...

  get(target, prop) {
    const value = Reflect.get(...arguments);

    if (
      value &&
      typeof value === "object" &&
      ["Array", "Object"].includes(value.constructor.name)
    )
      return new Proxy(value, trap);

    return value;
  },
};
```

If we are going to return an Object or Array, we reutrn a wrapped Proxy instead.
We are checking that

- have a value instead of null or undefined
- is typeof object
- and the `constructor.name` is either "Array" or "Object"

If we add the above method and run we now see

```
name is being set to fred
```

## Capturing more useful output

Great, we are observing changes on nested objects, but it's hard to tell whats happening, we have a `name` property on the root and in each of the children. What would really be helpful is to know the path that was changed. Like `children.0.name`. Let's fix that.

```javascript
function buildProxy(poj, tree = []) {
  const getPath = (prop) => tree.concat(prop).join(".");

  const trap = {
    set(target, prop, value) {
      console.log(getPath(prop), "is being set to", value);
      return Reflect.set(...arguments);
    },

    get(target, prop) {
      const value = Reflect.get(...arguments);

      if (
        value &&
        typeof value === "object" &&
        ["Array", "Object"].includes(value.constructor.name)
      )
        return buildProxy(value, tree.concat(prop));

      return value;
    },
  };

  return new Proxy(poj, trap);
}
```

So we have now wrapped the creation of our Proxies in a method called `buildProxy` wich will allow us to keep passing down the _tree_ that we have traversed. Then when we have a change we can know the path to the item that has changed.

Each time we find a nested Object, we push on the current property to the tree and call the `buildProxy` method again. The [concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method is similar to push, only it creates a new Array instead of effecting the original.

```javascript
return buildProxy(value, tree.concat(prop));
```

Ok, lets try it now and see what happens.

```javascript
const poj = {
  name: "David",
  children: [{ name: "Oliver" }],
};

const data = buildProxy(poj);
data.children[0].name = "fred";
```

```
children.0.name is being set to fred
```

## Callback instead of logging

Great thats what we wanted. We have our path to what changed, and what it's being changed to. But the `console.log` is not really that useful. Like the example I gave up top, say we were trying to re-render based on changes. What we really need is a hook for the changes. Lets fix that.

```javascript
function buildProxy(poj, callback, tree = []) {
  const getPath = (prop) => tree.concat(prop).join(".");

  const trap = {
    set(target, prop, value) {
      callback({
        action: "set",
        path: getPath(prop),
        target,
        newValue: value,
        previousValue: Reflect.get(...arguments),
      });
      return Reflect.set(...arguments);
    },

    get(target, prop) {
      const value = Reflect.get(...arguments);

      if (
        value &&
        typeof value === "object" &&
        ["Array", "Object"].includes(value.constructor.name)
      )
        return buildProxy(value, callback, tree.concat(prop));

      return value;
    },
  };

  return new Proxy(poj, trap);
}
```

So main things changed here are we are now passing a callback in addition to the tree. This will give us a method to call when something changes, rather than just logging it out which is not that useful.

```javascript
function buildProxy(poj, callback, tree = []) {
  ...
}
```

And then we also need to pass that when we find nested Objects

```javascript
return buildProxy(value, callback, tree.concat(prop));
```

Lastly, we are adding a couple more things to the return object we are sending to our callback.

```javascript
callback({
  action: "set",
  path: getPath(prop),
  target,
  newValue: value,
  previousValue: Reflect.get(...arguments),
});
return Reflect.set(...arguments);
```

- We added an `action` to the object, so the consumer of our callback will know what type of action took place on our Object.
- we added `previousValue` so that you can compare the old value to the new value being changed.

We are doing this by using `Reflect.get` to capture the current value before we set the new value.

putting it all together, this is how you would use the little Observer library we just wrote.

```javascript
const poj = {
  name: "David",
  children: [{ name: "Oliver" }],
};

const data = buildProxy(poj, (change) => {
  console.log(change);
});

data.children[0].name = "fred";
```

```javascript
{
  action: 'set',
  path: 'children.0.name',
  target: { name: 'Oliver' },
  newValue: 'fred',
  previousValue: 'Oliver'
}
```

There are many other actions you can trap in the Proxy handler. You might want to add delete at least. But by just using set and get, we are able to observe most changes that could occur to our object.

## Wrapping up

Here is the final _"Observer Library"_ thanks for reading and I hope you find this useful.

```javascript
function buildProxy(poj, callback, tree = []) {
  const getPath = (prop) => tree.concat(prop).join(".");

  return new Proxy(poj, {
    get(target, prop) {
      const value = Reflect.get(...arguments);

      if (
        value &&
        typeof value === "object" &&
        ["Array", "Object"].includes(value.constructor.name)
      )
        return buildProxy(value, callback, tree.concat(prop));

      return value;
    },

    set(target, prop, value) {
      callback({
        action: "set",
        path: getPath(prop),
        target,
        newValue: value,
        previousValue: Reflect.get(...arguments),
      });
      return Reflect.set(...arguments);
    },

    deleteProperty(target, prop) {
      callback({ action: "delete", path: getPath(prop), target });
      return Reflect.deleteProperty(...arguments);
    },
  });
}

export default buildProxy;
```

And how you would use this in your code

```javascript
import Observer from "./observer.js";

const data = Observer(
  {
    name: "David",
    occupation: "freelancer",
    children: [{ name: "oliver" }, { name: "ruby" }],
  },
  console.log
);

data.name = "Mike";
data.children.push({ name: "baby" });
data.children[0].name = "fred";
delete data.occupation;
```

and you would see the following log output

```javascript
{
  action: 'set',
  path: 'name',
  target: {
    name: 'David',
    occupation: 'freelancer',
    children: [ [Object], [Object] ]
  },
  newValue: 'Mike',
  previousValue: 'David'
}
{
  action: 'set',
  path: 'children.2',
  target: [ { name: 'oliver' }, { name: 'ruby' } ],
  newValue: { name: 'baby' },
  previousValue: undefined
}
{
  action: 'set',
  path: 'children.length',
  target: [ { name: 'oliver' }, { name: 'ruby' }, { name: 'baby' } ],
  newValue: 3,
  previousValue: 3
}
{
  action: 'set',
  path: 'children.0.name',
  target: { name: 'oliver' },
  newValue: 'fred',
  previousValue: 'oliver'
}
{
  action: 'delete',
  path: 'occupation',
  target: {
    name: 'Mike',
    occupation: 'freelancer',
    children: [ [Object], [Object], [Object] ]
  }
}
```