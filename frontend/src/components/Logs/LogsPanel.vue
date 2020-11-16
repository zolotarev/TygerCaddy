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
        <h2 v-if="selectedDomain" class="blue-grey--text darken-4">Logs for: {{selectedDomain.address}}</h2>
        <h2 v-else class="blue-grey--text darken-4">Logs</h2>
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
                            <v-btn rounded color="orange" :dark="exportCheck()" @click.stop="exportLog()" :disabled="exportCheck()">
                                <v-icon dark>mdi-file-download</v-icon>
                                <div class="d-none d-lg-block">Download Logs</div>
                            </v-btn>
                        </v-col>
                   
    </v-row>

      </v-card-title>

      <v-data-table
      dense
        :headers="headers" 
        :items="currentLog" 
        :loading="loading" 
        loading-text="Loading logs... Please wait"
        :search="search"
        :options="options"
        :item-class="itemRowBackground"
        :footer-props="{
          itemsPerPageOptions: itemsPerPageOptions
        }"
      class="elevation-1"
    >
              <v-progress-linear v-show="loading" slot="progress" color="orange" indeterminate></v-progress-linear>
     <template
        v-slot:[`item.ts`]="{ item }"
      >
        {{ item.ts | formatUnix }}

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
        options:{rowsPerPage: 50 },
        itemsPerPageOptions: [50, 100, 150, 200],
        disabled: true,
        search: '',
        headers: [
          {
            text: 'Timestamp',
            align: 'left',
            sortable: false,
            value: 'ts'
          },
          { text: 'Level', value: 'level' },
          { text: 'Status', value: 'status' },
          { text: 'Remote Address', value: 'request.remote_addr' },
          { text: 'Method', value: 'request.method' },
          { text: 'User-Agent', value: 'request.headers.User-Agent', sortable: false }
        ],
    };
  },
  components:{
  },
  filters:{
    formatUnix: function (value) {
      var moment = require('moment');
    if (value) {
      return moment.unix(value).format('DD-MM-YYYY HH:mm:ss')
    }
  }
  },
  methods: {
    async loadLogfile(event){
      this.disabled = true
        await this.$store.dispatch('getCurrentLog', event.id)
        this.disabled = false
    },
    exportCheck() {
      if (this.currentLog && !this.loading){
        return false
      }else{
        return true
      }
    },
    itemRowBackground: function (item) {
      return item.level === "error" ? 'red lighten-4' : 'style-2'
    },
    exportLog() {
            let content = JSON.stringify(this.currentLog)
            if (content === null) {
                this.$store.dispatch('setSnack', {
                    snack: "There was a problem getting the log data.",
                    color: "error"
                });
                return;
            }

            const blob = new Blob([content], {
                type: `application/json`
            });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = this.selectedDomain.address + '-export.json';
            link.click();
            this.$store.dispatch('fireSnack', {
                snack: "Your log export has completed.",
                color: "success"
            });
        },
  },
  computed: {
      ...mapGetters({
      addresses: 'showAddresses', 
      currentLog: 'CurrentLogGetter',
      loading: 'getLogLoading'
    })
  },

  mounted() {
    this.$store.dispatch('getAddresses') 
  },
};
</script>
