export default {
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
  setRequests(state, payload) {
    state.requests = payload;
  },
  setFetchTimeStamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
