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
      requests: [],
      userId: "c4",
    };
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    userId(state) {
      return state.userId;
    },
    isCoach(state) {
      const coaches = state.coaches;
      const userId = state.userId;
      return coaches.some((coach) => coach.id === userId);
    },
    requests(state, getters) {
      const coachId = getters.userId;
      return state.requests.filter((req) => req.coachId === coachId);
    },
    hasRequests(getters) {
      return getters.requests && getters.requests.length > 0;
    },
  },
  mutations: {
    addCoach(state, payload) {
      state.coaches.push(payload);
    },
    addRequest(state, payload) {
      console.log(payload);
      state.requests.push(payload);
    },
  },
  actions: {
    addCoach(context, data) {
      context.commit("addCoach", {
        id: context.getters.userId,
        firstName: data.first,
        lastName: data.last,
        areas: data.areas,
        description: data.desc,
        hourlyRate: data.rate,
      });
    },
    addRequest(context, payload) {
      const newRequest = {
        id: new Date().toISOString(),
        coachId: payload.coachId,
        userEmail: payload.email,
        message: payload.message,
      };
      context.commit("addRequest", newRequest);
    },
  },
});

export default store;
