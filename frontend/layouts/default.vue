
<template>
  <v-app id="inspire">
    <Sidebar />
    <v-content>
      <nuxt />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Sidebar from '../components/default/Sidebar'
import Footer from '../components/default/Footer'

  export default {
    components: {
      Sidebar,
      Footer,

    },
    props: {
      source: String,
    },

    data: () => ({
      drawer: null,
    }),
  }
</script>
