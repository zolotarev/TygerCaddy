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
import InitialUser from "../views/InitialUser.vue";
import Logs from "../views/Logs.vue";
import Certificates from "../views/Certificates.vue";
import DNSProviders from "../views/DNSProviders.vue";
import QuickAdd from "../views/QuickAdd.vue";
import LoadBalance from "../views/LoadBalancing.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      title:"Dashboard"
    }
  },
  {
    path: "",
    name: "Home",
    component: Dashboard,
    meta: {
      requiresAuth: true,
      title:"Dashboard"
    }
  },
  {
    path: "/initialUser",
    name: "InitialUser",
    component: InitialUser,
    meta: {
      requiresAuth: true,
      title:"Initial User"
    }
  },
  {
    path: "/apps",
    name: "Apps",
    component: Apps,
    meta: {
      requiresAuth: true,
      title:"Apps"
    }
  },
  {
    path: "/apps/:name",
    name: "appName",
    component: Apps,
    meta: {
      requiresAuth: true,
      title:"Apps"
    }
  },
  {
    path: "/addresses",
    name: "Addresses",
    component: Addresses,
    meta: {
      requiresAuth: true,
      title:"Addresses"
    }
  },
  {
    path: "/certificates",
    name: "Certificates",
    component: Certificates,
    meta: {
      requiresAuth: true,
      title:"Certificates"
    }
  },
  {
    path: "/dns-providers",
    name: "DNS Providers",
    component: DNSProviders,
    meta: {
      requiresAuth: true,
      title:"DNS Providers"
    }
  },
  {
    path: "/backup",
    name: "Backup",
    component: Backup,
    meta: {
      requiresAuth: true,
      title:"Backup"
    }
  },
  {
    path: "/config",
    name: "Config",
    component: Config,
    meta: {
      requiresAuth: true,
      title:"Config"
    }
  },
  {
    path: "/logs",
    name: "Logs",
    component: Logs,
    meta: {
      requiresAuth: true,
      title:"Logs"
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true,
      title:"Profile"
    }
  },
  {
    path: "/quickadd",
    name: "QuickAdd",
    component: QuickAdd,
    meta: {
      requiresAuth: true,
      title:"Quick Add"
    }
  },
  {
    path: "/load-balance",
    name: "LoadBalance",
    component: LoadBalance,
    meta: {
      requiresAuth: true,
      title:"Load Balance"
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false,
      title:"Login"
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  let title = to.meta.title
  document.title = "TygerCaddy | " + title;
  if (to.matched.some(record => record.name == 'Login')) {
    store.commit('SET_LAYOUT', 'simple-layout')
  }else{
    store.commit('SET_LAYOUT', 'app-layout')
  }
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      if(localStorage.email == "admin@admin.com" && to.name !== "InitialUser"){
        console.log(localStorage.email)
        console.log(to)
        return router.push('/initialUser')
      }else {
        next()
        return
      }
    }
    next('/login')
  } else {
    next()
  }
})
export default router;
