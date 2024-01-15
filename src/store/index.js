import { createStore } from "vuex";
import coachesModule from "./modules/coaches/index.js";
import requestsModule from "./modules/requests/index.js";

const store = createStore({
  namespaced: true,
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
  },
  state() {
    return {
      userId: "c3",
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
