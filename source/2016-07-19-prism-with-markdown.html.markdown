---
title: Prism.js & Markdown
date: 2016-07-19 19:41 UTC
tags: Javascript
intro: Overcoming the problem of keying off of class names in Prism to determine the language to syntax highlight.
---

So you want to use [Prism.js](http://prismjs.com) to highlight your code, but your using Markdown. Problem is that Prism targets the ``code`` blocks with classes.

Markdown does [not allow](http://stackoverflow.com/questions/1058933/can-i-define-a-class-name-on-paragraph-using-markdown) you to add classes

```html
<pre>
  <code class="language-css">p { color: red }</code>
</pre>
```

In markdown this would just look like the following. So there is no class for Prism to key off of and know the language, and highlight the code block.

```css
{{css}}
p { color: red }
```

I have created a little adapter class that will look for ``{{css}}`` and so forth in the beginning of the code block. It will then add the class post Markdown rendering.

 ```css
p {color: red;}
```

The Javascript implementation is a simple ES6 class that iterates on the keys of languages we support, and then adds the class and removes the tag.

_It's ES6 but could easily be converted back to ES5._

```javascript
"use strict";
class PrismAdaptor {
  constructor() {
    this.keys = ['ruby', 'html', 'css', 'javascript', 'html', 'bash'];
    document.querySelectorAll("code").forEach(this.lookForKeys.bind(this));
  }

  lookForKeys(el) {
    this.keys.forEach(key => {

      let tag = `{{${key}}}`;

      if (el.innerText.includes(tag)) {
        el.className = `language-${key}`;
        el.innerText = el.innerText.replace(tag, '');
      }
    });
  }
}
// usage...
new PrismAdaptor();
```