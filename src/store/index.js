import { createStore } from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

const store = createStore({
  state() {
    return {
      lastFetch: null,
      coaches: [],
      requests: [],
      userId: "c4",
    };
  },
  getters: getters,
  mutations: mutations,
  actions: actions,
});

export default store;
