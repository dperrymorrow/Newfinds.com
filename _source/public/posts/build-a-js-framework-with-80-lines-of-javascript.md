Before I get started, I want to share where the final code is, as well as a working example.

- [source code repository](https://github.com/dperrymorrow/mini-reactive)
- [working example todo list](https://dperrymorrow.github.io/mini-reactive/)

We have all used _Reactive_ javascript frameworks, but have you ever tinkered with making your own, or have been curious whats going on under the hood?

> By _"reactive"_ I mean, you make a change to your data, and your template or DOM automatically update. No manual updating ect...

Well, this post is about my attempt to make the smallest possible component that does the following.

## Lets get started

For our example, I'm going to build a Todo list, where we can add, delete and mark done a list of items to complete. We will also be able to update the title as we type.

Just an FYI, will be using native es modules, and no build steps in my examples for simplicity.


![Working example of todos app](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ty1b7p3t56zvsef7l5i8.png)

[working app here](https://dperrymorrow.github.io/mini-reactive/)

```html
<div class="container" id="app">
  <!-- our app is rendered here -->
</div>

<script type="module">
  import App from "./Todos.js";

  const $root = document.getElementById("app");
  $root.innerHTML = new App($root).render();
</script>
```
So to start the application, we will render it to a DOM element in our HTML. We are also passing in the element to our class, we will need this later.

## The Todos component

```javascript
import Component from "./lib/Component.js";

export default class Todos extends Component {
  constructor() {
    super(...arguments);

    this.state = this.useState({
      title: "Things Todo",
      todos: [
        {
          done: true,
          title: "Walk the Dog",
        },
        {
          done: false,
          title: "Grocery Shop",
        },
        {
          done: false,
          title: "X-Mas Shop",
        },
      ],
    });
  }

  toggle({ target }, index) {
    this.state.todos[index].done = target.checked;
  }

  updateTitle({ target }) {
    this.state.title = target.value;
  }

  deleteTodo(ev, index) {
    ev.preventDefault();
    this.state.todos.splice(index, 1);
  }

  addTodo() {
    const $titleInput = this.$root.querySelector("[name=newTodo]");

    this.state.todos.push({
      title: $titleInput.value,
      done: false,
    });

    $titleInput.value = "";
    $titleInput.focus();
  }

  render() {
    return /*html*/ `<article>
      <header>
        <hgroup>
          <h1>${this.state.title}</h1>
          <h2>
            An example of a mini reactive component, make changes and watch the
            DOM update.
          </h2>
        </hgroup>
      </header>

      <input
        type="text"
        value="${this.state.title}"
        data-on="input->updateTitle"
        data-args="title"
        autofocus
      />

      <table role="grid">
        <thead>
          <tr>
            <th>Done</th>
            <th>Title</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${this.state.todos.reduce(
            (html, todo, index) =>
              (html += /*html*/ `<tr>
                <td>
                  <input
                    type="checkbox"
                    data-on="click->toggle"
                    data-args="${index}"
                    ${todo.done ? "checked" : null}
                  />
                </td>

                <td>${todo.done ? `<s>${todo.title}</s>` : todo.title}</td>

                <td>
                  <a href="#" data-on="click->deleteTodo" data-args="${index}">
                    Delete
                  </a>
                </td>
              </tr>`),
            ""
          )}
        </tbody>
      </table>

      <footer>
        <div class="grid">
          <input name="newTodo" placeholder="Todo title" type="text" />
          <button data-on="click->addTodo">Add</button>
        </div>
      </footer>
    </article>`;
  }
}
```

It may look like a lot, but keep in mind this is an entire todo app and template. I'll go over each piece in detail, I just wanted to show you the end result first.

## The constructor

```javascript
import Component from "./lib/Component.js";

export default class Todos extends Component {
  constructor() {
    super(...arguments);
    ...
  }
```

Here we are importing our `Component` class and extending it with our `Todos` class. We call super with any arguments passed into our class.

## Component State

Next, also in the constructor, we setup the state. This is what will be _observable_, meaning every time something in here is changed, our component will re-render, and the DOM will be patched with the changes.

```javascript
this.state = this.useState({
  title: "Things Todo",
  todos: [
    {
      done: true,
      title: "Walk the Dog",
    },
    {
      done: false,
      title: "Grocery Shop",
    },
    {
      done: false,
      title: "X-Mas Shop",
    },
  ],
});
```

## The template

I just using generic template literals here, but we could return HTML however we wanted really, Mustache, JSX, HTM it doesn't really matter as far as our component is concerned. It just wants an HTML string returned.

Our template uses our state, and renders the HTML. For example our header displays the title.

```html
<h1>${this.state.title}</h1>
```

Each time our render function is called, the HTML will be updated with the latest version of `this.state`

## Event handling

We have data, and we have HTML. But that doesn't do us much good if we can't trigger changes to the data, so we need some event handling.

```html
<a href="#" data-on="click->deleteTodo" data-args="${index}"> Delete </a>
```

I've chosen to just use data attributes as triggers here.
For example if you look at the delete todo link. On click trigger function `deleteTodo`. Simple enough.

You will notice I also have an `data-args` attribute. This will pass these values as parameters to the method. In this case, it is the index that will let our function know _which_ todo we are wishing to delete.

## But how does this work?

Yeah... remember the whole reason I started this post was to wanted to show some of the basic building blocks of a _reactive_ framework.

We have seen it from our `Todos` class that has state, template and event handlers. Let's now take a look at the `Component` class.

Ok so here is the entire `Component` class which our `Todos` class extends.

```javascript
import Morphdom from "https://unpkg.com/morphdom@2.6.1/dist/morphdom-esm.js";
import observer from "./observer.js";

export default class Component {
  handlers = ["click", "input"];
  observable;

  constructor($root) {
    this.$root = $root;
    this.handlers.forEach((type) =>
      this.$root.addEventListener(type, this.#handleEvent.bind(this))
    );
  }

  useState(value) {
    return observer(value, this.updateDom.bind(this));
  }

  #handleEvent(ev) {
    const { type, target } = ev;
    const on = target.dataset.on;

    if (!on) return;

    const args = target.dataset.args ? target.dataset.args.split(",") : [];
    const [eventType, method] = on.split("->");

    if (eventType !== type) return;

    if (!this[method]) {
      console.error(
        `${method} does not exist in component ${this.constructor.name}`,
        ev.target
      );
    } else this[method].call(this, ev, ...args);
  }

  updateDom() {
    Morphdom(this.$root.firstChild, this.render(), {
      onBeforeElUpdated: (fromEl, toEl) => !fromEl.isEqualNode(toEl),
    });
  }

  render() {
    console.error(`${this.constructor.name} must provide a render function!`);
  }
}
```

Pretty tiny, just like I promised. It's really only a couple of methods.

## The constructor

Let's start with the constructor

```javascript
handlers = ["click", "input"];

constructor($root) {
  this.$root = $root;
  this.handlers.forEach((type) =>
    this.$root.addEventListener(type, this.#handleEvent.bind(this))
  );
}
```

We save a reference to the `$root` element, _we need this when we re-render, and add event handlers to the `$root` for each type of event we support. 

We could easily add many more types of events to listen to, but for this example these were all we needed.

Notice that the `addEventListener` is added to the `$root` itself instead of on each element that has a `data-on` attribute. This allows us to just have one handler for each type of even, and also never have to add / remove event listeners ever again throughout the life of this component. Pretty handy. More on that in a second...

## useState method

```javascript
useState(value) {
  return observer(value, this.updateDom.bind(this));
}
```

As we saw earlier, our Todos component called `useState` with our data, then saved the return value as `this.state`.

But whats happening here? As discussed in the previous post [Create an Observable Object using Proxy](https://dev.to/dperrymorrow/create-an-observable-object-using-proxy-3h62) we have the ability to create an _observable_ Proxy object. We create one here, and return it, while passing our `updateDom` as the callback function. This will fire each time our data is changed.

## Handling events

```javascript
#handleEvent(ev) {
  const { type, target } = ev;
  const on = target.dataset.on;

  if (!on) return;

  const args = target.dataset.args ? target.dataset.args.split(",") : [];
  const [eventType, method] = on.split("->");

  if (eventType !== type) return;

  if (!this[method]) {
    console.error(
      `${method} does not exist in component ${this.constructor.name}`,
      ev.target
    );
  } else this[method].call(this, ev, ...args);
}
```

In our constructor we added event listeners to our `$root` element. This is the handler we passed in.

```javascript
const { type, target } = ev;
const on = target.dataset.on;

if (!on) return;
```

We check if the target has a `data-on` property, if not, no point in continuing further.

```javascript
const args = target.dataset.args ? target.dataset.args.split(",") : [];
const [eventType, method] = on.split("->");

if (eventType !== type) return;
```

Next we gather any `data-args` values as an array that we can pass to our method, and then see if our `eventType` matches the type on our element, example click of `click->deleteTodo`

```javascript
if (!this[method]) {
  console.error(
    `${method} does not exist in component ${this.constructor.name}`,
    ev.target
  );
} else this[method].call(this, ev, ...args);
```

Lastly, we make sure the method exists in our class, _in this case Todos_, if not `console.error` showing the element where the error came from helping us debug.

If the method exists, we call it invoking `call` providing the scope `this` so that our method has the correct `this` when invoked. _can access `this.state` for example_. 

Call also gives us the ability to pass in arguments, we are passing in the `ev` _event_ and then any `data-args` split into an array.

## Updating the DOM

Ok the whole point of this thing is to automatically update the DOM to reflect our template as the data changes. So how does that happen? It takes place in the `updateDom` function that we sent as the callback to our _observable_. This function gets called each time there is a `set` on our data, at any level.

```javascript
updateDom() {
  Morphdom(this.$root.firstChild, this.render(), {
    onBeforeElUpdated: (fromEl, toEl) => !fromEl.isEqualNode(toEl),
  });
}
```

It's super simple actually. And that is in large part to [Morphdom](https://github.com/patrick-steele-idem/morphdom) which I'm using to compare the output of `render()` to what is already on the DOM. Morphdom will patch the differences.

The only extra thing I'm doing here is bailing on traversing further down the DOM if the nodes are equal, preventing some checking of children if the parents are already deemed to be equal.

## Summary

And thats pretty much it. This little `Component` class certianly is not the next React killer, but it was a fun little experiment into some of the fundamental concepts of a front end framework which I would outline as follows.

- A template that renders HTML with your data
- Detecting when your data has changed
- event handlers managed on our template without having to do it manually after each render
- re-rendering your template with the new state of your data
- comparing the current DOM with your re-rendered HTML and patching the differences

## Next steps

So what if this was a real project, what would we be looking at building next? Whats missing? Here are some thoughts.

Instead of re-rendering the entire component, and patching the difference, a way to target only the portions of the template that reference data that was changed. Frameworks like Preact and Svelte do this very well, surgically targeting DOM element and attributes that reference certain pieces of data. 

The ability to render sub components. Say we wanted to render a `Todo` component for each todo in our todos array. 

