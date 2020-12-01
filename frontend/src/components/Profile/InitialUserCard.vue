<template>
    <v-card flat class="blue-grey lighten-5">
    <v-toolbar color="orange" dark flat>
        <v-toolbar-title>Initial User</v-toolbar-title>
    </v-toolbar>
<v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <h2>Initial User</h2>
            <br>
            <p>You are required to change these details for security and to allow HTTPS functionality. You must change at least the email address and password. Upon successful update, you will be logged out and required to login again.</p>
<validation-observer
    ref="observer"
    v-slot="{ handleSubmit }">
    <form name="form" @submit.prevent="handleSubmit(onSubmit)">

    <validation-provider
                  v-slot="{ errors }"
                  name="name"
                  rules="required"
                >

                 <v-text-field 
                  color="orange"
                  name="Name" 
                  label="User Name"  
                  v-model="currentUser.name"
                  :error-messages="errors"
                  required>
                </v-text-field>
    </validation-provider>
    <validation-provider
                  v-slot="{ errors }"
                  name="email"
                  rules="required"
                >

                 <v-text-field 
                  color="orange"
                  name="email"
                  vid="email" 
                  label="Email Address"  
                  v-model="currentUser.email"
                  :error-messages="errors"
                  required>
                </v-text-field>
    </validation-provider>
    <validation-provider
                  v-slot="{ errors }"
                  name="currentPass"
                  rules="required"
                >

                 <v-text-field 
                  color="orange"
                  name="currentPass" 
                  label="Current Password"  
                  v-model="currentPass"
                  :type="'password'"
                  :error-messages="errors"
                  required>
                </v-text-field>
    </validation-provider>
    <validation-provider
                  v-slot="{ errors }"
                  name="newPass"
                  rules="required"
                >

                 <v-text-field 
                  color="orange"
                  name="newPass"
                  vid="newPass" 
                  label="New Password"  
                  v-model="newPass"
                  :type="'password'"
                  :error-messages="errors"
                  required>
                </v-text-field>
    </validation-provider>
        <validation-provider
                  v-slot="{ errors }"
                  name="confirmPass"
                  rules="required|passwordMatch:@newPass"
                  vid="confirm"
                >

                 <v-text-field 
                  color="orange"
                  name="confirmPass" 
                  label="Confirm Password"  
                  :type="'password'"
                  v-model="confirmPass"
                  :error-messages="errors"
                  required>
                </v-text-field>
    </validation-provider>
    <v-btn color="orange" dark  block type="submit">Update</v-btn>
    </form>
</validation-observer>
      </v-col>
    </v-row>
            </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data(){
    return {
      confirmPass:"",
      newPass:"",
      currentPass:""

    }
  },
    computed:{
         ...mapGetters({
            currentUser: 'currentUser'
        })
    },
    methods:{
      onSubmit(){
        var data = {
          name: this.currentUser.name,
          email: this.currentUser.email,
          oldPassword: this.currentPass,
          newPassword: this.newPass
        }
        if(data.email == "admin@admin.com"){
          this.$store.commit('setSnack',  { snack: "Email address must be changed", color: "error" })
        }
        this.$store.dispatch('initialUser', data)
        this.$router.push('login')

      }
    }
}
</script>