<template>
  <div class="text-center">
    <v-dialog width="500" v-model="show">
      <v-card>
        <v-card-title class="headline orange white--text" dark>Change Password</v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-layout row justify-space-between>
              <v-text-field
                type="password"
                name="currentPassword"
                color="orange"
                label="Current Password"
                v-model="currentPassword"
                :error-messages="currentPasswordErrors"
                required
              ></v-text-field>
            </v-layout>
            <v-layout row justify-space-between>
              <v-text-field
                type="password"
                name="newPassword"
                label="New Password"
                v-model="newPassword"
                color="orange"
                :error-messages="newPasswordErrors"
                required
              ></v-text-field>
            </v-layout>
            <v-layout row justify-space-between>
              <v-text-field
                type="password"
                name="newPasswordConfirm"
                label="Confirm Password"
                v-model="newPasswordConfirm"
                color="orange"
                :error-messages="newPasswordConfirmErrors"
                url
                required
              ></v-text-field>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="blue-grey darken-3" @click="close">Cancel</v-btn>
          <v-btn dark color="orange" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, sameAs } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    currentPassword: { required },
    newPassword: { required },
    newPasswordConfirm: {
      required: required,
      sameAsPassword: sameAs("newPassword"),
    },
  },

  name: "ChangePassword",
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    };
  },
  props: {
    value: Boolean,
  },
  model: {
    prop: "value",
    event: "showhide",
  },
  computed: {
    currentPasswordErrors() {
      const errors = [];
      if (!this.$v.currentPassword.$dirty) return errors;
      !this.$v.currentPassword.required &&
        errors.push("Current Password is required.");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.required && errors.push("New Password is required");
      return errors;
    },
    newPasswordConfirmErrors() {
      const errors = [];
      if (!this.$v.newPasswordConfirm.$dirty) return errors;
      !this.$v.newPasswordConfirm.required &&
        errors.push("Please confim your new password.");
      !this.$v.newPasswordConfirm.sameAsPassword &&
        errors.push("Passwords do not match!");
      return errors;
    },
    show: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("showhide", value);
      },
    },
  },
  methods: {
    close() {
      this.show = false;
      this.resetForm();
    },
    save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
      } else {
        // do your submit logic here
        this.changePassword();
      }
    },
    resetForm() {
      this.$v.$reset();
      this.currentPassword = "";
      this.newPassword = "";
    },
    changePassword() {
      let data = {
        oldPassword: this.currentPassword,
        newPassword: this.newPassword,
      };

      this.$store.dispatch("changePassword", data);
      this.show = false;
      this.resetForm();
      this.close();
    },
  },
};
</script>
