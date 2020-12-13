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
      
  },
  getters:{
    
  },
}
export default utility

