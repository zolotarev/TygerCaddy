<template>
    <v-card flat class="blue-grey lighten-5">
    <v-toolbar color="orange" dark flat>
        <v-toolbar-title>My Profile</v-toolbar-title>
    </v-toolbar>
     <v-tabs color="orange" vertical>
      <v-tab>
        <v-icon left>
          mdi-account
        </v-icon>
        Details
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-lock
        </v-icon>
        Password
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-access-point
        </v-icon>
        Update
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <h2>User Details</h2>
            <br>
            <h4>Name: <small> {{currentUser.name}} </small> </h4>
            <h4>Email: <small> {{currentUser.email}} </small> </h4>
            <h4>Role: <small> {{currentUser.role}} </small> </h4>
            <h4>Created On: <small> {{currentUser.register_timestamp}} </small> </h4>
            <h4>Updated On: <small> {{currentUser.updatedAt | dateParse('YYYY-MM-DD HH:mm') | dateFormat('DD/MM/YYYY HH:mm')}} </small> </h4>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
             <update-password-card></update-password-card>

          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
                <update-profile-card :item="currentUser"></update-profile-card>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import UpdateProfileCard from '../Profile/UpdateProfileCard.vue';
import UpdatePasswordCard from '../Profile/UpdatePasswordCard.vue';
export default {
    components:{
        UpdateProfileCard,
        UpdatePasswordCard
    },
    computed:{
         ...mapGetters({
            currentUser: 'currentUser'
        })
    }
}
</script>