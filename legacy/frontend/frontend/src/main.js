import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const store = createStore()

app.use(store)
app.use(router)
app.use(VueAxios)
app.use(axios)
app.mount('#app')