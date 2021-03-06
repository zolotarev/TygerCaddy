export const loadbalance = {
  state:{
    policies:[],
    lb:[]
  },

  actions: {
   getPolicies({commit}){
    this._vm.$http.get("loadbalance/policies").then( function( response ){
      commit('GET_POLICIES', response.data)
    }).catch(() => {
      commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
    })
   },
   getLb({commit}){
    this._vm.$http.get("loadbalance/").then( function( response ){
      commit('GET_LB', response.data)
    }).catch(() => {
      commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
    })
   },
   addLb({ commit, dispatch }, data) {
    this._vm.$http.post("loadbalance/", data)
      .then(() => {
        dispatch('getLb');
        commit('setSnack', { snack: "New Load Balancer created", color: "success" })
      })
      .catch(() => {
        commit('setSnack', { snack: "Could not save the Load Balancer! Please check your data and try again", color: "error" })
      });
    },
    updateLb( { commit, dispatch }, data ){
      this._vm.$http.patch("loadbalance/" + data.id + "/", data).then(() => {
          dispatch('getLb');
          commit('setSnack', {snack: "Load Balancer was updated!", color: "success" })
        })
    },
    deleteLb({ commit, dispatch }, data) {

      this._vm.$http.delete("loadbalance/" + data.id + "/", data)
        .then(() => {
          dispatch('getLb');
          commit('setSnack', { snack: "Load Blanacer was deleted!", color: "warning" })
        })
        .catch(() => {
          commit('setSnack', { snack: "There was an error! Please check your data and try again", color: "error" })
        });
    },
  },
  mutations: {
    GET_POLICIES( state , data) {
      state.policies = data
    },
    GET_LB( state , data) {
      state.lb = data
    }
  },
  getters: {
    showPolicies( state ){
      return state.policies
    },
    showLbs( state ){
      return state.lb
    },
  }
}

export default loadbalance