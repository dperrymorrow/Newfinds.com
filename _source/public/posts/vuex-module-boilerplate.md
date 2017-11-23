

If you have used Vuex at all you know that you cannot change your state expect in a mutation of your console will light like a christmass tree. So you play along and end up writing a mutation for basically every property in your state.

### Example:

```javascript
// store/modules/users.js

export default {
  state: {
    users: [],
    isLoading: false,
  },

  mutations: {
   setUsers(state, users) { --
      state.users = users;
    },

   setIsLoading(state, loading) { --
      state.isLoading = loading;
    },
  },
}
```

This is a minimal example, but you can easily imagine this growing and being a pain to write mutations for every key in your state.

So 9 times out of 10 your mutations will set an item in your store, to the payload you are passing in. I get annoyed defining all these mutations that are all are essentially the same.


### Solution:

```javascript
// store/modules/base.js

import _ from "lodash";

const buildMutations = (state = {}, addOns = {}) => {
  const mutations = {};
  Object.keys(state).forEach(key => {
    const name = _.upperFirst(key);
    mutations[`set${name}`] = (state, data) => {
      state[key] = data;
    };

    if (_.isArray(state[key])) {
      mutations[`push${name}`] = (state, data) => {
        state[key].push(data);
      };

      mutations[`remove${name}`] = (state, id) => {
        const index = state[key].find(i => i.id == id);
        state[key].splice(index, 1);
      };
    }
  });
  return Object.assign(mutations, addOns);
};

export default {
 extend(base) { --
    const module = Object.assign({}, base);
    module.namespaced = true;
    module.mutations = buildMutations(base.state, base.mutations);
    return module;
  },
};
```

__And then using the base module:__

```javascript
// store/modules/users.js

import Base from "./baseModule";

export default Base.extend({ --
  state: {
    users: [],
    isLoading: false,
  },

  mutations: {
    someCustomMutation(state, users) {
      // custom mutation you need for your module
    },
  },
});
```

Now when we trace out our module, we see that we have mutations added for everything in our store. And any extra mutations we need _custom_ that we passed in are there as well.

```javascript
{ state: { users: [], isLoading: false },
  mutations:
   { setUsers: [Function: setUsers],
     pushUsers: [Function],
     removeUsers: [Function],
     someCustomMutation: [Function],
     setIsLoading: [Function: setIsLoading] },
  namespaced: true }
  ```

It even added `pushUsers` and `removeUsers` since that item was an Array. This allows us to have a mutation to push into the arrray, or remove an item from the array based on the id we pass.


```javascript
// for example from an action in users
context.commit('pushUsers', {id: 3, name: 'David'});
// or remove by id
context.commit('removeUsers', 3);
```

I find this pattern useful, I hope you do as well.
