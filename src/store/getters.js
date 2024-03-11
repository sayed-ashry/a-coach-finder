export default {
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
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
};
