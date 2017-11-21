"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildMutations = (state = {}, addOns = {}) => {
  const mutations = {};
  Object.keys(state).forEach(key => {
    const name = _lodash2.default.upperFirst(key);
    mutations[`set${name}`] = (state, data) => {
      state[key] = data;
    };

    if (_lodash2.default.isArray(state[key])) {
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

exports.default = {
  extend(base) {
    const module = Object.assign({}, base);
    module.namespaced = true;
    module.mutations = buildMutations(base.state, base.mutations);
    return module;
  }
};