<template>
  <v-app>
    <Snackbar />
    <component v-bind:is="layout"></component>
  </v-app>
</template>

<script>
import AppLayout from './layouts/AppLayout'
import SimpleLayout from './layouts/SimpleLayout'
import Snackbar from './components/global/Snackbar'

export default {
  name: "App",

  components: {
    'app-layout': AppLayout,
    'simple-layout': SimpleLayout,
    Snackbar
    // define as many layouts you want for the application
  },
  computed: {
    layout () {
      return this.$store.getters.layout
    }
  },
    created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          resolve
          this.$store.dispatch('logout')
        }
        reject
        throw err;
      });
    });
  },
  data: () => ({
    //
  })
};
</script>
