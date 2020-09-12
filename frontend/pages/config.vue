<template>
  <div>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="4" sm="4" md="4">
          <v-btn v-if="showConfigCard" block dark color="orange" @click="edit()">Edit Config</v-btn>
          <v-btn v-if="showEditConfig" block dark color="orange" @click="edit()">View Config</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <ConfigCard v-model="showConfigCard" />
        <EditConfigCard v-model="showEditConfig" :item="editConfig" />
      </v-row>
    </v-container>
  </div>
</template>
<script>
import EditConfigCard from "../components/default/config/EditConfigCard";
import ConfigCard from "../components/default/config/ConfigCard";
export default {
  components: {
    ConfigCard,
    EditConfigCard,
  },
  data() {
    return {
      showConfigCard: true,
      showEditConfig: false,
      editConfig: {
        server_name: 0,
        automatic_https: "",
        redirect_https: "",
        use_dns_verification: false,
        dns_provider_name: "",
        dns_api_token: "",
      },
    };
  },
  layout: "default",
  middleware: "auth",

  mounted() {
    this.$store.dispatch("config/getConfig");
    this.$store.dispatch("dns/getDNS");
    this.showEditConfig = false;
    this.showConfigCard = true;
  },
  methods: {
    edit() {
      this.showEditConfig = !this.showEditConfig;
      this.showConfigCard = !this.showConfigCard;

      this.editConfig = Object.assign({}, this.$store.state.config.config);
    },
  },
};
</script>
