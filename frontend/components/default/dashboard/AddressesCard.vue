<template>
  <v-col cols="6">
    <v-toolbar
      color="orange"
      dark
      dense
      :src="require('~/assets/sidebar-background.jpg')"
    >
      <v-toolbar-title>Addresses</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-badge color="blue-grey darken-4">
        <span slot="badge">11</span>
        <v-icon large color="white">mdi-link-box-variant-outline</v-icon>
      </v-badge>
    </v-toolbar>
    <v-card class="blue-grey lighten-5">
      <div v-if="addresses.length > 0">
        <v-data-table
          :headers="headers"
          :items="addresses"
          :item-key="addresses.id"
          :loading="loading"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.staging="{ item }">
            <v-icon v-if="item.staging">mdi-check</v-icon>
            <v-icon v-else>mdi-close</v-icon>
          </template>
          <template v-slot:item.tls="{ item }">
            <v-icon v-if="item.tls">mdi-check</v-icon>
            <v-icon v-else>mdi-close</v-icon>
          </template>
          <template v-slot:item.actions="{ item }">
            <td class="justify-center layout px-0">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="mr-0"
                    color="orange"
                    v-bind="attrs"
                    v-on="on"
                    @click="urlproxy(item)"
                  >
                    <v-icon>mdi-domain-remove</v-icon>
                  </v-btn>
                </template>
                <span>Add Location Proxy</span>
              </v-tooltip>
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
                <span>Edit Address</span>
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
                <span>Delete Address</span>
              </v-tooltip>
            </td>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
      </div>
      <div v-else><p>There are no addresses to display.</p></div>
    </v-card>
    <DeleteAddress v-model="deletedialog" :item="deleteid" />
    <EditAddress v-model="editdialog" :item="editedItem" />
  </v-col>
</template>
<script>
import DeleteAddress from "../addresses/DeleteAddress";
import EditAddress from "../addresses/EditAddress";
export default {
  components: {
    DeleteAddress,
    EditAddress
  },
  data() {
    return {
      search: "",
      deletedialog: false,
      editdialog: false,
      deleteid: {},
      headers: [
        {
          text: "ID",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "URL", value: "address" },
        { text: "TLS", value: "tls" },
        { text: "Staging", value: "staging" },
        { text: "Application", value: "app.name" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editedItem: {
        id: 0,
        address: "",
        tls: "",
        staging: false,
        app: ""
      }
    };
  },
  mounted() {
    this.$store.dispatch("addresses/getAddresses");
  },
  methods: {
    deleteItem(item) {
      this.deleteid = this.editedItem = Object.assign({}, item);
      this.deletedialog = true;
    },
    editItem(item) {
      this.editedIndex = this.addresses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.editdialog = true;
    }
  },
  computed: {
    loading() {
      return this.$store.state.addresses.addressLoading;
    },
    addresses() {
      return this.$store.state.addresses.addresses;
    }
  }
};
</script>
