
export const snackbar = {
    state: {
        snack: '',
        color: ''
    },
    mutations: {
        setSnack (state, {snack, color}) {
            state.snack = snack
            state.color = color
          }
    },
    actions: {
        fireSnack({commit}, message) {
            commit('setSnack', { snack: message.snack, color: message.color })
        }
    },
    getters:{
        snack(state){
            return state.snack
        },
        color(state){
            return state.color
        },
    }
}

export default snackbar