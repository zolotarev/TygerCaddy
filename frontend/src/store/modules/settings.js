export const settings = {
  state:{
    settings: {},
    dnsProviders:[]
  },

  actions: {
    getDnsProviders({commit}){
      this._vm.$http.get("dns/").then( function( response ){
        commit('GET_DNS', response.data)
      })
      .catch(function(){
          commit('setSnack', {snack: "Could not communicate with the backend!", color: "error"})
      });
    },
    getConfig( { commit } ){
      this._vm.$http.get("config/").then( function( response ){
        commit('GET_SETTINGS', response.data)
      })
      .catch(function(){
          commit('setSnack', {snack: "Could not communicate with the backend!", color: "error"})
      });
    },
    updateConfig( { commit, dispatch }, data ){
      this._vm.$http.patch("config/", data).then(() => {
          dispatch('getConfig');
          commit('setSnack', {snack: "Config was updated!", color: "success" })
        })
    },
  },
  mutations: {
    GET_SETTINGS( state , data) {
      state.settings = data
    },
    GET_DNS( state , data) {
      state.dnsProviders = data
    }
  },
  getters: {
    showConfig( state ){
      return state.settings
    },
    showDNS( state ){
      return state.dnsProviders
    },
  }
}

export default settings