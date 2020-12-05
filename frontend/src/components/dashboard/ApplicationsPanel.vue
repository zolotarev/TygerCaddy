<template>
  <div>
    <AddApp v-model="addAppForm" />
    <AppsDelete v-model="deletedialog" :item="deleteid" />
    <AppsEdit v-model="editdialog" :item="editedItem" />
    <v-card flat class="blue-grey lighten-5">
      <v-toolbar color="orange" dark flat>
        <v-toolbar-title>Applications</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-badge color="blue-grey darken-4">
          <span slot="badge">{{ appCount }}</span>
          <v-icon large color="white">mdi-apps</v-icon>
        </v-badge>
      </v-toolbar>

      <v-card-title primary-title>
        <v-row class="mb-6" no-gutters>
          <v-col class="d-none d-lg-block">
            <h2 class="blue-grey--text darken-4">Apps</h2>
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
            <v-btn rounded color="orange" dark @click.stop="addAppForm = true">
              <v-icon dark>mdi-plus</v-icon>
              <div class="d-none d-lg-block">Add App</div>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="apps"
        item-key="id"
        :loading="loading"
        :search="search"
        :options="options"
        :footer-props="{
          itemsPerPageOptions: itemsPerPageOptions,
        }"
        class="elevation-1"
      >
        <template v-slot:[`item.ip_address`]="{ item }">
          {{ item.ip_address }}:{{ item.port_number }}
        </template>
        <template v-slot:[`item.verify_ssl`]="{ item }">
          <v-icon medium v-if="item.verify_ssl">mdi-check</v-icon>
          <v-icon medium v-else>mdi-close</v-icon>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                class="mr-0"
                color="orange"
                @click="editItem(item)"
                v-on="on"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>Edit App</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                class="mr-0"
                color="orange"
                @click="deleteItem(item)"
                v-on="on"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Delete App</span>
          </v-tooltip>
        </template>
        <template v-slot:no-results>
          <v-alert :value="true" color="error" icon="mdi-alert-circle">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppsDelete from "@/components/Apps/AppsDelete";
import AppsEdit from "@/components/Apps/AppsEdit";
import AddApp from "@/components/Apps/AddApp";
export default {
  data() {
    return {
      options: {
        rowsPerPage: 30,
      },
      itemsPerPageOptions: [10, 20, 30, 40, 50, 100],
      loading: true,
      addAppForm: false,
      deletedialog: false,
      deleteid: {},
      editdialog: false,
      search: "",
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: false,
          value: "id",
        },
        { text: "Name", value: "name" },
        { text: "IP", value: "ip_address" },
        { text: "Skip SSL Verify", value: "verify_ssl" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedItem: {
        id: 0,
        name: "",
        url: "",
        insecure_skip_verify: false,
        websocket: false,
        transparent: false,
      },
    };
  },
  components: {
    AddApp,
    AppsDelete,
    AppsEdit,
  },
  watch: {
    editdialog(val) {
      val || this.close();
    },
    deletedialog(val) {
      val || this.deleteclose();
    },
  },
  methods: {
    close() {
      this.editdialog = false;
    },

    deleteclose() {
      this.deletedialog = false;
    },
    editItem(item) {
      this.editedIndex = this.apps.indexOf(item);
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
      apps: "showApps",
      appCount: "showAppCount",
    }),
  },
  mounted() {
    this.$store.dispatch("getApps");
    this.loading = false;
  },
};
</script>
