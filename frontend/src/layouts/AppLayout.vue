<template>
  <v-app class="blue-grey lighten-2">
    <Navbar/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from '../components/global/Navbar'
import Footer from '../components/global/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
 data: () => ({
    drawer: null,
  }),
  methods:{
    }
  
}
</script>