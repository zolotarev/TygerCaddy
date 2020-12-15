import Vue from "vue";
import Vuex from "vuex";

import auth from './modules/auth';
import layout from './modules/layout';
import snackbar from './modules/snackbar';
import addresses from './modules/addresses';
import apps from './modules/apps';
import endpoint from './modules/endpoint';
import backup from './modules/export';
import logs from './modules/logs';
import utility from './modules/utility';
import settings from './modules/settings';
import certs from './modules/certs';
import dns from './modules/dns';
import quickadd from './modules/quickadd';
import loadbalance from './modules/loadbalance';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    layout,
    snackbar,
    addresses,
    apps,
    endpoint,
    backup,
    logs,
    utility,
    settings,
    quickadd,
    loadbalance,
    dns,
    certs
  }
});
