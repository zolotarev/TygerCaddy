<template>
<div>
            <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <h2>Update Profile</h2>
            <br>
            <p>Upon successful update, you will be logged out and required to login again.</p>
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
                  v-model="item.name"
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
                  v-model="item.email"
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
  props:{
    item:Object
  },
  methods:{
    onSubmit() {
      let data = {
        id: this.item.id,
        name: this.item.name,
        email: this.item.email,
        role: this.item.role
      }
      this.$store.dispatch('updateUser', data)
    }
  }
}
</script>