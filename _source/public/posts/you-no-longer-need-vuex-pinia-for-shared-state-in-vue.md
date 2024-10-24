Since Vue.js 3.x, you no longer need to use Vuex to share a centralized state with all your application's components.

## A brief history of shared state in Vue.js

If you have been using Vue.js before 3.x you are probably familiar with [Vuex](https://vuex.vuejs.org/) _now renamed Pinia_. It allows you to have a centralized state that is shared across all your application components. If you have ever found yourself in situations where you are passing data/props between components and things are getting complicated, a centralized state is the answer.

> Flux libraries are like glasses: you’ll know when you need them.

## The simplest way to share the state between components.

Since Vue.js 3.x `reactive` and `computed` are exported directly from the library and can be used outside of components. This is the exact same functionality that you are using when you have `data` or `computed` inside of one of your Vue.js components.

```javascript
import { reactive, computed } from 'vue';
```

This is great because it means that we can create our own reactive data, and even computed properties outside of Vue components, in plain Javascript files!

## Example of shared state

```javascript
import { reactive, computed } from "vue";

const state = reactive({
  hobby: "Hike",
  fruit: "Apple",
  fruitOptions: ["Banana", "Apple", "Pear", "Watermelon"],

  description: computed(() => {
    return `I like eating ${state.fruit}s & ${state.hobby}`;
  }),
});

export default state;
```

Here we have an Object with properties, which is wrapped in `reactive` this gives Vue the ability to trigger change, and re-render your components.


### Computed
We are also wrapping a function in `computed` which gives us a computed property based on the the other fields in the state.

> It is important to note, that we invoke the reactive function, and _THEN_ export the resulting state, otherwise we would create a new state each time we imported the file.

## Usage in your components

Great, we have a reactive store, but how do we leverage this in our components, and will they all stay in sync?

```vue
<template>
  <main class="container">
    <article>
      <header>
        Your description: <code>{{ state.description }}</code>
      </header>
      <survey-form />
      <footer>
        <results />
      </footer>
    </article>
  </main>
</template>

<script>
import Results from "./Results.vue";
import SurveyForm from "./SurveyForm.vue";
import state from "./state.js";

export default {
  components: { SurveyForm, Results },
  data() {
    return { state };
  },
};
</script>
```

It's as simple as importing the state, and referencing it in your component's data method so it can be accessed in your template.

You can even `v-model` items in your store the same as you would with any data property in your component.

```vue
<template>
  <form>
    <label>
      Favorite Hobby?
      <input placeholder="Favorite Hobby" v-model="state.hobby" />
    </label>

    <label>
      Favorite Fruit?
      <select v-model="state.fruit">
        <option v-for="fruit in state.fruitOptions" :key="fruit">{{ fruit }}</option>
      </select>
    </label>
  </form>
</template>

<script>
import state from "./state.js";

export default {
  name: "SurveyForm",
  data() {
    return { state };
  },
};
</script>
```

You can see the full example on [Github](https://dperrymorrow.github.io/shared-state-vue-example/) and view the code [here](https://github.com/dperrymorrow/shared-state-vue-example)

I hope you find this pattern as useful as I have. Happy developing!

