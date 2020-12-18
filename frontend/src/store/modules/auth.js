import axios from 'axios'
//import Vue from 'vue'
import router from '../../router/index.js'
//import apiInstance from'../../plugins/axios'
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
      auth_success(state, token){
        state.status = 'success'
        state.token = token
      },
      auth_error(state){
        state.status = 'error'
      },
      setUser(state, user){
        state.user = user
      },
      logout(state){
        state.status = ''
        state.token = ''
        state.user = {}
      },
    },
    actions: {
      login({commit, dispatch}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          this._vm.$http({url: '/auth/login', data: user, method:'post'})
          .then(resp => {
            const token = resp.data.token
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            commit('auth_success', token)  
            dispatch('getUser');
            localStorage.token = 'Bearer ' + token
            localStorage.setItem('email', user.email)
            commit('setSnack', { snack: "Logged in! Welcome " + user.email, color: "info" })
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            console.log(err)
            commit('setSnack', { snack: "Oh dear, that didn't work. Check your Email and Password.", color: "error" })
            localStorage.clear()
            reject(err)
          })
        })
    },
    initialUser({commit, dispatch}, user){
      return new Promise((resolve, reject)=>{
        this._vm.$http({url: '/auth/initialuser', data: user, method:'post'})
        .then(response => {
          commit('setSnack', { snack: "Initial User updated, please login with your new details", color: "success" })
          dispatch('logout');
          resolve(response)
        }).catch(err => {
          commit('auth_error');
          commit('setSnack', { snack: "Oh dear, that didn't work. Check your Email and Password.", color: "error" })
          reject(err)
        })
      })
    },
    getUser({commit}){
      return new Promise((resolve, reject) => {
      this._vm.$http({url:'/user/me/', method:'get'}).then(data => {
        commit('setUser', data.data)
        resolve(data)
      }).catch(err => {
      reject(err)
    })
    })
  },
  updateUser({commit, dispatch}, data){
    return new Promise((resolve, reject) => {
    this._vm.$http({url:'/user/' + data.id, data: data, method:'patch'}).then(() => {
      commit('setSnack', { snack: "Profile Changed! Please login again.", color: "success" })
      dispatch('logout');
      router.push('login')
      resolve()
    })
    .catch(err => {
      commit('setSnack', { snack: "Oh dear, that didn't work. Did you enter your current password correctly?", color: "error" })
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
    },
    updatePassword({commit, dispatch}, data){
      return new Promise((resolve, reject) => {
        this._vm.$http({url: '/auth/change-password', data: data, method:'post'})
        .then(resp => {
          commit('setSnack', { snack: "Password Changed! Please login again.", color: "success" })
          dispatch('logout');
          router.push('login')
          resolve(resp)
        })
        .catch(err => {
          commit('setSnack', { snack: "Oh dear, that didn't work. Did you enter your current password correctly?", color: "error" })
          localStorage.clear()
          reject(err)
        })
      })
  },
  },
    getters : {
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
      currentUser: state => state.user,
    }
  }

  export default auth