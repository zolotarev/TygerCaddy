export const logs = {
    state:{
        caddylogs: [],
        uwsgilogs: [],
        currentlog:[]
    },
  
    actions: {
      getCurrentLog({ commit }, addressId) {
        this._vm.$http.get("address/logs/" + addressId).then(({
            data
          }) => {
            if (data) {
                commit('LOAD_CURRENT_LOG', data)
              
            }
          })
            .catch(() => {
              commit('setSnack', {
             snack: "Could not communicate with the backend!",
             color: "error"
              })
            })
        },
        getCaddyLogs({ commit }) {
          this._vm.$http.get("logs/caddy/").then(({
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
            this._vm.$http.get("logs/uwsgi/").then(({
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
      LOAD_CURRENT_LOG(state,data){
        state.currentlog = data
      },
        GET_CADDY_LOGS(state, data) {
            state.caddylogs = data;
          },
          GET_UWSGI_LOGS(state, data) {
            state.uwsgilogs = data;
          },
    },
    getters: {
      CurrentLogGetter(state){
        return state.currentlog
      },
      showCaddyLogs(state){
          return state.caddylogs
       },
       showuWSGILogs(state){
        return state.uwsgilogs
     }
      }
}

export default logs