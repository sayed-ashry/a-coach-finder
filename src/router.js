import { createRouter, createWebHistory } from "vue-router";
import CoachesList from "./pages/CoachesListPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },

    { path: "/coaches", component: CoachesList },

    {
      path: "/coaches/:id",
      component: () => import("./pages/CoachDetailPage.vue"),
      props: true,
      children: [
        {
          path: "contact",
          component: () => import("./pages/ContactCoachPage.vue"),
        },
      ],
    },

    {
      path: "/register",
      component: () => import("./pages/CoachRegistrationPage.vue"),
    },
    {
      path: "/requests",
      component: () => import("./pages/RequestsReceivedPage.vue"),
    },
    {
      path: "/:notFound(.*)",
      component: () => import("./pages/NotFoundPage.vue"),
    },
  ],
});

export default router;
