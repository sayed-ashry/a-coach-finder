let timer;

export default {
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
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSkOy9bbIlzMPtcWku9hv8RHm0571fKrs";

    if (mode === " signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSkOy9bbIlzMPtcWku9hv8RHm0571fKrs";
    }
    const repsonse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const repsonseData = await repsonse.json();
    if (!repsonse.ok) {
      const error = new Error(
        repsonseData.message || "Faild to authenticate.Check your login data."
      );
      throw error;
    }
    // const expiresIn = +repsonseData.expiresIn * 1000;
    const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;
    localStorage.setItem("token", repsonseData.idToken);
    localStorage.setItem("userId", repsonseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);
    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);
    context.commit("setUser", {
      token: repsonseData.idToken,
      userId: repsonseData.localId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }
    timer = setTimeout(function () {
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
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
