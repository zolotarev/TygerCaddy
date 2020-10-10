import Vue from "vue";
import Vuex from "vuex";

import auth from './modules/auth';
import layout from './modules/layout';
import snackbar from './modules/snackbar';

import addresses from'./modules/addresses';
import apps from'./modules/apps';
import dns from'./modules/dns';
import endpoint from'./modules/endpoint';
import backup from'./modules/export';
import logs from'./modules/logs';
import utility from'./modules/utility';


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
    dns,
    endpoint,
    backup,
    logs,
    utility
  }
});
