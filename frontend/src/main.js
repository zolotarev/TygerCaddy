import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import "./plugins/vee-validate";
import "./plugins/axios";
import SnackBar from "./plugins/snack";

import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import VueFilterDateParse from '@vuejs-community/vue-filter-date-parse';



Vue.component('validation-provider', ValidationProvider);
Vue.component('validation-observer', ValidationObserver);

Vue.use(SnackBar);
Vue.use(VueFilterDateFormat);
Vue.use(VueFilterDateParse);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
