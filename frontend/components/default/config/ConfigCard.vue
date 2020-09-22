
<template >
  <v-col cols="12" v-if="show">
    <v-toolbar color="orange" dark dense :src="require('~/assets/sidebar-background.jpg')">
      <v-toolbar-title>View Tyger Config</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-icon large color="white">mdi-cog</v-icon>
    </v-toolbar>
    <v-card class="blue-grey lighten-5">
      <v-card-text>
        <v-container fluid>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Server Name:</v-list-item-title>
              <v-list-item-subtitle>{{config.server_name}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Automatic HTTPS?</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon large dark class="orange" v-if="config.automatic_https">mdi-check</v-icon>
                <v-icon large dark class="orange" v-else>mdi-close</v-icon>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Redirect HTTPS?</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon large dark class="orange" v-if="config.redirect_https">mdi-check</v-icon>
                <v-icon large dark class="orange" v-else>mdi-close</v-icon>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Use DNS Verification?</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon large dark class="orange" v-if="config.use_dns_verification">mdi-check</v-icon>
                <v-icon large dark class="orange" v-else>mdi-close</v-icon>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>DNS Provider Name:</v-list-item-title>
              <v-list-item-subtitle v-if="config.dns_provider_name">{{config.dns_provider_name.name}}</v-list-item-subtitle>
              <v-list-item-subtitle v-else>No Provider Set!</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>DNS API Token:</v-list-item-title>
              <v-list-item-subtitle v-if="config.dns_provider_token">{{config.dns_api_token}}</v-list-item-subtitle>
              <v-list-item-subtitle v-else>No Token Set!</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-container>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
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
    config() {
      return this.$store.state.config.config;
    },
  },

  methods: {
    editConfig() {},
  },
};
</script>
