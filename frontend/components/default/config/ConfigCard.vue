// TODO: Finish the edit capability
<template>
  <v-col cols="12">
    <v-toolbar
      color="orange"
      dark
      dense
      :src="require('~/assets/sidebar-background.jpg')"
    >
      <v-toolbar-title>View/Edit Tyger Config</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-icon large color="white">mdi-cog</v-icon>
    </v-toolbar>
    <v-card class="blue-grey lighten-5">
      <v-card-text>
        <v-container fluid>
          <v-layout row justify-space-between>
            <v-text-field
              name="server_name"
              id="server_name"
              color="orange"
              label="Server Name"
              hint="A friendly name for this server."
              :value="config.server_name"
              @blur="updateLocalConfig($event)"
              :error-messages="serverNameErrors"
              required
            >
            </v-text-field>
          </v-layout>
          <v-layout row justify-space-between>
            <v-switch
              color="orange"
              class="px-3"
              id="automatic_https"
              label="Use Automatic HTTPS?"
              hint="Use automatic HTTPS on all Domains?"
              :persistent-hint="true"
              :value="config.automatic_https"
              @click="updateLocalConfig($event)"
            ></v-switch>
          </v-layout>
          <v-layout row justify-space-between>
            <v-switch
              color="orange"
              class="px-3"
              id="redirect_https"
              label="Automatic redirect to HTTPS?"
              hint="Automaticallly redirect HTTP to HTTPS?"
              :persistent-hint="true"
              :value="config.redirect_https"
              @click="updateLocalConfig($event)"
            ></v-switch>
          </v-layout>
          <v-layout row justify-space-between>
            <v-switch
              color="orange"
              class="px-3"
              id="use_dns_verification"
              label="Use DNS Verification?"
              hint="Automaticallly redirect HTTP to HTTPS?"
              :persistent-hint="true"
              :value="config.use_dns_verification"
              @click="updateLocalConfig($event)"
            ></v-switch>
          </v-layout>
          <v-layout row justify-space-between>
            <v-text-field
              name="dns_provider_name"
              color="orange"
              id="dns_provider_name"
              label="DNS Provider Name"
              hint="Currently Only cloudflare is supported"
              :value="config.dns_provider_name"
              @blur="updateLocalConfig($event)"
            >
            </v-text-field>
          </v-layout>
          <v-layout row justify-space-between>
            <v-text-field
              name="dns_api_token"
              color="orange"
              id="dns_api_token"
              label="DNS API Token"
              hint="Used to authenticate with your DNS provider for SSL Verification!"
              :value="config.dns_api_token"
              @blur="updateLocalConfig($event)"
            >
            </v-text-field>
          </v-layout>
          <v-btn dark color="orange" @click="save">Save</v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    server_name: { required }
  },
  data() {
    return {
      newConfig: {}
    };
  },
  computed: {
    //...mapGetters({ config: "config/showConfig" }),
    serverNameErrors() {
      const errors = [];
      if (!this.$v.server_name.$dirty) return errors;
      !this.$v.server_name.required && errors.push("Server Name is required.");
      return errors;
    },
    config() {
      return this.$store.state.config.config;
    }
  },
  mounted() {
    this.$store.dispatch("config/getConfig");
  },

  methods: {
    ...mapActions(["config/updateConfig"]),
    updateLocalConfig(event) {
      console.log(event.target.id);
      this.$set(this.newConfig, event.target.id, event.target.value);
    },
    doWhatever(event) {
      const inputTarget = event.target;
      console.log(inputTarget);
    },
    save() {
      let data = {
        server_name: this.newConfig.server_name,
        automatic_https: this.newConfig.automatic_https,
        redirect_https: this.newConfig.redirect_https,
        use_dns_verification: this.newConfig.use_dns_verification,
        dns_provider_name: this.newConfig.dns_provider_name,
        dns_api_token: this.newConfig.dns_api_token
      };
      console.log(this.newConfig);
      console.log(data);
      this.$store.dispatch("config/updateConfig", data);
    }
  }
};
</script>
