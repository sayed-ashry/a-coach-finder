import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      coaches: [],
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
    setCoaches(state, payload) {
      state.coaches = payload;
    },
  },
  actions: {
    async addCoach(context, data) {
      const userId = context.getters.userId;
      const coachData = {
        id: userId,
        firstName: data.first,
        lastName: data.last,
        areas: data.areas,
        description: data.desc,
        hourlyRate: data.rate,
      };
      const response = await fetch(
        `https://find-a-coach-11550-default-rtdb.firebaseio.com/coaches/${userId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(coachData),
        }
      );
      const reponseData = await response.json();
      console.log(reponseData);
      if (!response.ok) {
        //error handle..
      }
      context.commit("addCoach", coachData);
    },
    async loadCoaches(context) {
      const response = await fetch(
        " https://find-a-coach-11550-default-rtdb.firebaseio.com/coaches.json"
      );
      const reponseData = await response.json();
      if (!response.ok) {
        const error = new Error(reponseData.message || "Faild to fetch.");
        throw error;
      }
      const coaches = [];
      for (const key in reponseData) {
        const coach = {
          id: key,
          firstName: reponseData[key].firstName,
          lastName: reponseData[key].lastName,
          areas: reponseData[key].areas,
          description: reponseData[key].description,
          hourlyRate: reponseData[key].hourlyRate,
        };
        coaches.push(coach);
      }
      context.commit("setCoaches", coaches);
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
