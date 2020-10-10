import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js"

import Dashboard from "../views/Dashboard.vue";
import Apps from "../views/Apps.vue";
import Addresses from "../views/Addresses.vue";
import Backup from "../views/Backup.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/apps",
    name: "Apps",
    component: Apps,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/addresses",
    name: "Addresses",
    component: Addresses,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/backup",
    name: "Backup",
    component: Backup,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.name == 'Login')) {
    store.commit('SET_LAYOUT', 'simple-layout')
  }else{
    store.commit('SET_LAYOUT', 'app-layout')
  }
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})
export default router;
