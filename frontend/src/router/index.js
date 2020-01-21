import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Callback from "../views/Callback.vue";
/**
 * Game Views
 */
import Fibbing from "../views/Fibbing.vue";
import LeaderBoard from "../views/LeaderBoard.vue";
/**
 * Import the state for determining current auth state.
 */
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
      layout: "PlayerLayout"
    }
  },
  {
    path: "/about",
    name: "about",
    meta: {
      requiresAuth: true,
      layout: "PlayerLayout"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/game",
    name: "game",
    component: LeaderBoard,
    meta: {
      requiresAuth: true,
      layout: "GameLayout"
    }
  },
  {
    path: "/game/fib",
    name: "fib",
    component: Fibbing,
    meta: {
      requiresAuth: true,
      layout: "GameLayout"
    }
  },
  {
    path: "/game/play",
    name: "play",
    component: LeaderBoard,
    meta: {
      requiresAuth: true,
      layout: "GameLayout"
    }
  },
  {
    path: "/auth/callback",
    name: "callback",
    component: Callback,
    meta: {
      requiresAuth: false,
      layout: "PublicLayout"
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresAuth: false,
      layout: "PublicLayout"
    }
  },
  {
    path: "/logout",
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/**
 * Impliment router guards
 * for protected routes.
 */
router.beforeEach((to, from, next) => {
  /* If the route requires auth */
  if (to.meta.requiresAuth) {
    store.getters.authenticated ? next() : next({ name: "login" });
  } else {
    /* If the route is public */
    next();
  }
});

export default router;
