export const quickadd = {
  state:{
  },

  actions: {
    
    quickAdd({ commit, dispatch }, data) {
      let address = data.address
      let app = data.app
      this._vm.$http
      .post("app/", app)
      .then(( savedApp ) => {
        dispatch('getApps')        
        address.app = [savedApp.data]
        this._vm.$http.post("address/", address).then(() => {
          console.log(address)
          dispatch('getAddresses');
          commit('setSnack', { snack: "QuickAdd Completed!", color: "success" })
        })
      })
      .catch((error) => {
        console.log(error)
        commit('setSnack', {snack: "Could not save the proxy! Please check your data and try again." + error, color: 'error'})
      });
    },
   
  },
  mutations: {
    
  },
  getters: {
    
  }
}

export default quickadd