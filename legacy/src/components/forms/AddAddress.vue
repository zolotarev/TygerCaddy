<template>
<v-dialog v-model="show" max-width="700px">
     <v-card>
          <v-card-title class="orange" dark flat>
            <span class="headline white--text">Add Address</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>
              <v-text-field
                name="address"
                color="orange"
                label="External Address"
                hint="The domain or subdomain you would like to proxy e.g plex.mydomain.com"
                v-model="address"
                :error-messages="errors.collect('address')"
                required
              ></v-text-field>
            </v-layout>
            <v-layout row justify-space-between>
              <v-switch
                color="orange"
                class="px-3"
                label="Default to HTTPS?"
                hint="Enable automatic SSL Cert signing, and redirect from HTTP to HTTPS"
                :persistent-hint="true"
                v-model="tls"
              ></v-switch>
            </v-layout>
            <v-layout row justify-space-between>
              <v-switch
                color="orange"
                class="px-3"
                label="Use HTTPS Staging?"
                hint="Only works with 'Default to HTTPS', this uses the LetsEncrypt test servers to avoid rate limits during testing"
                :persistent-hint="true"
                v-model="staging"
              ></v-switch>
            </v-layout>
            <v-layout row justify-space-between>
              <v-combobox
                v-model="app"
                :items="apps"
                item-text="name"
                item-value="name"
                color="orange"
                label="Select an app to proxy to:"
                hint="Choose which application will be served using this Address"
                :persistent-hint="true"
              ></v-combobox>
            </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" flat @click="close">Cancel</v-btn>
            <v-btn color="orange" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
</v-dialog>

</template>

<script>
import { mapGetters } from 'vuex'
export default {
    
    data() {
    return {
      address: "",
      tls: false,
      staging: false,
      app: "",
      
    };
  },
 props: {
    value: Boolean
  },
   model: {
        prop: 'value',
        event: 'showhide'
    },
  computed: {
    show: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("showhide", value);
      }
    },

    ...mapGetters({
      providers: 'showDNS',
      apps:'showApps' 
    })
  },
  methods: {
      close () {
        this.show=false
        this.resetForm()
      },
      save(){
          this.submit()
      },
    resetForm(){

              this.address= "";
              this.tls= false;
              this.staging= false;
              this.app= "";
            
            this.errors.clear()
    },
    createAdd() { 
let data = {
        address: this.address,
        tls: this.tls,
        staging: this.staging,
        app: this.app.id,
      };
      
      this.$store.dispatch('addAddress', data)
            this.show = false;
            this.resetForm();
            this.close()
    },
    submit() {
      this.$validator.validate().then(result => {
        if (result) {
            this.createAdd();
        }
      });
    }
  },  

}
</script>
