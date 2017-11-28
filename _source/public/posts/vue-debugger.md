
When I first stared using Vue.js I was working in the browser like most folks, and the normal [vue-devtools](https://github.com/vuejs/vue-devtools) was fine. But then I started working on an Electron app, which had a real difficult time working with the vue-devtools chrome plugin.

First off it was [problematic at the time](https://github.com/electron/electron/issues/1498) to install a chrome plugin into my electron app, and secondly, it did not have access to the render thread when preloading the scrpt.

Also even in the browser, I was often having troubles with vue-devtools not registering my compontents. I end up reloading a few times untill it picks them up. This annoyed me, and kind of defeated the purpose of having a hot reload dev server like webpack in place.

I think the main problem lies with the fact that vue-devtools is locked within a tab in Chrome's devtools panel. It does not have direct access to your Vue app. Information is ferried between the page and the devtool extension via [events and listeners](https://developer.chrome.com/extensions/devtools)

So... I decided to roll my own. The main difference being that it was just a Vue component and you added it to your app. It had access to everything. It started out as just showing the Vuex store, then I added components, mutations, and highlighting the component in the DOM you are inspecting.

I added a little 🔮 crystal ball as the icon in the lower corner so you can unobtrusivly toggle the pane, and drag resize it. that way it could be in the same window, without getting in the way.

> The main difference being that it was just a Vue component and you added it to your app. It had access to everything.

### Install:

_Its called `electron-vue-debugger` but you can use it anywhere really..._

```shell
npm i electron-vue-debugger
```
### Usage:

Import the component to use

```javascript
import Debugger from "electron-vue-debugger";
```

In your main app component's template, pass in your `$children` then the debugger will have an array of all the components in the app.

```html
<debugger :components="$children"></debugger>
```

That's it, your off and running. However the one downside of it being in the browser instead of the devtools pane, is that you will obvioulsy have to put some kind of logic here so that folks don't see this in production.

I usually accomplish this like so.

```javascript
// how you determine environment in your app may vary
if (process.NODE_ENV !== "production") {
  const Debugger = require("electron-vue-debugger");
}
```

```html
<debugger :components="$children" v-if="debug"></debugger>
```

And then a data property of if to debug, in the same `<App>` component.


```javascript
export default {
  name: "app",
  data: () => ({ debug: process.NODE_ENV !== "production" }),
};
```

We have been using this for a few months now at work. And overall i find it more useful / reliable than vue-devtools. If you are looking for an alternative give it a go.
