<template>
  <div>
    <DNSEdit v-model="editdialog" :item="editedItem" />
    <v-card flat class="blue-grey lighten-5">
      <v-toolbar color="orange" dark flat>
        <v-toolbar-title>DNS Providers</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon large color="white">mdi-certificate</v-icon>
      </v-toolbar>
      <v-card-title primary-title>
        <v-row class="mb-6" no-gutters>
          <v-col class="d-none d-lg-block">
            <h2 class="blue-grey--text darken-4">DNS Providers</h2>
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
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="dns"
        :loading="loading"
        :search="search"
        :options="options"
        :footer-props="{
          itemsPerPageOptions: itemsPerPageOptions,
        }"
        class="elevation-1"
      >
        <template v-slot:[`item.active`]="{ item }">
          <v-icon medium v-if="item.active">mdi-check</v-icon>
          <v-icon medium v-else>mdi-close</v-icon>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon class="mr-0" color="orange" @click="editItem(item)" v-on="on">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit DNS Provider</span>
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
import DNSEdit from "../DNSProviders/DNSEdit";

export default {
  data() {
    return {
      options: {
        rowsPerPage: 30,
      },
      itemsPerPageOptions: [10, 20, 30, 40, 50, 100],
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
        { text: "Name", value: "name" },
        { text: "API Key", value: "api_key" },
        { text: "Active", value: "active" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedItem: {
        id: 0,
        name: "",
        api_key: "",
        active: false,
      },
    };
  },
  components: {
    DNSEdit,
  },
  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      this.$store.commit("UPDATE_DNS", this.editedItem);
      this.close();
    },
    editItem(item) {
      this.editedIndex = this.dns.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editdialog = true;
    },
  },
  computed: {
    ...mapGetters({
      DNSCount: "showDNSCount",
      dns: "getDNS",
    }),
  },

  mounted() {
    this.$store.dispatch("getDNS");
    this.loading = false;
  },
};
</script>
