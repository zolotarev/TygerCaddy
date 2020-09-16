export const state = () => ({
  apps: [],
  appsLoading: false
})

export const mutations = {
  SET_APPS(state, apps) {
    state.apps = apps;
  },
  TOGGLE_APPS_LOADING(state, apps) {
    state.appsLoading = !state.appsLoading
  }
}

export const actions = {
  async getApps({
    commit
  }) {
    commit('TOGGLE_APPS_LOADING')
    let res = await this.$axios.get(this.$env.TEST_VALUE + '/app').then((res) => {
      commit('SET_APPS', res.data),
        commit('TOGGLE_APPS_LOADING')
    })
  },
  async addApp({
    commit,
    dispatch
  }, data) {

    let res = await this.$axios.post(this.$env.TEST_VALUE + "app/", data).then((res) => {
      dispatch('getApps');
    }).catch((error) => {
      console.log(error)
      return error
    })
  },
  async updateApp({
    commit,
    dispatch
  }, data) {
    let res = await this.$axios.patch(this.$env.TEST_VALUE + "app/" + data.id + "/", data).then((res) => {
      dispatch('getApps');
    }).catch((error) => {
      console.log(error)
      return error
    })
  },
  async deleteApp({
    commit,
    dispatch
  }, data) {

    let res = await this.$axios.delete(this.$env.TEST_VALUE + "app/" + data.id).then((res) => {
      dispatch('getApps');
    }).catch((error) => {
      console.log(error)
      return error
    })
  },
}

export const getters = {
  async showApps(state) {
    return state.apps
  }
}
