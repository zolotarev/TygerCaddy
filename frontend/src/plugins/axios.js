import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'

import store from '../store/index'


Vue.prototype.$http = axios;

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.prototype.$http.defaults.baseURL = 'http://localhost:3000/'

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