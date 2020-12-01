<template>
  <div>
    <AddCertificate v-model="addCertificateForm"/>
    <CertificateDelete v-model="deletedialog" :item="deleteid"/>
    <CertificateEdit v-model="editdialog" :item="editedItem"/>
<v-card flat class="blue-grey lighten-5">
    <v-toolbar color="orange" dark flat>
      <v-toolbar-title>Certificates</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-icon large color="white">mdi-domain</v-icon>
    </v-toolbar>
      <v-card-title primary-title>
         <v-row
      class="mb-6"
      no-gutters
    >
      <v-col class="d-none d-lg-block">
        <h2 class="blue-grey--text darken-4">Certificates</h2>
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
<v-btn rounded color="orange" dark @click.stop="addCertificateForm=true">
  <v-icon dark>mdi-plus</v-icon>
  <div class="d-none d-lg-block">Add Certificate</div>
  </v-btn>
      </v-col>
    </v-row>

      </v-card-title>
      <v-data-table
        :headers="headers" 
        :items="certificates" 
        :loading="loading" 
        :search="search"
        :options="options"
        :footer-props="{
          itemsPerPageOptions: itemsPerPageOptions
        }"
      class="elevation-1"
    >
 <template
        v-slot:[`item.actions`]="{ item }"
      >
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
import { mapGetters } from 'vuex'

import AddCertificate from "../Certificates/AddCertificate";

import CertificateDelete from "../Certificates/CertificateDelete";
import CertificateEdit from "../Certificates/CertificateEdit";


export default {
  data() {
    return {
      options:{
        rowsPerPage: 30
      },
      itemsPerPageOptions: [10, 20, 30, 40, 50, 100],
      addCertificateForm: false,
      deletedialog: false,
      detaildialog: false,
      urldialog: false,
      deleteid: {},
      editdialog: false,
        loading: true,
        search: '',
        headers: [
          {
            text: 'ID',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          { text: 'Name', value: 'name' },
          { text: 'Cert Path', value: 'cert_path' },
          { text: 'Pem Path', value: 'pem_path' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        editedItem: {
        id: 0,
        address: "",
        tls: "",
        staging: false,
        websocket: false,
        transparent: false
      }
    };
    
  },
  components:{
    AddCertificate,
    CertificateDelete,
    CertificateEdit,
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

       this.$store.dispatch('getEndpoints', data)
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
      certificates: 'showCerts', 
      certificateCount: 'showCertCount',
      certs: 'showCerts',
    })
  },

  mounted() {
    this.$store.dispatch('getCerts')   
    this.loading = false;
    
  },
};
</script>
