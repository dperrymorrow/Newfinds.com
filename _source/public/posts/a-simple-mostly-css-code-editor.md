In this article, I'm going to talk about how to make a very simple, browser based code editor using mostly CSS. I originally built this when I needed to let users edit JSON in a CMS that I was building.

> If you just want to jump to the code and the working example, here you go. The code can be found [here](https://github.com/dperrymorrow/simple-browser-code-editor/) and the working example [here](https://dperrymorrow.github.io/simple-browser-code-editor/)

## Contenteditable sucks... 

So if you were ever pondered building your own code editor, you have probably looked at [contenteditable](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable). While `contenteditable` is great for many situations, but there is one huge problem. It is nearly impossible to place the cursor back where it was after you syntax highlight the code in the editor as it changes. 

In my case, I wanted something very minimal without reaching for some huge, heavy handed library for this. I set out to see if I could build a very simple editor using mostly CSS, just using Javascript to create the syntax highlighted output, and update the preview. 

I wanted to type in a normal `<textarea>` and just update the preview of the syntax highlighted code in another element. 

## How the illusion works

![diagram of layers of code editor](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/djn20s65efratgt6ala6.png)

## The HTML code

```html
<div id="editor">
  <div class="preview"></div>
  <textarea class="code" spellcheck="false"></textarea>
</div>
```

- A regular `<textarea>` with transparent text
- A `<div>` populated with your syntax highlighted code. 
- A container wrapping your `<textarea>` and your preview `<div>` so that they can scroll together and remain lined up.

## The CSS
Here is the entire CSS that I used for the editor. 

```css
html,
body {
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
}

#editor {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template: 1fr / 1fr;
  place-items: top;
  overflow: auto;
  padding: 2rem;
  background-color: #1a1723;
}

#editor .code,
#editor .preview {
  all: unset;
}

#editor .code,
#editor .preview {
  height: auto;
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  font-family: Monaco, monospace;
  font-size: 16px;
  resize: none;
  line-height: 24px;
  white-space: pre-wrap;
  overflow: hidden;
}

#editor .preview {
  pointer-events: none;
  color: #ccc;
}

#editor .code {
  color: rgba(255, 255, 255, 0);
  caret-color: magenta;
}
```

### Overlapping the elements

One of the key parts here is using display grid to overlay the textarea and the preview

```css
#editor {
  ...
  display: grid;
  grid-template: 1fr / 1fr;
  place-items: top;
  overflow: auto;
  ...
}
```

I am using the `fr` unit to overlap the two elements inside the container. You can read more about `fr` at CSSTricks [here](https://css-tricks.com/introduction-fr-css-unit/).

### Stying the textarea and preview identically

You may notice that I apply the same rules to the preview and the textarea. This ensures that they overlap precisely.

```css
#editor .code,
#editor .preview {
  height: auto;
  grid-column: 1 / 1;
  grid-row: 1 / 1;
  font-family: Monaco, monospace;
  font-size: 16px;
  resize: none;
  line-height: 24px;
  white-space: pre-wrap;
  overflow: hidden;
}
```

### Make the textarea transparent

Using `rgba` for the text color allows me to have the text entirely transparent, so it seems like you are selecting and editing the preview. 

```css
#editor .code {
  color: rgba(255, 255, 255, 0);
  caret-color: magenta;
}
```

## A small bit of Javascript

We do need a small amount of Javascript to tie this all together. Let's take a look at what we need.

```javascript
const $preview = document.querySelector("#editor .preview");
const $code = document.querySelector("#editor .code");

function mirror() {
  // make textarea grow to height of content so we can scroll together
  $code.style.height = $code.scrollHeight;
  // update the preview underlay with the syntax highlight
  $preview.innerHTML = Prism.highlight(
    $code.value,
    Prism.languages.javascript,
    "javascript",
  );
}
// insert two spaces on tab
$code.addEventListener("keydown", (ev) => {
  if (ev.code === "Tab") {
    ev.preventDefault();
    $code.setRangeText("  ", $code.selectionStart, $code.selectionStart, "end");
    mirror();
  }
});

$code.addEventListener("input", mirror);
mirror();
```

> We will be using [Prism](https://prismjs.com/) for this, but you could use anything you like. 

### The `mirror()` function is doing a couple of things here.

```javascript
$code.style.height = $code.scrollHeight;
```

This ensures that as you type, the height of the `<textarea>` grows, so that the container will scroll instead of the `<textarea>` itself. You have probably seen this used to make "auto-growing" textareas before.

```javascript
$preview.innerHTML = Prism.highlight(
    $code.value,
    Prism.languages.javascript,
    "javascript",
  );
```

Then we are using Prism to take the code from the `<textarea>` syntax highlight it and place the result in the preview `<div>`

### Supporting tab indentation

Anytime you are editing code, you need to be able to indent, and this bit of code allows us to add in spaces when someone hits tab, and then call `mirror()` again to update the preview.

```javascript
$code.addEventListener("keydown", (ev) => {
  if (ev.code === "Tab") {
    ev.preventDefault();
    $code.setRangeText("  ", $code.selectionStart, $code.selectionStart, "end");
    mirror();
  }
});
```

Finally, we add an eventListener for input on the `<textarea>` and update the preview with `mirror()` on each change. Then we call `mirror()` initially, in case there is already code in the `<textarea>` at page load. 

That's it! Obviously, if you were be editing thousands and thousands of lines of code, you might hit performance issues updating all that syntax highlighted code. One way to improve on this idea would be to create a "virtual" scroller, and only highlight the code that is visible in the containers view. This is how VsCode does their editor. 

If you would like to play around with this, you can find the
[code](https://github.com/dperrymorrow/simple-browser-code-editor/) and a [working example](https://dperrymorrow.github.io/simple-browser-code-editor/) on GitHub




