<template>
  <div class="text-center">
    <v-dialog width="500" v-model="show">
      <v-card>
        <v-card-title class="headline orange white--text" dark>
          Add Application
        </v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-layout row justify-space-between>
              <v-text-field
                name="appName"
                color="orange"
                label="App Name"
                hint="For example, 'Plex', or 'Sonarr'"
                v-model="appName"
                :error-messages="appNameErrors"
                required
              >
              </v-text-field>
            </v-layout>
            <v-layout row justify-space-between>
              <v-text-field
                name="appIP"
                label="App IP"
                v-model="appIP"
                hint="The IP of your application e.g 10.10.200.1"
                color="orange"
                :error-messages="appURLErrors"
                url
                required
              >
              </v-text-field>
            </v-layout>
            <v-layout row justify-space-between>
              <v-text-field
                name="appPort"
                label="App Port"
                v-model="appPort"
                hint="The Port of your application e.g 8080"
                color="orange"
                :error-messages="appPortErrors"
                url
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
                v-model="verify_ssl"
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
import { required, url, email, ipAddress } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    appName: { required },
    appIP: { required, ipAddress },
    appPort: { required }
  },
  name: "NewApp",
  data() {
    return {
      appName: "",
      appIP: "",
      appPort: "",
      verify_ssl: false
    };
  },
  props: {
    value: Boolean
  },
  model: {
    prop: "value",
    event: "showhide"
  },
  computed: {
    appNameErrors() {
      const errors = [];
      if (!this.$v.appName.$dirty) return errors;
      !this.$v.appName.required && errors.push("App Name is required.");
      return errors;
    },
    appURLErrors() {
      const errors = [];
      if (!this.$v.appIP.$dirty) return errors;
      !this.$v.appIP.ipAddress && errors.push("Must be valid IP Address");
      !this.$v.appIP.required && errors.push("URL is required");
      return errors;
    },
    appPortErrors() {
      const errors = [];
      if (!this.$v.appPort.$dirty) return errors;
      !this.$v.appPort.required && errors.push("URL is required");
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
      this.show = false;
      this.resetForm();
    },
    save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
      } else {
        // do your submit logic here
        this.createApp();
      }
    },
    resetForm() {
      this.$v.$reset();
      this.appName = "";
      this.appIP = "";
      this.appPort = "";
      this.verify_ssl = false;
    },
    createApp() {
      let data = {
        name: this.appName,
        ip_address: this.appIP,
        port_number: this.appPort,
        verify_ssl: this.verify_ssl
      };

      this.$store.dispatch("apps/addApp", data);
      this.show = false;
      this.resetForm();
      this.close();
    }
  }
};
</script>
