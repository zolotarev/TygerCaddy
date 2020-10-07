<template>
<v-dialog v-model="show" max-width="700px">
     <v-card>
          <v-card-title class="orange" dark flat>
            <span class="headline white--text">Edit Address</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>
              <v-text-field
                name="address"
                color="orange"
                label="External Address"
                hint="The domain or subdomain you would like to proxy e.g plex.mydomain.com"
                v-model="item.address"
                :error-messages="errors.collect('address')"
                required
              >
              </v-text-field>
            </v-layout>
            <v-layout row justify-space-between>
              <v-switch
                color="orange"
                class="px-4"
                label="Default to HTTPS?"
                hint="Enable automatic SSL Cert signing, and redirect from HTTP to HTTPS"
                :persistent-hint="true"
                v-model="item.tls"
              ></v-switch>
            </v-layout>
            <v-layout row justify-space-between>
              <v-switch
                color="orange"
                class="px-4"
                label="Use HTTPS Staging?"
                hint="Only works with 'Default to HTTPS', this uses the LetsEncrypt test servers to avoid rate limits during testing"
                :persistent-hint="true"
                v-model="item.staging"
              ></v-switch>
            </v-layout>
            <v-layout row justify-space-between>
              <v-combobox
                v-model="item.app"
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

    props: {
    value: Boolean,
    item: Object
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
      },
    },
    ...mapGetters({
      apps:'showApps' 
    })
      
    
  },
     methods: {
          close (){
            this.show = false
      },
    
      save () {
        let data = {
          id: this.item.id,
          address: this.item.address,
          tls: this.item.tls,
          staging: this.item.staging,
          appId: this.item.app.id,
      }
        this.$store.dispatch('updateAddress', data)
        this.close()
      },
     },
}

</script>