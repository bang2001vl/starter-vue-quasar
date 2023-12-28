import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/unknown",
      name: "unknown",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/UnknownPage.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name == null) {
    next({ name: "unknown" });
  }
  if (!router.hasRoute(to.name!)) {
    next({ name: "unknown" });
  }
  next();
});

export default router;
