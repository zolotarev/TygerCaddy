<template>
  <v-flex xs12 sm12 pa-3>

<v-toolbar color="deep-orange" dark>
      <v-toolbar-title>My Profile</v-toolbar-title>
      <v-spacer></v-spacer>


        <v-icon large color="white">mdi-face</v-icon>

    </v-toolbar>
<v-card class="blue-grey lighten-5">


          <v-card-text class="headline font-weight-bold">
            <v-layout row wrap class="justify-center">
              <v-flex xs4>
               <strong>{{loggedInUser.username}}</strong> Profile

                  <p>
                  <strong>Id:</strong>
      {{loggedInUser.id}}
    </p>
        <p>
      <strong>First name:</strong>
      {{loggedInUser.firstname}}
    </p>
        <p>
      <strong>Last Name:</strong>
      {{loggedInUser.lastname}}
    </p>
    <p>
      <strong>Email:</strong>
      {{loggedInUser.email}}
    </p>
    <strong>Roles:</strong>
    <ul>
      <li v-for="(role,index) in loggedInUser.roles" :key="index">{{role}}</li>
    </ul>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   middleware: 'auth',
  computed: {
    ...mapGetters(['loggedInUser'])
  }
}
</script>
