

No compile Vue? Is that like a no-bake cake? Vue.js is an awesome Javascript framework. It has been my tool of choice of late. About a year and a half ago when I was first looking at the framework, one of the most compelling parts was that it could work without a build step.

You dont need a build step to start using Vue. There are advantages of course to using a build step like webpack however, but it's not required.

> There are advantages of course to using a build step like webpack however, but it's not required.

Using a build step gets you some nice things however.

- Babel your js to your target browsers
- .vue files with separate template, script and style blocks
- build in language support for pug, stylus, less ect.
- compiling files togeter, allowing a seperate file for each component

But, if you just want to prototype somethign quickly, or want to experiement with Vue, it is not necessary. You can just use Javascript template literals for your template value in your component.

The entire app shown above is the following code.
```javascript

// define your components
const selector = {
  template: `
    <div>
      <select v-model="chosen">
        <option disabled :value="null">Please select one</option>
        <option v-for="item in options" :value="item">
          {{ item }}
        </option>
      </select>
      <p v-if="chosen">
        Favorite fruit is {{ chosen }}
      </p>
    </div>
    `,
  data() {
    return {
      chosen: null,
      options: ["oranges", "peaches", "apples", "pears"],
    }
  }
};

const app = {
  template: `
    <div class="vue-app">
      <h1>Your Favorite Fruit?</h1>
      <selector></selector>
    </div>
    `,
};

// register your components
Vue.component('selector', selector);
Vue.component('app', app);

// launch your Vue app
new Vue({
  el: "#app",
  template: `<app></app>`
});
```

You can play with Vue in this manner anywhere that supports template literals.

__Template literal support:__

```bash
IE ✘
Edge ‽ 12+ ✔ 13+
Firefox ✘ 2+ ✔ 34+
Chrome ✘ 4+ ✔ 41+
Safari ✘ 3.1+ ✔ 9.1+
Opera ✘ 9+ ✔ 29+
```

Have fun, and if build steps and webpack shenanigins is what was keeping you from giving Vue a try, I hope this lowers the bar a little.
