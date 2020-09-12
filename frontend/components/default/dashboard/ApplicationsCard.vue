<template>
  <v-col :cols="currentRoute">
    <v-toolbar color="orange" dark dense :src="require('~/assets/sidebar-background.jpg')">
      <v-toolbar-title>Applications</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-badge color="blue-grey darken-4">
        <span slot="badge">11</span>
        <v-icon large color="white">mdi-apps</v-icon>
      </v-badge>
    </v-toolbar>
    <v-card class="blue-grey lighten-5">
      <div v-if="apps.length > 0">
        <v-data-table
          :headers="headers"
          :items="apps"
          :item-key="apps.id"
          :loading="loading"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.ip_address="{ item }">
            <td>
              <a
                target="_blank"
                :href="'http://' + item.ip_address + ':' + item.port_number"
              >{{ item.ip_address }}:{{ item.port_number }}</a>
            </td>
          </template>
          <template v-slot:item.verify_ssl="{ item }">
            <td>
              <v-icon medium v-if="item.verify_ssl">mdi-check</v-icon>
              <v-icon medium v-else>mdi-close</v-icon>
            </td>
          </template>
          <template v-slot:item.websocket="{ item }">
            <td>
              <v-icon medium v-if="item.websocket">mdi-check</v-icon>
              <v-icon medium v-else>mdi-close</v-icon>
            </td>
          </template>
          <template v-slot:item.transparent="{ item }">
            <td>
              <v-icon medium v-if="item.transparent">mdi-check</v-icon>
              <v-icon medium v-else>mdi-close</v-icon>
            </td>
          </template>
          <template v-slot:item.actions="{ item }">
            <td class="justify-center layout px-0">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="mr-0"
                    color="orange"
                    @click="editItem(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit App</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="mr-0"
                    color="orange"
                    @click="deleteItem(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete App</span>
              </v-tooltip>
            </td>
          </template>

          <template v-slot:no-results>
            <v-alert
              :value="true"
              color="error"
              icon="warning"
            >Your search for "{{ search }}" found no results.</v-alert>
          </template>
        </v-data-table>
      </div>
      <div v-else>
        <p>There are no apps to display.</p>
      </div>
    </v-card>
    <DeleteApp v-model="deletedialog" :item="deleteid" />
    <EditApp v-model="editdialog" :item="editedItem" />
  </v-col>
</template>
<script>
import DeleteApp from "../apps/DeleteApp";
import EditApp from "../apps/EditApp";
export default {
  components: {
    DeleteApp,
    EditApp,
  },
  data() {
    return {
      search: "",
      deletedialog: false,
      editdialog: false,
      deleteid: {},
      editid: {},
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: false,
          value: "id",
        },
        { text: "Name", value: "name" },
        { text: "IP Address", value: "ip_address" },
        { text: "Verify SSL", value: "verify_ssl" },
        { text: "Websocket", value: "websocket" },
        { text: "Transparent", value: "transparent" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedItem: {
        id: 0,
        name: "",
        url: "",
        verify_ssl: false,
        websocket: false,
        transparent: false,
      },
    };
  },
  mounted() {
    this.$store.dispatch("apps/getApps");
  },
  methods: {
    deleteItem(item) {
      this.deleteid = this.editedItem = Object.assign({}, item);
      this.deletedialog = true;
    },
    editItem(item) {
      this.editedIndex = this.apps.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editdialog = true;
    },
  },
  computed: {
    currentRoute() {
      if (this.$route.name === "dashboard") {
        return "6";
      } else {
        return "12";
      }
    },
    loading() {
      return this.$store.state.apps.appsLoading;
    },
    apps() {
      return this.$store.state.apps.apps;
    },
  },
};
</script>
