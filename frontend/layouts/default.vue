<template>
  <v-app id="inspire">
    <Sidebar />
    <v-main>
      <nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Sidebar from "../components/default/Sidebar";
import Footer from "../components/default/Footer";

export default {
  components: {
    Sidebar,
    Footer,
  },
  props: {
    source: String,
  },
  mounted() {
    if (!this.$auth.loggedIn) {
      this.$router.push("login");
    }
  },
  data: () => ({
    drawer: null,
  }),
};
</script>
