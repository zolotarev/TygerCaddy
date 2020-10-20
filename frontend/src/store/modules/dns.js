export const dns = {
    state:{
        dns: [],
    },
  
    actions: {
        getDNS({ commit }) {
          this._vm.$http.get("dns/").then(({
              data
            }) => {
              if (data) {
                  commit('GET_DNS', data)
                
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
        GET_DNS(state, data) {
            state.dns = data.results;
          },
    },
    getters: {
      showDNS(state){
          return state.dns
       }
      }
}

  
export default dns