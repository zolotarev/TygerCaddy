export const state = () => ({
  config: {},
  configLoading: false
})

export const mutations = {
  SET_CONFIG(state, config) {
    state.config = config;
  },
  TOGGLE_CONFIG_LOADING(state, config) {
    state.configLoading = !state.configLoading
  }
}

export const actions = {
  async getConfig({
    commit
  }) {
    commit('TOGGLE_CONFIG_LOADING')
    let res = await this.$axios.get(this.$env.TEST_VALUE + '/config').then((res) => {
      commit('SET_CONFIG', res.data),
        commit('TOGGLE_CONFIG_LOADING')
    })
  },
  async updateConfig({
    commit,
    dispatch
  }, data) {
    let res = await this.$axios.patch(this.$env.TEST_VALUE + "/config", data).then((res) => {
      dispatch('getConfig');
    }).catch((error) => {
      console.log(error)
      return error
    })
  },
}

export const getters = {
  async showConfig(state) {
    return state.config
  }
}
