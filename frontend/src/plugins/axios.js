import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios'

import store from '../store/index'
import getEnv from '@/utils/env'


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
const apiInstance = axios.create({
  baseURL: URL,
  headers:{
    'Authorization' : token
  }
})

apiInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status) {
    store.commit('setSnack', {snack: "It looks like your token expired!", color: "error"})
          window.location = '/login';
  } else {
      return Promise.reject(error);
  }
});

Vue.prototype.$http = apiInstance;

Vue.use(VueAxios, axios);