export default {
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
      const error = new Error(reponseData.message || "Faild to send data.");
      throw error;
    }
    context.commit("addCoach", coachData);
  },
  async loadCoaches(context) {
    const response = await fetch(
      "https://find-a-coach-11550-default-rtdb.firebaseio.com/coaches.json"
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
  async addRequest(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://find-a-coach-11550-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        body: JSON.stringify(newRequest),
      }
    );
    if (!response.ok) {
      const error = new Error(reponseData.message || "Faild to send request.");
      throw error;
    }
    const reponseData = await response.json();
    newRequest.id = reponseData.name;
    newRequest.coachId = payload.coachId;
    context.commit("addRequest", newRequest);
  },

  async fetchRequests(context) {
    const coachId = context.getters.userId;
    const response = await fetch(
      `https://find-a-coach-11550-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );
    const reponseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        reponseData.message || "Faild to fetch requests."
      );
      throw error;
    }
    const requests = [];
    for (const key in reponseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: reponseData[key].userEmail,
        message: reponseData[key].message,
      };
      requests.push(request);
    }
    context.commit("setRequests", requests);
  },
};
