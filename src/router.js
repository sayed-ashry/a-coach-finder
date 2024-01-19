import { createRouter, createWebHistory } from "vue-router";
import CounterVue from "./components/Counter.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: CounterVue },
  ],
});

export default router;
