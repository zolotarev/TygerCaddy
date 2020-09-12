
<template >
  <v-col cols="12">
    <v-toolbar
      color="orange"
      dark
      dense
      :src="require('~/assets/sidebar-background.jpg')"
      v-if="show"
    >
      <v-toolbar-title>Edit Tyger Config</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-icon large color="white">mdi-cog</v-icon>
    </v-toolbar>
    <v-card class="blue-grey lighten-5" v-if="show">
      <v-card-text>
        <v-container fluid>
          <v-layout row justify-space-between>
            <v-text-field
              :value="item.server_name"
              name="server_name"
              id="server_name"
              color="orange"
              label="Server Name"
              hint="A friendly name for this server."
              :error-messages="serverNameErrors"
              required
            ></v-text-field>
          </v-layout>
          <v-layout row justify-space-between>
            <v-switch
              color="orange"
              class="px-3"
              id="automatic_https"
              label="Use Automatic HTTPS?"
              hint="Use automatic HTTPS on all Domains?"
              :persistent-hint="true"
              v-model="item.automatic_https"
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
              v-model="item.redirect_https"
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
              v-model="item.use_dns_verification"
            ></v-switch>
          </v-layout>
          <v-layout row justify-space-between>
            <v-select
              name="dns_provider_name"
              v-model="item.dns_provider_name"
              :items="dns"
              item-text="name"
              id="dns_provider_name"
              label="DNS Provider Name"
              color="orange"
              hint="Choose which DNS provider you use for your domains"
              :persistent-hint="true"
              return-object
              @change="ShowValue($event)"
            ></v-select>
          </v-layout>
          <v-layout row justify-space-between>
            <v-text-field
              name="dns_api_token"
              color="orange"
              id="dns_api_token"
              label="DNS API Token"
              hint="Used to authenticate with your DNS provider for SSL Verification!"
              v-model="item.dns_api_token"
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
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    server_name: { required },
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
    serverNameErrors() {
      const errors = [];
      if (!this.$v.server_name.$dirty) return errors;
      !this.$v.server_name.required && errors.push("Server Name is required.");
      return errors;
    },
    dns() {
      return this.$store.state.dns.dns;
    },
  },

  methods: {
    ShowValue(event) {
      console.log(event.id);
    },
    save() {
      let data = {
        server_name: this.item.server_name,
        automatic_https: this.item.automatic_https,
        redirect_https: this.item.redirect_https,
        use_dns_verification: this.item.use_dns_verification,
        dns_provider_name: this.item.dns_provider_name,
        dns_api_token: this.item.dns_api_token,
      };

      this.$store.dispatch("config/updateConfig", data);
      this.$router.push("config");
    },
  },
};
</script>
