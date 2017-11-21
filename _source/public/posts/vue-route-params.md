

So often you have a Vue router that has url params, such as for finding a record by id. Take for example this VueRouter with a route to edit a user.


```javascript
export default new VueRouter({
  routes: [
    {
      component: UserEdit,
      path: "/user/:userId/edit",
    },
  ],
});
```

Then inside the `UserEdit.vue` component you need to look the user up by id so you can edit it. For a long time I simply got the userId off the `$route` object that is injected into each Vue component when you are using a router.


```javascript
export default {
  name: "UserEdit",

  async created() {
    this.user = await MethodToFetchUser(this.$route.params.userId);
  },

  data() {
    return {
      user: null,
    };
  },
};
```

However this makes your component only useful in one situation, as a route component. Say you wanted to use this componnet in another situation where it was not being triggerd by a route.


By setting `props: true` on your route, any url params will be passed in to the component like any other propery would.

```javascript
export default new VueRouter({
  routes: [
    {
      component: UserEdit,
      path: "/user/:userId/edit",
      props: true,
    },
  ],
});
```

Then you just use the prop like any other property you would pass into a component.

```javascript
export default {
  name: "UserEdit",

  props: {
    userId: {
      required: true,
    },
  },

  async created() {
    this.user = await MethodToFetchUser(this.userId);
  },

  data() {
    return {
      user: null,
    };
  },
};
```

There are more [advanced options documented here](https://router.vuejs.org/en/essentials/passing-props.html) where you can set the props value in a route to an Object or a Function.
