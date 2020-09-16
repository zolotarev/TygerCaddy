export const state = () => ({
  addresses: [],
  addressLoading: false
})
export const getters = {

}
export const mutations = {
  SET_ADDRESSES(state, addresses) {
    state.addresses = addresses;
  },
  TOGGLE_ADDRESS_LOADING(state, addresses) {
    state.addressLoading = !state.addressLoading
  }
}
export const actions = {
  async getAddresses({
    commit
  }) {
    commit('TOGGLE_ADDRESS_LOADING')
    let res = await this.$axios.get(this.$env.TEST_VALUE + '/address').then((res) => {
      commit('SET_ADDRESSES', res.data),
        commit('TOGGLE_ADDRESS_LOADING')
    })

  },
  async addAddress({
    commit,
    dispatch
  }, data) {

    let res = await this.$axios.post(this.$env.TEST_VALUE + "address/", data).then((res) => {
      dispatch('getAddresses');
    }).catch((error) => {
      console.log(error)
      return error
    })
  },
  async updateAddress({
    commit,
    dispatch
  }, data) {
    let res = await this.$axios.patch(this.$env.TEST_VALUE + "address/" + data.id + "/", data).then((res) => {
      dispatch('getAddresses');
    }).catch((error) => {
      console.log(error)
      return error
    })
  },
  async deleteAddress({
    commit,
    dispatch
  }, data) {

    let res = await this.$axios.delete(this.$env.TEST_VALUE + "address/" + data.id).then((res) => {
      dispatch('getAddresses');
    }).catch((error) => {
      console.log(error)
      return error
    })
  },
}
