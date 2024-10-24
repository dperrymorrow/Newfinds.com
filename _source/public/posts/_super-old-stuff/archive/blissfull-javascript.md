
I would like to introduce you to a really interesting _"minimal"_ library for working with vanilla Javascript [Bliss.js](http://blissfuljs.com/). I went from fan, to contributor and now [collaborator](https://github.com/LeaVerou/bliss/graphs/contributors) on this project. I urge you to check this out and think about

> what parts of jQuery do you really use?

In my opinion, the days are gone when you need a monolith library such as jQuery to save you from cross browser support hell. Using ``document.querySelector`` in conjunction with Bliss.js will accomplish most day to day tasks on the DOM. And oh yeah, __it's 10k__.

The library includes a ``$`` wrapper for ``document.querySelector`` similar to jQuery, async methods, utility methods for working with Arrays and Objects and more.

### For example Bliss's ajax fetch method using promises.

```javascript
$.fetch("/api/create", {
  method: "POST",
  responseType: "json"
}).then(function(){
  alert("success!");
}).catch(function(error){
  console.error(error, "code: " + error.status);
});
```

But the thing that really excites me about the way that Bliss is structured, is that it extends a ``_`` object on all DOM Nodes.

This gives you all the convinces of Prototype extension that was super popular a while ago but has fallen out of favor because of [unpredictably of native Javascript objects](http://perfectionkills.com/whats-wrong-with-extending-the-dom/).

With the ``_`` object added to DOM Nodes you can do things like the following. All three of the following work the same. Giving you flexibility with using Bliss.

```javascript
subject = $.properties(subject, props)
subject = subject._.properties(props)
subject = subject._.set({properties: props})
```

If adding objects to DOM Nodes is not for you, there is even a _"bliss shy"_ download which does not add the ``_`` object.

This is just a taste, but checkout the [docs](http://blissfuljs.com/) for yourself,
