<template>
    <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">My Profile</h2>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-3>
        <profile-card></profile-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProfileCard from '../components/Profile/ProfileCard.vue';

export default {
    components:{
        ProfileCard,
      
    }
}
</script>