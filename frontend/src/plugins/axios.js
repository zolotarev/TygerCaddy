import axios from 'axios';
import store from '../store/index'
import getEnv from '@/utils/env'

const API_URL = getEnv('VUE_APP_API_URL')
const token = localStorage.getItem('token')
console.log(token)

let URL = ""
if(API_URL){
  URL = API_URL
}else{
  URL = "http://localhost:3000"
}
// const apiInstance = axios.create({
//   baseURL: URL,
//   headers:{
//     'Authorization' : token
//   }
// })
axios.defaults.baseURL = URL;
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.interceptors.response.use(function (response) {
//   return response;
// }, function (error) {
//   if (401 === error.response.status) {
//     this._vm.$store.commit('setSnack', {snack: "It looks like your token expired!", color: "error"})
//     //this._vm.$store.dispatch('logout')
//   } else {
//       return Promise.reject(error);
//   }
// });

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