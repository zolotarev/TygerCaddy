<template>
  <div>
    <AddLoadBalancer v-model="addLoadBalancerForm" />
    <LoadBalancerDelete v-model="deletedialog" :item="deleteid" />
    <LoadBalancerEdit v-model="editdialog" :item="editedItem" />
    <v-card flat class="blue-grey lighten-5">
      <v-toolbar color="orange" dark flat>
        <v-toolbar-title>Load Balancers</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon large color="white">mdi-call-split</v-icon>
      </v-toolbar>
      <v-card-title primary-title>
        <v-row class="mb-6" no-gutters>
          <v-col class="d-none d-lg-block">
            <h2 class="blue-grey--text darken-4">Load Balancers</h2>
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
            <v-btn rounded color="orange" dark @click.stop="addLoadBalancerForm = true">
              <v-icon dark>mdi-plus</v-icon>
              <div class="d-none d-lg-block">Add Load Balancer</div>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="lb"
        :loading="loading"
        :search="search"
        :options="options"
        :footer-props="{
          itemsPerPageOptions: itemsPerPageOptions,
        }"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon class="mr-0" color="orange" @click="editItem(item)" v-on="on">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit Load Balancer</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon class="mr-0" color="orange" @click="deleteItem(item)" v-on="on">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete Load Balancer</span>
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

import AddLoadBalancer from "../LoadBalancing/AddLoadBalancer";

import LoadBalancerDelete from "../LoadBalancing/LoadBalancerDelete";
import LoadBalancerEdit from "../LoadBalancing/LoadBalancerEdit";

export default {
  data() {
    return {
      options: {
        rowsPerPage: 30,
      },
      itemsPerPageOptions: [10, 20, 30, 40, 50, 100],
      addLoadBalancerForm: false,
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
        { text: "Name", value: "name" },
        { text: "Try Duration", value: "try_duration" },
        { text: "Try Interval", value: "try_interval" },
        { text: "Policy", value: "policy.name" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedItem: {
        id: 0,
        name: "",
        cert_path: "",
        pem_path: "",
      },
    };
  },
  components: {
    AddLoadBalancer,
    LoadBalancerDelete,
    LoadBalancerEdit,
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
      this.$store.commit("updateLb", this.editedItem);
      this.close();
    },

    deleteadd() {
      this.$store.commit("deleteLb", this.editedItem);
      this.deleteclose();
    },

    editItem(item) {
      this.editedIndex = this.certs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editdialog = true;
    },
    deleteItem(item) {
      this.deleteid = this.editedItem = Object.assign({}, item);
      this.deletedialog = true;
    },
  },
  computed: {
    ...mapGetters({
      lb: "showLbs",
    }),
  },

  mounted() {
    this.$store.dispatch("getLb");
    this.$store.dispatch("getPolicies");
    this.loading = false;
  },
};
</script>
