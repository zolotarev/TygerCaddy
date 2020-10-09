import store from '../store/index'
const SnackBar = {}
SnackBar.install = function (Vue) {
    // 4. add an instance method
    Vue.prototype.$snack = function ({snack, color}) {

        store.commit('setSnack', { snack, color })
    }
  }
export default SnackBar