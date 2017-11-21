import Base from "./baseModule";

export default Base.extend({
  state: {
    users: [],
    isLoading: false,
  },

  mutations: {
    setUsers(state, users) {
      state.users = users;
    },

    setIsLoading(state, loading) {
      state.isLoading = loading;
    },
  },
});
