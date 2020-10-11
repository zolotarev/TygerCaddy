import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'

import store from '../store/index'
import getEnv from '@/utils/env'

Vue.prototype.$http = axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

const API_URL = getEnv('VUE_APP_API_URL')

if (API_URL){
  Vue.prototype.$http.defaults.baseURL = API_URL
}else {
  Vue.prototype.$http.defaults.baseURL = 'http://localhost:3000/'
}


Vue.prototype.$http.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    store.commit('setSnack', {snack: "It looks like your token expired!", color: "error"})

          window.location = '/login';
  } else {
      return Promise.reject(error);
  }
});





Vue.use(VueAxios, axios);