## Removing the build step unleashes React to situations where it would ordinarily be too heavy-handed.

Have you ever wanted to use React without a build step? Ever find yourself in a situation where you would love to use React, but you are not building a single-page application with routes and so forth? Do you just need a component/widget on a page with a high level of interactivity?

So why does React need a build step/transpiler in the first place? Can't you just load React off a CDN and be up and running? Well, yes but you are usually going to use templates, and that is where JSX comes in which _does_ need a compiler.

## React without JSX

[As it states on the React docs site](https://reactjs.org/docs/react-without-jsx.html),

> JSX is not a requirement for using React. Using React without JSX is especially convenient when you don’t want to set up compilation in your build environment.

The linked page above goes on to show the following examples of JSX,

```jsx
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Hello toWhat="World" />);
```

and what the compiled output would look like

```javascript
class Hello extends React.Component {
  render() {
    return React.createElement("div", null, `Hello ${this.props.toWhat}`);
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(Hello, { toWhat: "World" }, null));
```

It even [provides a playground](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.20.11&externalPlugins=&assumptions=%7B%7D) for writing JSX and seeing what the resulting Javascript output would be. Pretty neat.

That's great, we don't need a build step. But for me, that's not going to be super practical to work with. The great thing about modern Javascript frameworks is that they let you dynamically work with HTML. Going bare metal on `React.createElement` does not feel like a great developer experience for me.

There are a few choices of libraries that ease the use of `React.createElement` such as [react-hyperscript](https://github.com/mlmorg/react-hyperscript). It provides some shorthands for creating elements, but for me it just feels a little too abstracted from the HTML your will be outputting.

```javascript
var h = require("react-hyperscript");
var React = require("react");

var AnotherComponent = require("./another-component");

module.exports = React.createClass({
  render: function render() {
    return h("div.example", [
      h("h1#heading", "This is hyperscript"),
      h("h2", "creating React.js markup"),
      h(AnotherComponent, { foo: "bar" }, [
        h("li", [h("a", { href: "http://whatever.com" }, "One list item")]),
        h("li", "Another list item"),
      ]),
    ]);
  },
});
```

But for me, _(and I think many React developers)_, writing HTML feels most natural. Your component ultimately renders HTML, so it just makes sense that your template is written in an HTML-like structure, thus the popularity of JSX.

## HTM Templates

There is however a library that is closer to JSX _(HTML-like feel)_ but yet does not require a build step. [htm](https://github.com/developit/htm). HTM uses tagged templates to leverage template literal as native Javascript template strings. If you have not played with [tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates), I encourage you to check this out, it's a quite powerful feature, that has recently become a part of Javascript.

> If you are planning on using HTM for any length of time, I highly encourage the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html) to highlight your HTML strings as HTML. Not only does it give you syntax highlighting for HTML inside your javascript, but it also formats it on save just as you would expect.

Tagged templates allow you to send a template literal string to a function to run additional processing/actions on the string. You can read more about [tagged templates here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates). But the important thing to know is that they are supported in [all major browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#browser_compatibility).

## Let's see some examples

Ok, let's take a look at what a super simple app would look like using HTM instead of JSX. In this example component, we are simply going to have a header with a name and hobbies, and then the ability to update those values.

To get started let's first load what Javascript we need off CDN into our HTML file, and then start our application.

```html
<head>
  <body>
    <div id="app">
      <!-- the application will be rendered here -->
    </div>

    <script
      crossorigin
      src="https://unpkg.com/react@18/umd/react.production.min.js"
    ></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
    ></script>

    <script type="module">
      import htm from "https://unpkg.com/htm?module";
      const html = htm.bind(React.createElement);

      import App from "./App.js";
      ReactDOM.render(html`<${App} />`, document.getElementById("app"));
    </script>
  </body>
</head>
```

So we have loaded React and ReactDOM into our HTML file, and then loaded HTM and our `<App/>` component as modules.
_(React unfortunately does not have esm versions available to load from CDNs)_ so we will just load them in separate script tags on the page and reference them off the window object where they assign themselves.

### Binding html to `React.createElement`

HTM is a generic library, so to get it working with React, we have to bind it to React.createElement. This essentially sets createElement as the tagged template function for our HTML string.

```javascript
import htm from "https://unpkg.com/htm?module";
const html = htm.bind(React.createElement);
```

We then render our App component

```javascript
ReactDOM.render(html`<${App} />`, document.getElementById("app"));
```

Let's look at our App component. You will notice how similar this is to what you would have written using JSX.

```javascript
import { useState, createElement } from "react";
import htm from "htm";
import Hobbies from "./Hobbies.js";
import "../index.css";

const html = htm.bind(createElement);

function App() {
  const [name, setName] = useState("Dave");
  const [hobbies, setHobbies] = useState("bonsai, sewing, running");

  return html`<div class="container">
    <article>
      <header>
        <hgroup>
          <h1>Hello there!</h1>
          <h2>
            My name is <mark>${name}</mark>, and my hobbies include
            <hr />
            ${hobbies
              .split(",")
              .map((hobby) => html`<kbd>${hobby.trim()}</kbd>`)}
          </h2>
        </hgroup>
      </header>
      <label>
        Name
        <input value=${name} onChange=${(ev) => setName(ev.target.value)} />
      </label>
      <label>
        Hobbies
        <${Hobbies} hobbies=${hobbies} setHobbies=${setHobbies} />
      </label>
    </article>
  </div>`;
}

export default App;
```

The app component in turn renders the Hobbies component which looks like this. I could have combined them together into just one component, but I wanted to give an example of loading a child component as we see with `<${Hobbies}>`

```javascript
import { createElement } from "react";
import htm from "htm";

const html = htm.bind(createElement);

function Hobbies({ hobbies, setHobbies }) {
  return html`<textarea
    value=${hobbies}
    onChange=${(ev) => setHobbies(ev.target.value)}
  ></textarea>`;
}

export default Hobbies;
```

## Differences between HTM and JSX

Although as we have discussed, it looks very similar to JSX, and in turn HTML. There are a few key differences that I would like to point out.

### Interpolate Component Names

As you may have already seen, you have to _"interpolate"_ component names when rendering them rather than just using them like a custom DOM element as in JSX.

In JSX

```jsx
<label>
  Hobbies
  <Hobbies hobbies={hobbies} setHobbies={setHobbies}></Hobbies>
</label>
```

HTM equivalent

```javascript
 <label>
  Hobbies
  <${Hobbies} hobbies=${hobbies} setHobbies=${setHobbies} />
</label>
```

### You can use class instead of className for your classes!

This one is huge for me. It has always bothered me that you have to use `className` for the class attribute in JSX. I'm not sure why that bothers me as much as it does, but I think about it every time I add a class to an element in JSX.

```html
<div className="my-class"></div>
```

vs

```html
<div class="my-class"></div>
```

### You must Invoke the HTML method when returning HTML

For example, when we list our hobbies in a loop, we are returning HTML so we have to call the HTML method.

```javascript
${hobbies.split(",")
  .map((hobby) => html`<kbd>${hobby.trim()}</kbd>`)}
```

### Quotes are optional

Quotes around element attributes _dynamic or static_ are entirely optional

```html
<div class="foo"></div>
```

### Self-Closing Tags

HTM will let you use self-closing tags on anything.

```html
<div />
```

## Closing Component tags

As HTM requires you to interpolate your component name when rendering, it has a handy feature that lets you close a component with `<//>` instead of having to redo the name again.

```javascript
<${Footer}>footer content<//>
```

### Spread Props

If you would like to assign a component's props as attributes to an element, _usually the root_, in JSX you would do so as such.

```jsx
<div {...props}>
```

In HTM you would do the same, just the spread operator on the outside of the string interpolation.

```javascript
<div ...${props}>
```

### Boolean Attributes

I love this feature actually if you have ever struggled with boolean attributes such as `checked` or `selected` and so forth you might as well.

```javascript
const checked = true;
return html`<input type="checkbox" checked=${checked} /> `;
```

### Multiple Root elements

JSX does not allow you to have multiple root elements. HTM does! If you are ever found yourself wrapping your component in `React.Fragment` just so you can structure your DOM the way you want, you will love this.

In JSX

```JSX
return <React.Fragment>
  <div>root item one</div>
  <div>root item two</div>
</React.Fragment>
```

In HTM

```javascript
return html`<div>root item one</div>
  <div>root item two</div>`;
```

### HTML Comments

You can leverage normal HTML comments in your templates. This is not possible in JSX

### Pre-compiling setup

I know the huge reason you would choose HTM over JSX is to leave the build step behind. Having said that, I recently used HTM on a project that required a build step for other reasons. Having gotten comfortable with HTM on several small Preact _(no build)_ projects, I wanted to keep using it.

One of the main things that I miss with a no-compile setup is the hot module reload. Once you have worked with HMR, it is quite addictive, and it's hard to go back to hitting reload 400 times an hour :)

I'll give a quick example of how to integrate HTM into a boilerplate `create-react-app` application.

```
npm i create-react-app react-htm
npm i htm --save-dev
npm serve
```

In your entry file `index.js` change the file to the following.

```javascript
import { createRoot } from "react-dom/client";
import { createElement } from "react";
import htm from "htm";
import App from "./App.js";

const html = htm.bind(createElement);
const root = createRoot(document.getElementById("root"));
root.render(html`<${App} />`);
```

Then, in the `App.js` file, change the component to the following

```javascript
import logo from "./logo.svg";
import "./App.css";
import { createElement } from "react";
import htm from "htm";
const html = htm.bind(createElement);

function App() {
  return html`<div class="App">
    <header class="App-header">
      <img src="${logo}" class="App-logo" alt="logo" />
      <p>Edit <code>src/App.js</code> and save to reload.</p>
      <a
        class="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>`;
}

export default App;
```

You are now running your application with HTM for your templates. Your build and HMR will work exactly as you are accustomed to. I hope you have enjoyed delving into this alternative to JSX, and find it useful in a future situation you find yourself in.
