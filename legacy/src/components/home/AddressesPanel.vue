<template>
  <div>
    <AddAddress v-model="addAddressForm"/>
    <AddressDelete v-model="deletedialog" :item="deleteid"/>
    <AddressEdit v-model="editdialog" :item="editedItem"/>
    <AddressDetail v-model="detaildialog" :item="editedItem"/>
    <AddressURLProxy v-model="urldialog" :item="editedItem" />

    <v-toolbar color="orange" dark flat>
      <v-toolbar-title>Addresses</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-badge color="blue-grey darken-4">
        <span slot="badge">{{ addressCount }}</span>
        <v-icon large color="white">domain</v-icon>
      </v-badge>
    </v-toolbar>
    <v-card flat class="blue-grey lighten-5">
      <v-card-title primary-title>
        <h2 class="blue-grey--text darken-4">Addresses</h2> 
        <v-spacer></v-spacer> 
        <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-select="singleSelect"
        hide-details
      ></v-text-field>
        <v-btn round color="orange" dark @click.stop="addAddressForm=true"><v-icon>add</v-icon> Add Address</v-btn>
      </v-card-title>
      <v-data-table
      :headers="computedHeaders"
      :items="addresses"
      :loading="loading"
      :search="search"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      class="elevation-1"
    >
<template slot="items" slot-scope="props">
        <td v-if="!$vuetify.breakpoint.smAndDown">{{ props.item.id }}</td>
        <td>
          <a @click="detailItem(props.item)"> {{props.item.address}} </a>
          <!--<v-btn round small color="primary" dark @click.stop="detailItem(props.item)">{{ props.item.address }}</v-btn></td>-->
        <td v-if="!$vuetify.breakpoint.smAndDown">
          <v-icon medium v-if="props.item.tls">check</v-icon>
          <v-icon medium v-else>close</v-icon>
        </td>
        <td v-if="!$vuetify.breakpoint.smAndDown">
          <v-icon medium v-if="props.item.staging">check</v-icon>
          <v-icon medium v-else>close</v-icon>
        </td>
        <td>{{ props.item.app.name }}</td>
        
        <td>
          <v-tooltip top > 
            <v-btn icon class="mr-0" small  color="orange" slot="activator" @click="urlproxy(props.item)" disabled> 
              <v-icon>domain_disabled</v-icon> 
            </v-btn> 
              <span>Add URL proxy (Coming soon!)</span> 
            </v-tooltip> 
            <v-tooltip top> 
              <v-btn icon class="mr-0" small  dark color="orange" @click="editItem(props.item)" slot="activator"> 
                <v-icon>edit</v-icon> 
              </v-btn> 
              <span>Edit Address</span> 
            </v-tooltip>
            <v-tooltip top> 
              <v-btn icon class="mr-0" small  dark color="orange" @click="deleteItem(props.item)" slot="activator"> 
                <v-icon>delete</v-icon> 
              </v-btn> 
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
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AddAddress from "@/components/forms/AddAddress";
import AddressDelete from "@/components/Addresses/AddressDelete";
import AddressEdit from "@/components/Addresses/AddressEdit";
import AddressDetail from "@/components/Addresses/AddressDetail";
import AddressURLProxy from "@/components/Addresses/AddressURLProxy";

export default {
  data() {
    return {
      rowsPerPageItems: [10, 20, 30, 40, 50, 100],
      pagination: {
        rowsPerPage: 30
      },
      addAddressForm: false,
      deletedialog: false,
      detaildialog: false,
      urldialog: false,
      deleteid: {},
      editdialog: false,
        loading: true,
        search: '',
        headers: [
          {
            text: 'Address ID',
            align: 'left',
            sortable: false,
            value: 'id',
            hide: 'smAndDown'
          },
          { text: "URL", value: "address", align:"left" },
        { text: "TLS", value: "tls", hide: 'smAndDown', align:"left" },
        { text: "Staging", value: "staging", hide: 'smAndDown', align:"left" },
        { text: "Application", value: "app.name", align:"left" },
        { text: "Actions", width:"20", value: "actions", align:"left", sortable: false },
        ],
      editedItem: {
        id: 0,
        address: "",
        tls: "",
        staging: false,
        app: "",
      },
    };
    
  },
  components:{
    AddAddress,
    AddressDelete,
    AddressEdit,
    AddressDetail,
    AddressURLProxy
  },
  methods: {
    close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      deleteclose (){
        this.deletedialog = false
                setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        this.$store.commit('UPDATE_ADDRESS', this.editedItem)
        this.close()
      },

      deleteadd () {
        this.$store.commit('DELETE_ADDRESS', this.editedItem)
        this.deleteclose()
      },
      
    editItem (item) {
        this.editedIndex = this.addresses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.editdialog = true
      },
    detailItem (item) {
        this.editedIndex = this.addresses.indexOf(item)
        this.editedItem = Object.assign({}, item)
         let data = {
         id: this.editedItem.id
       }

       //this.$store.dispatch('getEndpoints', data)
        this.detaildialog = true
      },
    deleteItem (item) {
      this.deleteid = this.editedItem = Object.assign({}, item);
      this.deletedialog = true;
    },
    urlproxy (item) {
      this.editedIndex = this.addresses.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.urldialog = true
    },
  },
  computed: {

    ...mapGetters({
      addresses: 'showAddresses', 
      addressCount: 'showAddressCount',
      apps: 'showApps',
    }),
    computedHeaders () {
      return this.headers.filter(h => !h.hide || !this.$vuetify.breakpoint[h.hide])  
    }
  },

  mounted() {
    this.$store.dispatch('getAddresses')
    
    this.loading = false;
    
  },
};
</script>
