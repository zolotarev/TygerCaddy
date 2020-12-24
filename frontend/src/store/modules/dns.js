export const dns = {
  state:{
    dns: [],
    activeDNS:[],
    dnsCount: null
  },

  actions: {
    getDNS( { commit } ){
      this._vm.$http.get("dns/").then( function( response ){
        commit('GET_DNS', response.data)
      })
      .catch(function(){
          commit('setSnack', {snack: "Could not communicate with the backend!", color: "error"})
      });
    },
    getActiveDNS( { commit } ){
      this._vm.$http.get("dns/active").then( function( response ){
        commit('GET_ACTIVE_DNS', response.data)
      })
      .catch(function(){
          commit('setSnack', {snack: "Could not communicate with the backend!", color: "error"})
      });
    },
    
    updateDNS( { commit, dispatch }, data ){
      this._vm.$http.patch("dns/" + data.id + "/", data).then(() => {
          dispatch('getDNS');
          commit('setSnack', {snack: "DNS was updated!", color: "success" })
        })
    },
  },
  mutations: {
    GET_DNS( state , data) {
      state.dns = data
      state.dnsCount = data.length
    },
    GET_ACTIVE_DNS( state , data) {
      state.activeDNS = data
      state.dnsCount = data.length
    }
  },
  getters: {
    getDNS( state ){
      return state.dns
    },
    getActiveDNS( state ){
      return state.activeDNS
    },
    showDNSCount( state ){
      return state.dns
    }
  }
}

export default dns