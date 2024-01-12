import { createRouter, createWebHistory } from "vue-router";
import coachesPage from "./pages/coaches.vue";
import requestsPage from "./pages/requests.vue";
import contactPage from "./pages/contact.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: coachesPage },
    {
      path: "/coaches/id",
      component: null,
      children: {
        path: "contact",
        component: contactPage,
      },
    },
    { path: "/requests", component: requestsPage },
    { path: "/:notFound(.*)", component: null },
  ],
});

export default router;
