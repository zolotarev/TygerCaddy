<template>
<v-dialog v-model="show" max-width="700px">
     <v-card>
          <v-card-title class="orange" dark flat>
            <span class="headline white--text">Add Application</span>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>

                  <v-text-field 
                  name="appName" 
                  label="Name"  
                  v-model="appName"
                  hint="For example, 'Plex', or 'Sonarr'"
                  color="orange"
                  :error-messages="errors.collect('appName')"
                  v-validate="'required'">
                </v-text-field>

              </v-layout>
              <v-layout row justify-space-between>
               
                  <v-text-field 
                name="appIP"
                label="App IP"
                v-model="appIP"
                hint="The IP of your application e.g 10.10.200.1"
                color="orange"
                  :error-messages="errors.collect('appIP')"
                  v-validate="{url: {require_protocol: false,require_tld: false,}, required: true}"
                  >
                  </v-text-field>
           
              </v-layout>
              <v-layout row justify-space-between>
              <v-text-field
                name="appPort"
                label="App Port"
                v-model="appPort"
                hint="The Port of your application e.g 8080"
                color="orange"
                :error-messages="errors.collect('appPort')"
                v-validate="'required'"
              >
              </v-text-field>
            </v-layout>
              <v-layout row justify-space-between>
             
                   <v-switch
              color="orange"
              class="px-3"
                hint="If true, the proxy will check for a valid SSL certificate from the App"
                label="SSL Verification on Application?"
                v-model="verify_ssl"
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
    data() {
    return {
      appName: "",
      appIP: "",
      appPort: "",
      verify_ssl: false
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
    }
  },
  methods: {
      close () {
        //this.value = false
        this.show=false
        this.resetForm()
      },
      save(){
          this.submit()
      },
    resetForm(){
      this.appName = "";
      this.appIP = "";
      this.appPort = "";
      this.verify_ssl = false;
            this.errors.clear()
    },
    createApp() { 
      let data = {
        name: this.appName,
        ip_address: this.appIP,
        port_number: this.appPort,
        verify_ssl: this.verify_ssl
      };
      
      this.$store.dispatch('addApp', data)
            this.show = false;
            this.step = 1;
            this.resetForm();
            this.close()
    },
    submit() {
      this.$validator.validate().then(result => {
        if (result) {
            this.createApp();
        }
      });
    }
  },   
}
</script>
