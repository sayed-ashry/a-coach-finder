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
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimeStamp = new Date().getTime();
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
