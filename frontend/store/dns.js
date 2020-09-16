export const state = () => ({
  dns: [],
  dnsLoading: false
})

export const mutations = {
  SET_DNS(state, dns) {
    state.dns = dns;
  },
  TOGGLE_DNS_LOADING(state, dns) {
    state.dnsLoading = !state.dnsLoading
  }
}

export const actions = {
  async getDNS({
    commit
  }) {
    commit('TOGGLE_DNS_LOADING')
    let res = await this.$axios.get(this.$env.TEST_VALUE + '/dns').then((res) => {
      commit('SET_DNS', res.data),
        commit('TOGGLE_DNS_LOADING')
    })
  }
}

export const getters = {
  async showDNS(state) {
    return state.dns
  }
}
