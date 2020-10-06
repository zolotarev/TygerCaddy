import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000/';

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
          commit('setSnack', { snack: "New proxy created!", color: "success" })
        })
        .catch(() => {
          commit('setSnack', { snack: "Could not save the proxy! Please check your data and try again", color: "error" })
        });
    },
    updateAddress( { commit, dispatch }, data ){
      axios.patch("address/" + data.id + "/", data).then(() => {
          dispatch('getAddresses');
          commit('setSnack', {snack: "Address was updated!", color: "success" })
        })
    },
    deleteAddress({ commit, dispatch }, data) {
      const add = data
      axios.delete("address/" + data.id + "/", data)
        .then(() => {
          dispatch('getAddresses');
          commit('setSnack', { snack: "Address was deleted!", color: "warning" })
        })
        .catch(() => {
          commit('setSnack', { snack: "There was an error! Please check your data and try again", color: "error" })
        });
    },
  },
  mutations: {
    GET_ADDS( state , data) {
      state.addresses = data
      state.addressCount = data.count
    }
  },
  getters: {
    showAddresses( state ){
      return state.addresses
    },
    showAddressCount( state ){
      if(state.addresses){
        return state.addresses.length
      }else{
        return 0
      }
    }
  }
}

