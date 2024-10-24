So if you have used [hotwired/turbo](https://turbo.hotwired.dev/) you will get a pretty SPA like experience with very little work. Turbo goes a long way to make a traditional multi page application feel like a SPA _(single page application)_.

Cool, but there is one main difference you may notice. While a SPA patches the DOM on change _(usually using Virtual DOM)_, Turbo replaces the whole body, or the `<turbo-frame>` that you are targeting / navigating from.

This can be a little jarring, mess with css transitions, loose your focus / scroll position on the page ect. You can read more about the argument for patching vs replacing [here](https://github.com/patrick-steele-idem/morphdom) 

Fortunately, since [this PR](https://github.com/hotwired/turbo/pull/305) was merged, you now have access to the internal pageRenderer internal object from Turbo. 

Instead of replacing the whole DOM _(in most cases the body tag)_ lets patch the DOM comparing what has changes in the response vs what's currently on the page. This is going to give us a much more SPA like feel. 

I'm using [morphdom](https://github.com/patrick-steele-idem/morphdom) to patch our DOM. Its a very simple library that compares two DOM elements and updates only the differences. It is extremely performant and does not even use a Virtual DOM, just the DOM you already have!

Ok so here we go, when you start up your Turbo application, simply override the `pageRenderer.assignNewBody` function to use Morphdom instead of just replacing the whole thing which is the default for Turbo.

```bash
npm i @hotwired/turbo morphdom --save-dev
```

```javascript
import * as Turbo from "@hotwired/turbo";
import morphdom from "morphdom";
import { PageRenderer } from "@hotwired/turbo";

PageRenderer.prototype.assignNewBody = function () {
  if (document.body) {
    morphdom(document.body, this.newElement, {
      onBeforeElUpdated: (fromEl, toEl) => !fromEl.isEqualNode(toEl),
    });
  } else document.documentElement.appendChild(this.newElement);
};


```

Great, that was pretty easy and now the application feels a little more responsive, less like pJax. Ok so whats going on here?

We have redefined the assignNewBody function within `@hotwired/turbo`. Instead of replacing the existing `<body>` element with the new one, we are going to use Morphdom to patch it instead. 

```javascript
  if (document.body) {
    ...
  } else document.documentElement.appendChild(this.newElement);
```

First we make sure we have a body, if not just append it to the document. 

Lastly, a little performance improvement suggested by the Morphdom library [here](https://github.com/patrick-steele-idem/morphdom#can-i-make-morphdom-blaze-through-the-dom-tree-even-faster-yes). 

```javascript
 onBeforeElUpdated: (fromEl, toEl) => !fromEl.isEqualNode(toEl)
```

Make sure the two DOM nodes are not equal before attempting to patch them. This will save some comparison on nodes that you do not need to compare.

If you want to see visually the difference in your re-rendering before and after this modification, add this to your css.

```css
body * {
  animation: highlight 0.2s ease;
}

@keyframes highlight {
  0% {
    outline: 1px solid lightyellow;
  }
  100% {
    outline: 0px solid lightyellow;
  }
}
```
This will give all your elements a border flash when they are added to the DOM, which gives an indication of what elements were replaced, and which were left alone on the re-render.

I hope you find this useful, and encourages you play with some of these _low code_ solutions to interactivity like [Turbo](https://turbo.hotwired.dev/) or [Htmx](https://htmx.org/docs/#boosting) before you reach for more heavy handed solutions like React or Vue.