let timer;
export default {
  async addCoach(context, data) {
    const userId = context.getters.userId;
    const token = context.getters.token;
    const coachData = {
      id: userId,
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate,
    };
    const response = await fetch(
      `https://find-a-coach-11550-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: "PUT",
        body: JSON.stringify(coachData),
      }
    );
    const reponseData = await response.json();
    if (!response.ok) {
      throw new Error(reponseData.message || "Faild to send data.");
    }
    context.commit("addCoach", coachData);
  },

  async loadCoaches(context) {
    const response = await fetch(
      "https://find-a-coach-11550-default-rtdb.firebaseio.com/coaches.json"
    );
    const reponseData = await response.json();
    if (!response.ok) {
      throw new Error(reponseData.message || "Faild to fetch.");
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
      throw new Error(reponseData.message || "Faild to send request.");
    }
    const reponseData = await response.json();
    newRequest.id = reponseData.name;
    newRequest.coachId = payload.coachId;
    context.commit("addRequest", newRequest);
  },

  async fetchRequests(context) {
    const coachId = context.getters.userId;
    const token = context.getters.token;
    const response = await fetch(
      `https://find-a-coach-11550-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );
    const reponseData = await response.json();

    if (!response.ok) {
      throw new Error(reponseData.message || "Faild to fetch requests.");
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
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBb5TtbpiGEk3uYManOT0yMOb-i2JnEp7I";
    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBb5TtbpiGEk3uYManOT0yMOb-i2JnEp7I";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      returnSecureToken: true,
    });
    const reponseData = await response.json();
    if (!response.ok) {
      throw new Error(
        reponseData.message || "Failed to authenticate.Check your login data"
      );
    }
    // const expiresIn = +reponseData.expiresIn * 10000;
    const expiresIn = 50000;
    const expirationDate = new Date().getTime() + expiresIn;
    localStorage.setItem("tokenExpiration", expirationDate);
    localStorage.setItem("token", reponseData.idToken);
    localStorage.setItem("userId", reponseData.localId);

    const user = {
      userId: reponseData.localId,
      token: reponseData.idToken,
    };
    context.commit("setUser", user);
    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);
  },

  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
      });
    }
  },
  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    clearTimeout(timer);
    context.commit("setUser", {
      userId: null,
      token: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
