import { createRouter, createWebHistory } from "vue-router";
import CoachesList from "./pages/coaches/CoachesList.vue";
import store from "./store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: () => import("./pages/coaches/CoachesList.vue"),
      props: true,
      children: [
        {
          path: "contact",
          component: () => import("./pages/requests/ContactCoach.vue"),
        }, // /coaches/c1/contact
      ],
    },
    {
      path: "/register",
      // component: CoachRegistation,
      component: () => import("./pages/coaches/CoachRegistration.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      // component: RequestsReceived,
      component: () => import("./pages/requests/RequestsReceived.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/auth",
      component: () => import("./pages/auth/UserAuth.vue"),
      meta: { requiresUnauth: true },
    },
    { path: "/:notFound(.*)", component: () => import("./pages/NotFound.vue") },
  ],
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
