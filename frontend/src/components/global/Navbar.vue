<template>
  <div>
    <v-navigation-drawer
      dark
      class="blue-grey darken-3"
      clipped
      v-model="drawer"
      app
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="require('@/assets/users.png')" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              >Welcome: <small>{{ currentUser.name }}</small></v-list-item-title
            >
            <v-list-item-subtitle>
              <v-btn block link :to="'profile'">Profile</v-btn>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          link
          :to="link.route"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="orange" dark fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>TygerCaddy Vue Frontend</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn dark tile text class="orange" @click="logout">
        <v-icon>mdi-lock</v-icon>
        <div class="d-none d-lg-block">logout</div>
      </v-btn>
      <v-btn dark tile text class="orange" @click="GenerateCaddyfile">
        <v-icon>mdi-autorenew</v-icon>
        <div class="d-none d-lg-block">Generate</div>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import getEnv from "@/utils/env";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    drawer: true,
    API: getEnv("VUE_APP_API_URL"),
    links: [
      {
        route: "/",
        text: "Home",
        icon: "mdi-home",
      },
      {
        route: "apps",
        text: "Applications",
        icon: "mdi-apps",
      },
      {
        route: "addresses",
        text: "Addresses",
        icon: "mdi-domain",
      },
      {
        route: "certificates",
        text: "Certificates",
        icon: "mdi-certificate",
      },
      {
        route: "load-balance",
        text: "Load Balancing",
        icon: "mdi-certificate",
      },
      {
        route: "backup",
        text: "Backup/Restore",
        icon: "mdi-application-export",
      },
      {
        route: "config",
        text: "Config",
        icon: "mdi-timelapse",
      },
      {
        route: "logs",
        text: "Logs",
        icon: "mdi-text-box-search-outline",
      },
      {
        route: "restart",
        text: "Restart Proxy",
        icon: "mdi-autorenew",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
    }),
  },
  created() {},
  mounted() {
    this.$store.dispatch("getUser");
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("Login");
    },
    GenerateCaddyfile() {
      this.$store.dispatch("generate");
    },
  },
};
</script>
