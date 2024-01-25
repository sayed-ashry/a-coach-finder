import { createApp } from "vue";

import router from "./router.js";
import store from "./store.js";
import App from "./App.vue";
import BaseCard from "./components/BaseCard.vue";
import BaseButton from "./components/BaseButton.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app.component("base-card", BaseCard);
app.component("base-button", BaseButton);

app.mount("#app");
