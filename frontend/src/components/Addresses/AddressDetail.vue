<template>
  <div>
    <AddressDeleteEndpoint v-model="deleteEndpointShow" :item="endpoint" />
    <v-dialog v-model="detailshow" max-width="700px">
      <v-card>
        <v-card-title class="orange" dark flat>
          <span class="headline white--text">Address Detail</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <h3>Address Detail:</h3>
            <v-layout row justify-space-between> Address: {{ item.address }} </v-layout>
            <v-layout row justify-space-between> Uses TLS: {{ item.tls }} </v-layout>
            <v-layout row justify-space-between>
              Uses TLS Staging: {{ item.staging }}
            </v-layout>
            <v-layout row justify-space-between>
              Force HTTP Challenge: {{ item.forceHTTPChallenge }}
            </v-layout>
            <v-layout row justify-space-between>
              <div v-if="item.cert">Custom Cert: {{ item.cert.name }}</div>
              <div v-else>Custom Cert: NONE</div>
            </v-layout>
            <v-layout row justify-space-between>
              <div v-if="item.dns">DNS Provider: {{ item.dns.name }}</div>
              <div v-else>DNS Provider: NONE</div>
            </v-layout>
            <v-layout row v-if="item.app">
              Proxies to:<br />
              <v-chip
                class="ma-1"
                color="orange"
                dark
                small
                outlined
                pill
                v-for="app in item.app"
                :key="app.name"
                >{{ app.name }}
              </v-chip>
            </v-layout>
            <v-layout row justify-space-between>
              <div v-if="item.policy">Load Balance Policy: {{ item.policy.name }}</div>
              <div v-else>Load Blance Policy: NONE</div>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-container fluid>
          <v-layout>
            <h3>Endpoints:</h3>
          </v-layout>

          <v-data-table
            :headers="headers"
            :items="endpoints"
            :loading="loading"
            :footer-props="{
              itemsPerPageOptions: itemsPerPageOptions,
            }"
            class="elevation-1"
          >
            <template v-slot:[`item.address`]="{ item }">
              <a @click="detailItem(item)"> {{ item.address.address }} </a>
            </template>

            <template v-slot:[`item.app`]="{ item }">
              {{ item.app.name }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    class="mr-0"
                    color="orange"
                    @click="editEndpoint(item)"
                    v-on="on"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit Endpoint</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    class="mr-0"
                    color="orange"
                    @click="deleteEndpoint(item)"
                    v-on="on"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete Endpoint</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
      <AddressEditEndpoint v-model="editEndpointShow" :item="endpoint" />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddressEditEndpoint from "@/components/Endpoints/AddressEditEndpoint";
import AddressDeleteEndpoint from "@/components/Endpoints/AddressDeleteEndpoint";

export default {
  components: {
    AddressEditEndpoint,
    AddressDeleteEndpoint,
  },
  data() {
    return {
      editEndpointShow: false,
      deleteEndpointShow: false,
      itemsPerPageOptions: [10, 20, 30, 40, 50, 100],
      options: {
        rowsPerPage: 30,
      },
      headers: [
        {
          text: "Endpoint ID",
          align: "left",
          value: "id",
        },
        { text: "Endpoint", value: "endpoint" },
        { text: "Address", value: "address" },
        { text: "App", value: "app" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      loading: false,
      endpoint: {},
    };
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
    detailshow: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("showhide", value);
      },
    },
    ...mapGetters({
      providers: "showDNS",
      apps: "showApps",
      endpoints: "showEndpoints",
    }),
  },
  methods: {
    close() {
      this.detailshow = false;
    },
    editEndpoint(endpoint) {
      this.endpoint = Object.assign({}, endpoint);
      this.endpoint.address.id = this.item.id;
      this.editEndpointShow = true;
    },
    deleteEndpoint(endpoint) {
      let addrid = this.item.id;
      this.endpoint = Object.assign({}, endpoint);
      this.endpoint.addrid = addrid;
      this.deleteEndpointShow = true;
    },
  },
};
</script>
