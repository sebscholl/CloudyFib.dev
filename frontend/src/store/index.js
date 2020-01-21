import Vue from "vue";
import Vuex from "vuex";

import game from "./modules/game";
import session from "./modules/session";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    game,
    session
  }
});
