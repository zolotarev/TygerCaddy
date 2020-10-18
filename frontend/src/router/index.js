import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js"

import Dashboard from "../views/Dashboard.vue";
import Apps from "../views/Apps.vue";
import Addresses from "../views/Addresses.vue";
import Backup from "../views/Backup.vue";
import Config from "../views/Config.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
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
    path: "/config",
    name: "Config",
    component: Config,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
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
