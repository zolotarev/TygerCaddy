import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import "./plugins/vee-validate";
import axios from 'axios';
import VueAxios from 'vue-axios'
import getEnv from '@/utils/env'
//import apiInstance from "./plugins/axios";
import SnackBar from "./plugins/snack";

import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import VueFilterDateParse from '@vuejs-community/vue-filter-date-parse';
const API_URL = getEnv('VUE_APP_API_URL')
const token = localStorage.getItem('token')

let URL = ""
if(API_URL){
  URL = API_URL
}else{
  URL = "http://localhost:3000"
}

axios.defaults.baseURL = URL;
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    store.commit('setSnack', {snack: "It looks like your token expired!", color: "error"})
    //store.dispatch('logout')
  } else {
      return Promise.reject(error);
  }
});


Vue.component('validation-provider', ValidationProvider);
Vue.component('validation-observer', ValidationObserver);

Vue.use(SnackBar);
Vue.use(VueFilterDateFormat);
Vue.use(VueFilterDateParse);
Vue.prototype.$http = axios;

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
