
export const certs = {
    state:{
      certs: [],
      certCount: null
    },
  
    actions: {
      getCerts({ commit }) {
        this._vm.$http.get("cert/").then(({ data }) => {
          if (data) {
            commit('GET_CERTS', data)
          }
        })
          .catch(() => {
            commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
          })
      },
      addCert({ commit, dispatch }, data) {
        const headers = { 
          "Content-Type": "multipart/form-data"
        };
        console.log(data)
        console.log(headers)
        this._vm.$http
          .post("cert/", data)
          .then(() => {
            dispatch('getCerts')
            commit('setSnack', {snack: "Certificate was created!", color: 'success'})
          })
          .catch((error) => {
            console.log(error)
            commit('setSnack', {snack: "Could not save the cert! Please check your data and try again." + error, color: 'error'})
          });
      },
      updateCert({ commit, dispatch }, data) {
        this._vm.$http.patch("cert/" + data.id + "/", data)
          .then(() => {
            dispatch('getCerts')
            commit('setSnack', {snack: "Certificate was updated!", color: 'success'})
          })
      },
      deleteCert({ commit, dispatch }, data) {
       
        this._vm.$http.delete("cert/" + data.id + "/", data)
          .then(() => {
            dispatch('getCerts')
            commit('setSnack', { snack: "Certificate was deleted!", color: "warning" })
          })
      },
    },
    mutations: {
      GET_CERTS(state, data) {
        state.certs = data;
        state.certCount = data.length;
      },
    },
    getters: {
      showCerts( state ){
        return state.certs
      },
      showCertCount( state ){
        return state.certCount
      }
    }
  }
  
  export default certs