import {
  state
} from "./config";

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
};
export const mutations = {
  SET_USER(state, user) {
    state.auth.user = user;
  },
  TOGGLE_CONFIG_LOADING(state, config) {
    state.configLoading = !state.configLoading
  }
}
export const actions = {
  async getUser({
    commit
  }) {

    let res = await this.$axios.get(this.$env.TEST_VALUE + '/user/1').then((res) => {
      commit('SET_USER', res.data)
    })
  },

  async changePassword({
    commit,
    dispatch
  }, data) {
    let res = await this.$axios.post(this.$env.TEST_VALUE + "/auth/change-password", data).then((res) => {

    }).catch((error) => {
      console.log(error)
      return error
    })
  },

  async updateUser({
    commit,
    dispatch
  }, data) {
    let res = await this.$axios.patch(this.$env.TEST_VALUE + "/user/1", data).then((res) => {
      this.$auth.logout();
      this.$router.push('/login')
    }).catch((error) => {
      console.log(error)
      return error
    })
  },
}
