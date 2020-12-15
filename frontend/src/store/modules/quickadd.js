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
        console.log(savedApp.data)
        dispatch('getApps')
        commit('setSnack', {snack: "App " + savedApp.data.name + " was created!", color: 'success'})
        
        address.app= savedApp.data
        this._vm.$http.post("address/", address).then((savedAddress) => {
          console.log(savedAddress.data)
          dispatch('getAddresses');
          commit('setSnack', { snack: "New address created " + savedAddress.data.address, color: "success" })
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