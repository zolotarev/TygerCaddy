import axios from 'axios';

export const settings = {
  state:{
    settings: {}
  },

  actions: {
    getConfig( { commit } ){
      axios.get("config/").then( function( response ){
        commit('GET_SETTINGS', response.data)
      })
      .catch(function(){
          commit('setSnack', {snack: "Could not communicate with the backend!", color: "error"})
      });
    },
    updateConfig( { commit, dispatch }, data ){
      axios.patch("config/1/", data).then(() => {
          dispatch('getConfig');
          commit('setSnack', {snack: "Config was updated!", color: "success" })
        })
    },
  },
  mutations: {
    GET_SETTINGS( state , data) {
      state.settings = data
    }
  },
  getters: {
    showConfig( state ){
      return state.settings
    },
  }
}

export default settings