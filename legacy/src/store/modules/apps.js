import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:3000/';

export const apps = {
  state:{
    apps: [],
    appCount: null
  },

  actions: {
    getApps({ commit }) {
      axios.get("app/").then(({ data }) => {
        if (data) {
          commit('GET_APPS', data)
        }
      })
        .catch(() => {
          commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
        })
    },
    addApp({ commit, dispatch }, data) {
      axios
        .post("app/", data)
        .then(() => {
          dispatch('getApps')
          commit('setSnack', {snack: "App was created!", color: 'success'})
        })
        .catch(() => {
          commit('setSnack', {snack: "Could not save the proxy! Please check your data and try again", color: 'error'})
        });
    },
    updateApp({ commit, dispatch }, data) {
      axios.patch("app/" + data.id + "/", data)
        .then(() => {
          dispatch('getApps')
          commit('setSnack', {snack: "App was updated!", color: 'success'})
        })
    },
    deleteApp({ commit, dispatch }, data) {
      axios.delete("app/" + data.id + "/", data)
        .then(() => {
          dispatch('getApps')
          commit('setSnack', { snack: "App was deleted!", color: "warning" })
        })
    },
  },
  mutations: {
    GET_APPS(state, data) {
      state.apps = data;
      state.appCount = data.count;
    },
  },
  getters: {
    showApps( state ){
      return state.apps
    },
    showAppCount( state ){
      if(state.apps){
        return state.apps.length
      }else{
        return 0
      }
    }
  }
}

