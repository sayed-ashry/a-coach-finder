export default {
  addCoach(state, payload) {
    state.coaches.push(payload);
  },
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setRequests(state, payload) {
    state.requests = payload;
  },
  setUser(state, payload) {
    (state.userId = payload.userId),
      (state.token = payload.token),
      (state.didAutoLogout = false);
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
};
