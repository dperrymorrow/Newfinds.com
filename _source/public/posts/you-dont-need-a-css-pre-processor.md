Native CSS has come a long way in recent months/years. In this post I am going to go over the major reasons that folks have used css pre-processors such as SASS, LESS, and Stylus, and show you how you can accomplish these same things with native CSS.

## Separating files

Separating files is one main reason folks reach for a pre-processor. For quite some time now though you have been able to import another file into a CSS file. It looks like this.

```css
@import url("./utils.css");
```

You can use a relative or an absolute path, the same way you would for an href on an anchor tag, or any other resource.

The main difference between this an a pre-processor would be that while a pre-processor would combine then at compile, CSS is going to make an http request at runtime.

## Nesting rules

Ok this is the main reason for using a pre-processor. At least it's my main reason for using one in the past.

But CSS now supports nesting, and it works mostly how you are used to from using pre-processors.

```css
header {
  h1 {
    font-weight: bold;
  }

  h2 {
    font-weight: normal;
  }
}

```
Pretty awesome, what a huge advantage to writing CSS like we have for decades. 

```css
header h1 {
  font-weight: bold;
}

header h2 {
  font-weight: normal;
}
```

### Sudo selectors

Sudo selectors work the same way in native css that you may be accustomed to from pre-processors as well.

```css
button {
  color: blue;

  &:hover {
    color: purple;
  }
}
```

You can read more about [nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting) at MDN.

## Variables

A long time reason for pre-processors was variables. You can have all your colors, spacing ect in one file and globally update it everywhere. 

Well you can do that in native CSS now, for some time. In fact in several ways it's better than the pre-processors. 

### Global variables

Global variables are enclosed in a `:root` rule. These can be referenced anywhere. 

```css
:root {
  --bg-color: #333;
}
```

To use a variable, it must be referenced with the `var` tag

```css
button {
  background-color: var(--bg-color);
}
```

### Scoped variables

You can also scope variables on selectors, for example...

```css
header {
  --bg-color: #999;
}
```

So in this case, referencing `var(--bg-color);` within the header selector will result in `#999`;

### Re-assigning values at runtime

So the main advantage with css variables over a pre-processor, is that they can be overrode at runtime, where a pre-processor once its compiled, it's permanent. 

So for example if you have a website that you want to support light and dark modes. This can be achieved very easily using css vars.

```css
:root {
  --bg-color: white;
}

body {
  background-color: var(--bg-color);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: black;
  }
}
```

To achieve something like this with a pre-processor, you would need to toggle a class on the body using Javascript, and override all the rules with a `.dark` class or something of the sort.


## Computation

Most pre-processors such as LESS, Stylus, or SASS let you do math on things. Like if you want to divide a variable in half ect.

You can do that in native css using the [calc](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) function.

```css
:root {
  --spacing: 2em;
}

header {
  margin-top: calc(var(--spacing) / 2);
}
```
how cool is that?

## Transforming colors

So another popular feature _(at least to me)_ is to lighten and darken colors in a css pre-processor. You can do this in native css now as well using [color-mix](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix).

```css
header {
  background-color: color-mix(in oklab, red 50%, white);
}
```

The above would be the equivalent to what you are used to doing with a `lighten(red, 50%)` in a preprocessor. 

To darken just mix with black instead of white

```css
header {
  background-color: color-mix(in oklab, red 50%, black);
}
```

I hope next time you are choosing what tools to use on a project, you will give native css a try. It has come a long way.


