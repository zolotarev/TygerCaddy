<template>
  <div class="text-center">
    <v-dialog width="500" v-model="show">
      <v-card>
        <v-card-title class="headline orange white--text" dark>
          Edit Application
        </v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-layout row justify-space-between>
              <v-text-field
                name="appName"
                color="orange"
                label="App Name"
                hint="For example, 'Plex', or 'Sonarr'"
                v-model="item.name"
                :error-messages="appNameErrors"
                required
              >
              </v-text-field>
            </v-layout>
            <v-layout row justify-space-between>
              <v-text-field
                name="appIP"
                v-model="item.ip_address"
                hint="The IP of your application e.g 10.10.200.1"
                color="orange"
                :error-messages="appIPErrors"
                ipAddress
                required
              >
              </v-text-field>
            </v-layout>
            <v-layout row justify-space-between>
              <v-text-field
                name="appPort"
                v-model="item.port_number"
                hint="The Port of your application e.g 8080"
                color="orange"
                :error-messages="appPortErrors"
                required
              >
              </v-text-field>
            </v-layout>
            <v-layout row justify-space-between>
              <v-switch
                color="orange"
                class="px-3"
                hint="If true, the proxy will check for a valid SSL certificate from the App"
                label="SSL Verification on Application?"
                v-model="item.verify_ssl"
                :persistent-hint="true"
              ></v-switch>
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
import { required, url, ipAddress } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    item: {
      name: { required },
      ip_address: { required, ipAddress },
      port_number: { required }
    }
  },
  name: "EditApp",
  props: {
    value: Boolean,
    item: Object
  },
  model: {
    prop: "value",
    event: "showhide"
  },
  computed: {
    appNameErrors() {
      const errors = [];
      if (!this.$v.item.name.$dirty) return errors;
      !this.$v.item.name.required && errors.push("App Name is required.");
      return errors;
    },
    appIPErrors() {
      const errors = [];
      if (!this.$v.item.ip_address.$dirty) return errors;
      !this.$v.item.ip_address.ipAddress &&
        errors.push("Must be valid IP Address");
      !this.$v.item.ip_address.required && errors.push("URL is required");
      return errors;
    },
    appPortErrors() {
      const errors = [];
      if (!this.$v.item.port_number.$dirty) return errors;
      !this.$v.item.port_number.required && errors.push("URL is required");
      return errors;
    },
    show: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("showhide", value);
      }
    }
  },
  methods: {
    close() {
      this.$v.$reset();
      this.show = false;
    },
    save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
      } else {
        // do your submit logic here
        this.$store.dispatch("apps/updateApp", this.item);
        this.close();
      }
    }
  }
};
</script>
