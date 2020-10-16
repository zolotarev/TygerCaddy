import axios from 'axios';

export const addresses = {
  state:{
    addresses: [],
    addressCount: null
  },

  actions: {
    getAddresses( { commit } ){
      axios.get("address/").then( function( response ){
        commit('GET_ADDS', response.data)
      })
      .catch(function(){
          commit('setSnack', {snack: "Could not communicate with the backend!", color: "error"})
      });
    },
    
    addAddress({ commit, dispatch }, data) {
      let address = data
      axios.post("address/", data)
        .then(() => {
          dispatch('getAddresses');
          commit('setSnack', { snack: "New proxy created from " + address.address, color: "success" })
        })
        .catch(() => {
          commit('setSnack', { snack: "Could not save the proxy! Please check your data and try again", color: "error" })
        });
    },
    updateAddress( { commit, dispatch }, data ){
      axios.patch("address/" + data.id + "/", data).then(({ data }) => {
          dispatch('getAddresses');
          commit('setSnack', {snack: "Address " + data.address + " was updated!", color: "success" })
        })
    },
    deleteAddress({ commit, dispatch }, data) {
      const add = data
      axios.delete("address/" + data.id + "/", data)
        .then(() => {
          dispatch('getAddresses');
          commit('setSnack', { snack: "Address " + add.address + " (" + add.app.name + ")" + " was deleted!", color: "warning" })
        })
        .catch(() => {
          commit('setSnack', { snack: "There was an error! Please check your data and try again", color: "error" })
        });
    },
    generate({commit}){
      axios.get('address/generate')
      .then(()=>{
        commit('setSnack', { snack: "Generate command sent to backend", color: "warning" })
      })
    }
  },
  mutations: {
    GET_ADDS( state , data) {
      state.addresses = data
      state.addressCount = data.length
    }
  },
  getters: {
    showAddresses( state ){
      return state.addresses
    },
    showAddressCount( state ){
      return state.addressCount
    }
  }
}

export default addresses