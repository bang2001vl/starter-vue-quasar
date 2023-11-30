import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import {
  SUPPORT_LOCALES,
  i18n,
  loadLocaleMessages,
  handleChangeLocale,
  setI18nLanguage,
} from "../i18n";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: HomePage,
    },
    {
      path: "/home",
      name: "home",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../pages/HomePage.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/LoginPage.vue"),
      meta: {
        title: "Login - Thunder App",
        transition: "fade",
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../pages/signup/SignupPage.vue"),
      meta: {
        title: "SignUp - Thunder App",
        transition: "fade",
      },
    },
  ],
});

// navigation guards
router.beforeEach(async (to, from, next) => {
  await handleChangeLocale(to.query.locale?.toString());
  return next();
});

// Transitions
router.afterEach((to, from) => {
  document.title = `${to.meta.title || "Thunder App"}`;
});

export default router;
