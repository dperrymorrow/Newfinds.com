"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseModule = require("./baseModule");

var _baseModule2 = _interopRequireDefault(_baseModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _baseModule2.default.extend({
  state: {
    users: [],
    isLoading: false
  },

  mutations: {
    setUsers(state, users) {
      state.users = users;
    },

    setIsLoading(state, loading) {
      state.isLoading = loading;
    }
  }
});