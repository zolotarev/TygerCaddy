export const utility = {
  state: {
    cpu: 0,
    mem: 0
  },
  mutations: {
    setStats(state, data) {
      state.cpu = data.cpu_percent;
      state.mem = data.mem_percent;
    },
  },

  actions: {
    reloadProxy({ commit }) {
      this._vm.$http.get("/addresses/reload/").then(({ data }) => {
        if (data) {
            commit('setSnack', {snack: "Proxy was reloaded!", color: 'success'})
        }
      })
        .catch(() => {
          commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
        })
    },

    getStats({ commit }) {
      this._vm.$http.get("/stats/").then(({ data }) => {
        if (data) {
          commit('setStats', data)
        }
      }).catch (() => {
        commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
      })
    }
    
  },
  getters:{
    getCPU( state ){
      return state.cpu
    },
    getMEM( state ){
      return state.mem
    },
  },
}
export default utility

