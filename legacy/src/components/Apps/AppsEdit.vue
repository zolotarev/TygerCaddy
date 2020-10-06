<template>
    <v-dialog v-model="show" max-width="500px">
        <v-card>
           <v-card-title class="orange" dark flat>
            <span class="headline white--text">Edit Application</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>
<v-text-field
                name="appName"
                color="orange"
                label="App Name"
                hint="For example, 'Plex', or 'Sonarr'"
                v-model="item.name"
                :error-messages="errors.collect('appName')"
                required
              >
              </v-text-field>
            </v-layout>
            <v-layout row justify-space-between>
              <v-text-field
                name="appIP"
                v-model="item.ip_address"
                hint="The IP of your application e.g 10.10.200.1"
                color="orange"
                :error-messages="errors.collect('appIP')"
                ipAddress
                required
              >
              </v-text-field>
            </v-layout>
            <v-layout row justify-space-between>
              <v-text-field
                name="appPort"
                v-model="item.port_number"
                hint="The Port of your application e.g 8080"
                color="orange"
                :error-messages="errors.collect('appIP')"
                required
              >
              </v-text-field>
            </v-layout>
            <v-layout row justify-space-between>
              <v-switch
                color="orange"
                class="px-3"
                hint="If true, the proxy will check for a valid SSL certificate from the App"
                label="SSL Verification on Application?"
                v-model="item.verify_ssl"
                :persistent-hint="true"
              ></v-switch>
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
      }
    }
  },
     methods: {
          close (){
            this.show = false
      },
      save () {
             //   console.log(this.item)
        this.$store.dispatch('updateApp', this.item)
        this.close()
      },
     },
}

</script>