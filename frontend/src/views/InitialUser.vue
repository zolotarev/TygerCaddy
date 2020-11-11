<template>
    <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">Change Default User</h2>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-3>
        <InitialUser-card></InitialUser-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import InitialUserCard from '../components/Profile/InitialUserCard.vue';

export default {
    components:{
        InitialUserCard,
      
    }
}
</script>