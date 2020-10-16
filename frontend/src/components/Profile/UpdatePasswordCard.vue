<template>
<div>
            <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <h2>Update Password</h2>
            <br>
            <p>Upon successful password change, you will be logged out and required to login again.</p>
<validation-observer
    ref="observer"
    v-slot="{ handleSubmit }">
    <form name="form" @submit.prevent="handleSubmit(onSubmit)">

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
</div>
</template>

<script>
export default {
  data(){
    return {
      currentPass:'',
      newPass:'',
      confirmPass:''
    }
  },
  methods:{
    onSubmit() {
      let data = {
        oldPassword: this.currentPass,
        newPassword: this.newPass
      }
      this.$store.dispatch('updatePassword', data)
      this.currentPass = ""
      this.confirmPass = ""
      this.newPass = ""
    }
  }
}
</script>