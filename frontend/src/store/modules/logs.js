
import axios from 'axios';


export const logs = {
    state:{
        caddylogs: [],
        uwsgilogs: [],
    },
  
    actions: {
        getCaddyLogs({ commit }) {
            axios.get("logs/caddy/").then(({
              data
            }) => {
              if (data) {
                  commit('GET_CADDY_LOGS', data)
                
              }
            })
              .catch(() => {
                commit('setSnack', {
               snack: "Could not communicate with the backend!",
               color: "error"
                })
              })
          },
          getuWSGILogs({ commit }) {
            axios.get("logs/uwsgi/").then(({
              data
            }) => {
              if (data) {
                  commit('GET_UWSGI_LOGS', data)
                
              }
            })
              .catch(() => {
                commit('setSnack', {
               snack: "Could not communicate with the backend!",
               color: "error"
                })
              })
          },
    },
    mutations: {
        GET_CADDY_LOGS(state, data) {
            state.caddylogs = data;
          },
          GET_UWSGI_LOGS(state, data) {
            state.uwsgilogs = data;
          },
    },
    getters: {
      showCaddyLogs(state){
          return state.caddylogs
       },
       showuWSGILogs(state){
        return state.uwsgilogs
     }
      }
}

export default logs