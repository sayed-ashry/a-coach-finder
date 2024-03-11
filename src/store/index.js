import { createStore } from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const store = createStore({
  state() {
    return {
      coaches: [],
      requests: [],
      userId: null,
      token: null,
      didAutoLogout: false,
    };
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
});

export default store;
