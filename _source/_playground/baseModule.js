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
  extend(base) {
    const module = Object.assign({}, base);
    module.namespaced = true;
    module.mutations = buildMutations(base.state, base.mutations);
    return module;
  },
};
