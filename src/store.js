import { createStore } from "vuex";
const coaches = [
  {
    id: "c1",
    firstName: "Maximilian",
    lastName: "Schwarzmüller",
    areas: ["frontend", "backend", "career"],
    description:
      "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
    hourlyRate: 30,
  },
  {
    id: "c2",
    firstName: "Julie",
    lastName: "Jones",
    areas: ["frontend", "career"],
    description:
      "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
    hourlyRate: 30,
  },
  {
    id: "c3",
    firstName: "Sayed",
    lastName: "Ashry",
    areas: ["frontend", "backend"],
    description:
      "I am Sayed and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
    hourlyRate: 40,
  },
];

const store = createStore({
  state() {
    return {
      coaches: coaches,
    };
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
  },
});

export default store;
