
export const apps = {
  state:{
    apps: [],
    appCount: null
  },

  actions: {
    getApps({ commit }) {
      this._vm.$http.get("app/").then(({ data }) => {
        if (data) {
          commit('GET_APPS', data)
        }
      })
        .catch(() => {
          commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
        })
    },
    addApp({ commit, dispatch }, data) {
      this._vm.$http
        .post("app/", data.app)
        .then(({ data }) => {
          dispatch('getApps')
          commit('setSnack', {snack: "App " + data.name + " (" + data.url + ")" + " was created!", color: 'success'})
        })
        .catch((error) => {
          console.log(error)
          commit('setSnack', {snack: "Could not save the proxy! Please check your data and try again." + error, color: 'error'})
        });
    },
    updateApp({ commit, dispatch }, data) {
      this._vm.$http.patch("app/" + data.id + "/", data)
        .then(() => {
          dispatch('getApps')
          commit('setSnack', {snack: "App " + data.name + " (" + data.url + ")" + " was updated!", color: 'success'})
        })
    },
    deleteApp({ commit, dispatch }, data) {
      let app = data
      this._vm.$http.delete("app/" + data.id + "/", data)
        .then(() => {
          dispatch('getApps')
          commit('setSnack', { snack: "App " + app.name + " (" + app.url + ")" + " was deleted!", color: "warning" })
        })
    },
  },
  mutations: {
    GET_APPS(state, data) {
      state.apps = data;
      state.appCount = data.length;
    },
  },
  getters: {
    showApps( state ){
      return state.apps
    },
    showAppCount( state ){
      return state.appCount
    }
  }
}

export default apps