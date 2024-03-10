import { createRouter, createWebHistory } from "vue-router";
import CoachesList from "./pages/CoachesListPage.vue";
import store from "./store";

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
      meta: {
        requireAuth: true,
      },
    },

    {
      path: "/requests",
      component: () => import("./pages/RequestsReceivedPage.vue"),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/:notFound(.*)",
      component: () => import("./pages/NotFoundPage.vue"),
    },

    {
      path: "/auth",
      component: () => import("./pages/UserAuth.vue"),
      meta: {
        requireUnAuth: true,
      },
    },
  ],
});
router.beforeEach((to, _, next) => {
  if (to.meta.requireAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requireUnAuth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});
export default router;
