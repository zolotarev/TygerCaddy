export const backup = {
  state:{
    backup: {}
  },

  actions: {
    getBackupData( { commit } ){
      this._vm.$http.get("backup/export/").then( function( response ){
        commit('GET_BACKUP', response.data)
      })
      .catch(function(){
        commit('setSnack', { snack: "There was a problem generating the export", color: "error" })
      });
    },
    tyger2Restore( { commit }, data ){
      this._vm.$http.post("backup/tyger2/restore", data).then( function(){
        commit('setSnack', {snack: "Restore Complete!", color: "success"})
      })
      .catch(function(){
        commit('setSnack', {snack: "Could not communicate with the backend!", color: "error"})
      });
    },
    tygercaddyRestore( { commit }, data ){
      this._vm.$http.post("backup/tygercaddy/restore", data).then( function(){
        commit('setSnack', {snack: "Restore Complete!", color: "success"})
      })
      .catch(function(){
        commit('setSnack', {snack: "Could not communicate with the backend!", color: "error"})
      });
    },
    
},
  mutations: {
    GET_BACKUP( state , data) {
      state.backup = data
    }
  },
  getters: {
    showBackup( state ){
      return state.backup
    },
  }
}

export default backup