<template>
<v-app-bar
      color="blue-grey darken-3"
      dark
      app
      clipped-left
      dense
    >
      <v-app-bar-nav-icon pl-12 @click="$emit('toggle-sidebar')"></v-app-bar-nav-icon>
      <v-toolbar-title>TygerNUXT - <small>Reverse Proxy GUI</small></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout">
        <v-icon>mdi-lock</v-icon> Logout
      </v-btn>
    </v-app-bar>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
  async logout() {
    await this.$auth.logout();
    this.$router.push('/login')
  },

},
}
</script>
