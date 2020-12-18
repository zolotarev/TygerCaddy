export const endpoints = {
  state:{
    endpoints: []
  },

  actions: {
    getEndpoints({ commit }, data) {
      this._vm.$http.get("endpoint/address/"+ data.id).then(function( response ){
                  commit('GET_ENDPOINTS', response.data)
      })
        .catch(() => {
          commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
        })
    },
    
    addEndpoint({ commit }, data) {
      this._vm.$http
        .post("endpoint/", data)
        .then(() => {
          commit('setSnack', {snack: "Endpoint was created!", color: 'success'})
        })
        .catch(() => {
          commit('setSnack', {snack: "Could not save the endpoint! Please check your data and try again", color: 'error'})
        });
    },
    updateEndpoint({ commit, dispatch }, data) {
      console.log(data)
      this._vm.$http.patch("endpoint/" + data.id + "/", data)
        .then(() => {
          let addr = {
            id: data.address
          }
          dispatch('getEndpoints', addr)
          commit('setSnack', {snack: "Endpoint was updated!", color: 'success'})
        })
    },
    deleteEndpoint({ commit, dispatch }, data) {
      console.log(data)
      this._vm.$http.delete("endpoint/" + data.id + "/")
        .then(() => {
          let addr = {
            id: data.addrid
          }
          dispatch('getEndpoints', addr)
          commit('setSnack', { snack: "Endpoint was deleted!", color: 'warning'})
        })
    },
  },
  mutations: {
    GET_ENDPOINTS(state, data) {
      state.endpoints = data;
    },
  },
  getters: {
    showEndpoints( state ){
      return state.endpoints
    },
  }
}

export default endpoints