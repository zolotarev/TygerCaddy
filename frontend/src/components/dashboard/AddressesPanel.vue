<template>
  <div>
    <AddAddress v-model="addAddressForm" />
    <AddressDelete v-model="deletedialog" :item="deleteid" />
    <AddressEdit v-model="editdialog" :item="editedItem" />
    <AddressDetail v-model="detaildialog" :item="editedItem" />
    <AddressNewEndpoint v-model="urldialog" :item="editedItem" />
    <v-card flat class="blue-grey lighten-5">
      <v-toolbar color="orange" dark flat>
        <v-toolbar-title>Addresses</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-badge color="blue-grey darken-4">
          <span slot="badge">{{ addressCount }}</span>
          <v-icon large color="white">mdi-domain</v-icon>
        </v-badge>
      </v-toolbar>
      <v-card-title primary-title>
        <v-row class="mb-6" no-gutters>
          <v-col class="d-none d-lg-block">
            <h2 class="blue-grey--text darken-4">Addresses</h2>
          </v-col>
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              color="orange"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col class="text-right">
            <v-btn rounded color="orange" dark @click.stop="addAddressForm = true">
              <v-icon dark>mdi-plus</v-icon>
              <div class="d-none d-lg-block">Add Address</div>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="addresses"
        :loading="loading"
        :search="search"
        :options="options"
        :footer-props="{
          itemsPerPageOptions: itemsPerPageOptions,
        }"
        class="elevation-1"
      >
        <template v-slot:[`item.tls`]="{ item }">
          <v-icon medium v-if="item.tls">mdi-check</v-icon>
          <v-icon medium v-else>mdi-close</v-icon>
        </template>
        <template v-slot:[`item.staging`]="{ item }">
          <v-icon medium v-if="item.staging">mdi-check</v-icon>
          <v-icon medium v-else>mdi-close</v-icon>
        </template>
        <template v-slot:[`item.forceHTTPChallenge`]="{ item }">
          <v-icon medium v-if="item.forceHTTPChallenge">mdi-check</v-icon>
          <v-icon medium v-else>mdi-close</v-icon>
        </template>
        <template v-slot:[`item.custom_cert`]="{ item }">
          <v-icon medium v-if="item.custom_cert">mdi-check</v-icon>
          <v-icon medium v-else>mdi-close</v-icon>
        </template>
        <template v-slot:[`item.cert`]="{ item }">
          <div v-if="item.cert">{{ item.cert.name }}</div>
          <div v-else>None</div>
        </template>
        <template v-slot:[`item.app`]="{ item }">
          <v-chip
            class="ma-1"
            color="orange"
            dark
            small
            outlined
            pill
            v-for="app in item.app"
            :key="app.name"
            @click="navigateApp(app.name)"
            >{{ app.name }}
          </v-chip>
        </template>
        <template v-slot:[`item.policy`]="{ item }">
          <div v-if="item.policy">
            <v-chip class="ma-1" color="success" dark small outlined pill>
              {{ item.policy.name }}
            </v-chip>
          </div>
          <div v-else>N/A</div>
        </template>
        <template v-slot:[`item.dns`]="{ item }">
          <div v-if="item.dns">
            {{ item.dns.name }}
          </div>
          <div v-else>N/A</div>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon class="mr-0" color="orange" v-on="on" @click="detailItem(item)">
                <v-icon>mdi-clipboard-list</v-icon>
              </v-btn>
            </template>
            <span>View Details</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon class="mr-0" color="orange" v-on="on" @click="urlproxy(item)">
                <v-icon>mdi-domain-off</v-icon>
              </v-btn>
            </template>
            <span>Add URL proxy</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon class="mr-0" color="orange" @click="editItem(item)" v-on="on">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Address</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon class="mr-0" color="orange" @click="deleteItem(item)" v-on="on">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete Address</span>
          </v-tooltip>
        </template>

        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

import AddAddress from "../Addresses/AddAddress";

import AddressDelete from "../Addresses/AddressDelete";
import AddressEdit from "../Addresses/AddressEdit";
import AddressDetail from "../Addresses/AddressDetail";
import AddressNewEndpoint from "../Endpoints/AddressNewEndpoint";

export default {
  data() {
    return {
      options: {
        rowsPerPage: 30,
      },
      itemsPerPageOptions: [10, 20, 30, 40, 50, 100],
      addAddressForm: false,
      deletedialog: false,
      detaildialog: false,
      urldialog: false,
      deleteid: {},
      editdialog: false,
      loading: true,
      search: "",
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: false,
          value: "id",
        },
        { text: "Address", value: "address" },
        { text: "TLS", value: "tls" },
        { text: "Staging", value: "staging" },
        { text: "Force HTTP Challenge", value: "forceHTTPChallenge" },
        { text: "Use Custom Certs", value: "custom_cert" },
        { text: "Assigned Cert", value: "cert" },
        { text: "Application", value: "app" },
        { text: "DNS", value: "dns" },
        { text: "LB Policy", value: "policy" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedItem: {
        id: 0,
        address: "",
        tls: "",
        staging: false,
        websocket: false,
        custom_cert: false,
        transparent: false,
        app: "",
        dns: "",
      },
    };
  },
  components: {
    AddAddress,
    AddressDelete,
    AddressEdit,
    AddressDetail,
    AddressNewEndpoint,
  },
  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    deleteclose() {
      this.deletedialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      this.$store.commit("UPDATE_ADDRESS", this.editedItem);
      this.close();
    },

    deleteadd() {
      this.$store.commit("DELETE_ADDRESS", this.editedItem);
      this.deleteclose();
    },

    editItem(item) {
      this.editedIndex = this.addresses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editdialog = true;
    },
    detailItem(item) {
      this.editedIndex = this.addresses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      let data = {
        id: this.editedItem.id,
      };

      this.$store.dispatch("getEndpoints", data);
      this.detaildialog = true;
    },
    deleteItem(item) {
      this.deleteid = this.editedItem = Object.assign({}, item);
      this.deletedialog = true;
    },
    urlproxy(item) {
      this.editedIndex = this.addresses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.urldialog = true;
    },
    navigateApp(name) {
      this.$router.push({ name: "appName", params: { name: name } });
    },
  },
  computed: {
    ...mapGetters({
      addresses: "showAddresses",
      addressCount: "showAddressCount",
      apps: "showApps",
      dns: "getActiveDNS",
    }),
  },

  mounted() {
    this.$store.dispatch("getAddresses");
    this.$store.dispatch("getActiveDNS");
    this.$store.dispatch("getLb");
    this.loading = false;
  },
};
</script>
