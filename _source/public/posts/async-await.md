


Remember _"callback hell"_ in Javascript? Remember when we got Promises and everythig got so much better? And now promises chains have become _"promise chain hell"_. Async await is the next chapter in the saga of dealing with async code in a sane manner in Javascript.

### The problem

Take for example a fetch request.

```javascript
function getData() {
  return fetch("http://newfinds.com", { method: "POST" }) --
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.error(err);
    });
}
// using the function
getData().then(console.log);
```

We have a function that returns a promise, which chains a `.then` off it to also load the `.json()` response from the result which is also a promise. This is a pretty simple example, but you can see how this would get more and more complex as we chain more and more actions off our promise.

### Async functions to the rescue

```javascript
async function getData() {
  const response = await fetch("http://newfinds.com", { method: "POST" });
  return await response.json();
}
// using the function
getData().then(console.log);
```

You can see how much more terse this approach is. Also its much more familier to programmers coming from another language. You do a line of code, and then the next one executes.

The `async` declaration on the function tells Javascript that you are enabling `await` inside of it.

__Different syntaxes for defining an async function__

```javascript
// traditional function
async function functionName() {
  return await something();
}

// function defined in an Object
{
  async doThing() {
    return await soemthing();
  }
}

// function as a parameter
doThing(async () => {
  return await something();
});

// function defined as const
const functionName = async () => {
  return await soemthing();
};

// or a one liner
const functionName = async () => await soemthing();
```

Async functions __ALWAYS__ return a Promise. Even if you are returning something that does not look like a promise it will be wrapped in a `Promise.resolve()`.

__For Example:__

```javascript
async function doThing() {
  await someAsyncThing();
  return "I did the thing";
}

doThing().then(console.log);
// I did the thing
```



### Handling Errors

You may be wondering,

> That's great, but how do I handle my errors? I don't see any `.catch()` inside those async functions..

Well you can actually _still_ catch the errors if the promise referenced inside the async function rejects. This is handy if you need to do something inside your async function on a falure.

```javascript
function rejects() {
  return Promise.reject("Kaboom");
}

async function getData() {
  return await rejects().catch(err => {
    return Promise.reject("getData caught it", err);
  });
}
// using the function
getData()
  .then(console.log)
  .catch(err => {
    console.log("caught the error", err);
  });
// caught the error getData caught it
```

As you can see, both _"catches"_ were triggered.

More commmonly, like in the case with our fetch example above, you dont want errors thrown, you want to simply reject them. It is much simpler than trying to catch every Promise in your async function.

Say you were making many fetch calls, and you want to reject if any of them fail.

```javascript
async function getData() {
  try {
    return [
      await fetch("http://newfinds.com/foo"),
      await fetch("http://newfinds.com")
    ];
  } catch (err) {
    return Promise.reject(err);
  }
}
// using the function
getData()
  .then(console.log)
  .catch(err => console.log("caught", err));
```

What if  you want your async functions to still be called in paralell? Yes you can still do that.
Just simply wrap all your promises in a `Promise.all` and await that. Then all your methods will run at the same time instead of sequentially.

```javascript
async function doTheThing() {
  await Promise.all([
    asyncThing(),
    asyncThing(),
    asyncThing(),
    asyncThing(),
    asyncThing(),
    asyncThing(),
  ]);
}

```


### Support

It was introduced in __Node 7.6__. For browsers its been around even longer.

```javascript
{
  chrome: 59,
  edge: 15,
  firefox: 54,
  safari: 10.1,
  node: 7.6,
  ios: 10.3,
  opera: 4,
}
```

[➜ Read more on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
