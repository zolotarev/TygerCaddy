export const logs = {
    state:{
        currentlog:[],
        logLoading: false
    },
  
    actions: {
      getCurrentLog({ commit }, addressId) {
        commit('SET_LOG_LOADING', true);
        this._vm.$http.get("address/logs/" + addressId).then(({
            data
          }) => {
            if (data) {
                commit('LOAD_CURRENT_LOG', data)
            }
            commit('SET_LOG_LOADING', false);
          })
            .catch(() => {
              commit('SET_LOG_LOADING', false);
              commit('setSnack', {
             snack: "Sorry there was a problem getting the logs!",
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
      SET_LOG_LOADING(state,data){
        state.logLoading = data
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
      getLogLoading(state){
        return state.logLoading
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