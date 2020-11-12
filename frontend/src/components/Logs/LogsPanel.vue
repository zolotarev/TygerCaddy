<template>
  <div>
<v-card flat class="blue-grey lighten-5">
    <v-toolbar color="orange" dark flat>
      <v-toolbar-title>Logs</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-icon large color="white">mdi-text-box-search-outline</v-icon>
    </v-toolbar>
      <v-card-title primary-title>
         <v-row
      class="mb-6"
      no-gutters
    >
      <v-col class="d-none d-lg-block">
        <h2 class="blue-grey--text darken-4">Logs</h2>
      </v-col>
      <v-col>
<v-combobox
          v-model="selectedDomain"
          :items="addresses"
          v-on:change="loadLogfile"
          label="Select Address"
          color="orange"
          item-text="address"
          item-value="id"
          outlined
          dense
        ></v-combobox>
      </v-col>
      <v-col class="text-right">
      </v-col>
    </v-row>

      </v-card-title>
      <v-data-table
        :headers="headers" 
        :items="currentLog" 
        :loading="loading" 
        :search="search"
        :options="options"
        :footer-props="{
          itemsPerPageOptions: itemsPerPageOptions
        }"
      class="elevation-1"
    >
 <template
        v-slot:[`item.tls`]="{ item }"
      >
        <v-icon medium v-if="item.tls">mdi-check</v-icon>
          <v-icon medium v-else>mdi-close</v-icon>
      </template>
 <template
        v-slot:[`item.staging`]="{ item }"
      >
        <v-icon medium v-if="item.staging">mdi-check</v-icon>
          <v-icon medium v-else>mdi-close</v-icon>
      </template>

         <template
        v-slot:[`item.app`]="{ item }"
      >
        {{ item.app.name }}
      </template>
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
        selectedDomain:"",
        options:{rowsPerPage: 30 },
        itemsPerPageOptions: [10, 20, 30, 40, 50, 100],
        loading: false,
        search: '',
        headers: [
          {
            text: 'ID',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          { text: 'Address', value: 'address' },
          { text: 'TLS', value: 'tls' },
          { text: 'Staging', value: 'staging' },
          { text: 'Application', value: 'app' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
    };
  },
  components:{
  },
  methods: {
    async loadLogfile(event){
        this.loading = true;
        console.log(event)
        console.log("Address " + event.id + " with name: " + event.address + " Selected")
        await this.$store.dispatch('getCurrentLog', event.id)
        this.loading = false; 
    }
  },
  computed: {
      ...mapGetters({
      addresses: 'showAddresses', 
      currentLog: 'CurrentLogGetter'
    })
  },

  mounted() {
    this.$store.dispatch('getAddresses') 
  },
};
</script>
