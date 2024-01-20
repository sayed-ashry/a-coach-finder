import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      counter: 100,
    };
  },
  mutations: {
    add(state) {
      return (state.counter = state.counter + 1);
    },
  },
  getters: {
    counter(state) {
      return state.counter;
    },
  },
  actions: {
    add(context) {
      context.commit("add");
    },
  },
});

export default store;
