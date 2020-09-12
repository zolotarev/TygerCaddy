
<template >
  <v-col cols="12">
    <v-toolbar
      color="orange"
      dark
      dense
      :src="require('~/assets/sidebar-background.jpg')"
      v-if="show"
    >
      <v-toolbar-title>Edit {{item.name}}'s Profile</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-icon large color="white">mdi-cog</v-icon>
    </v-toolbar>
    <v-card class="blue-grey lighten-5" v-if="show">
      <v-card-text>
        <v-container fluid>
          <v-layout row justify-space-between>
            <v-text-field
              :value="item.name"
              name="name"
              id="name"
              color="orange"
              label="User Name"
              hint="The name for the account."
              :error-messages="userNameErrors"
              required
            ></v-text-field>
          </v-layout>
          <v-layout row justify-space-between>
            <v-text-field
              :value="item.email"
              name="email"
              id="email"
              color="orange"
              label="Email Address"
              hint="The email for the account."
              :error-messages="userEmailErrors"
              required
            ></v-text-field>
          </v-layout>

          <v-btn dark color="orange" @click="save">Save</v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email },
  },
  props: {
    value: Boolean,
    item: Object,
  },
  model: {
    prop: "value",
    event: "showhide",
  },
  computed: {
    show: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("showhide", value);
      },
    },
    userNameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("User Name is required.");
      return errors;
    },
    userEmailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Email is required.");
      !this.$v.email.email && errors.push("Email must be valid.");
      return errors;
    },
  },

  methods: {
    ShowValue(event) {
      console.log(event.id);
    },
    save() {
      let data = {
        name: this.item.name,
        email: this.item.email,
        role: this.item.role,
      };

      this.$store.dispatch("updateUser", data);
    },
  },
};
</script>
