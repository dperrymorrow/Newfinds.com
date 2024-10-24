So one of the things I see commented on all the time in Javascript code reviews. 

Say you have some code as such...

```javascript
async function myFunction() {
  await someThing();
  await someOtherThing();
  await yetAnotherThing();
}
```

> Do we need to each of these one at a time? Cant we fork this and call them all together?

What being pointed out here is that we have to wait on each one of these Promises to return before the next one can start. 

One of the most amazing things about working with Javascript is its concurrency. Meaning it can run your code in parallel instead of waiting for each Promise to finish before moving starting the next. Commonly referred to as _"forking"_.

## Using Promise.all vs await each

Since this ability is so powerful, lets make sure we are using it. Let's take a look at the example above and see how we can make that run in parallel.

```javascript
function delayedResponse() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}

async function time(label, fn) {
  const start = new Date();
  await fn();
  console.log(
    (new Date() - start) / 1000, `seconds to load ${label}`
  );
}

time("sequential", async () => {
  await delayedResponse();
  await delayedResponse();
  await delayedResponse();
});

time("parallel", async () => {
  await Promise.all([
    delayedResponse(), 
    delayedResponse(), 
    delayedResponse()
  ]);
});

```

Ok, here is some code that we can test this idea with. I have a function that returns a Promise that takes 1sec to resolve.

```javascript
function delayedResponse() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });
}
```

and a function that times how long a function passed to it takes to run.

```javascript
async function time(label, fn) {
  const start = new Date();
  await fn();
  console.log(
    (new Date() - start) / 1000, `seconds to load ${label}`
  );
}
```
These are not important, I just wanted to explain what they were. The main thing that we are talking about here is the difference in speed with the two approaches we are timing here.

Ok lets run this code and see what happens. 

```shell
1.002 seconds to load parallel
3.005 seconds to load sequential
```

Whoah... that's almost 3 times as fast for the parallel one. Makes sense, as there are three calls and each one takes a second. You can see how this would greatly effect your performance if you had many Promises to wait on. 

Say for example we had 6 calls instead of 3. What would the timing on that look like?

```shell
1.002 seconds to load parallel
6.009 seconds to load sequential
```

You guessed it, twice as much on the difference. 

## Real world example

Say for example you have a front end app that makes a few API requests before it's ready to render and become interactive. This could make a **HUGE** difference to your users.

## Capturing the responses

One of the common excuses I have seen for awaiting each Promise is that,

> But I need to save each response from each Promise

```javascript
async function () {
  const myData = await someApiCall();
  // do something with your data...
}
```

You can still do that with `Promise.all`. Promise.all returns the results in an Array in the order that the Promises were invoked, not in the order that they resolve. This is a common misconception. 

Ok lets test this idea.

```javascript
function randomDuration() {
  const min = 500;
  const max = 1000;
  return Math.random() * (max - min) + min;
}

function delayedResponse(msg) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, randomDuration(), msg + ": done");
  });
}

async function time(label, fn) {
  const start = new Date();
  await fn();
  console.log(
    (new Date() - start) / 1000, `seconds to load ${label}`
  );
}

// the code we are benchmarking

async function sequential() {
  const res1 = await delayedResponse("first");
  const res2 = await delayedResponse("second");
  const res3 = await delayedResponse("third");
  console.log([res1, res2, res3]);
}

async function parallel() {
  const results = await Promise.all([
    delayedResponse("first"),
    delayedResponse("second"),
    delayedResponse("third"),
  ]);
  console.log(results);
}

time("sequential", sequential);
time("parallel", parallel);
```

Ok the main difference here is that I am giving each Promise a random duration before it returns, between 1/2 and 1 second. That way I can show that they come back in the order invoked, not the order resolved. 

```shell
[ 'first: done', 'second: done', 'third: done' ]
0.921 seconds to load parallel
[ 'first: done', 'second: done', 'third: done' ]
2.393 seconds to load sequential
```

Notice that even though I randomized how long each Promise will take to resolve, the results array is in the order that I called them in. Fantastic.

## Example where this won't work

There are some cases where you cannot call all your promises at the same time. Take for example API calls like I mentioned above. Say you need part of the result from one, before you can call the next. 

For example say you are using REST routes that are nested...

```javascript
async function () {
  const user = await Api.getUser();
  const account = await Api.getAccount(user.id);
  const articles = await Api.getArticles(user.id);
}
```

Well, you cant call all these together, but you may be able to still group some. Just do the best you can :)

```javascript
async function () {
  const user = await Api.getUser();
  const [account, articles] = await Promise.all([
    Api.getAccount(user.id),
    Api.getArticles(user.id)
  ]);
}
```

## Promise.all vs Promise.allSettled

One very important thing to note, If **ANY** of the promises reject. Promise.all will reject at the first failure. Think of it as fail fast.

If you need to handle each rejection, and need a response for every Promise no matter what happens, use `Promise.allSettled` instead of `Promise.all`

