import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      counter: 100,
    };
  },
  getters: {
    counter(state) {
      return state.counter;
    },
  },
});
export default store;
