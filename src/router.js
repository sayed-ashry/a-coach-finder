import { createRouter, createWebHistory } from "vue-router";

import CoachesListPage from "./pages/CoachesListPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    {
      path: "/coaches",
      component: CoachesListPage,
    },
    {
      path: "/coaches/:id",
      component: () => import("./pages/CoachDeatailPage.vue"),
    },
    {
      path: "/register",
      component: () => import("./pages/CoachRegistrationPage.vue"),
    },
    {
      path: "/requests",
      component: () => import("./pages/RequestsReceivedPage.vue"),
    },
    { path: "/contact", component: () => import("./pages/ContactPage.vue") },
    {
      path: "/:NotFound(.*)",
      component: () => import("./pages/NotFoundPage.vue"),
    },
  ],
});

export default router;
