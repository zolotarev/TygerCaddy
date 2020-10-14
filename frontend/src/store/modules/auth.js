//import axios from 'axios'
//import Vue from 'vue'

export const auth = {
    state: {
      status: '',
      token: localStorage.getItem('token') || '',
      user : {}
    },
    mutations: {
      auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, token, user){
        state.status = 'success'
        state.token = token
        state.user = user
      },
      auth_error(state){
        state.status = 'error'
      },
      logout(state){
        state.status = ''
        state.token = ''
      },
    },
    actions: {
      login({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          this._vm.$http({url: '/auth/login', data: user, method:'post'})
          .then(resp => {
            const token = resp.data.token
            //const user = resp.data.user
            localStorage.setItem('token', 'Bearer ' + token)
            localStorage.setItem('email', user.email)
            this._vm.$http.defaults.headers.common['Authorization'] = token
            commit('setSnack', { snack: "Logged in! Welcome " + user.email, color: "info" })
            commit('auth_success', token, user)
           
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.clear()
            reject(err)
          })
        })
    },
    logout({commit}){
      return new Promise((resolve) => {
        commit('logout')
        localStorage.clear()
        commit('setSnack', { snack: "You have been logged out. ", color: "info" })
        delete this._vm.$http.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
    getters : {
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
    }
  }

  export default auth