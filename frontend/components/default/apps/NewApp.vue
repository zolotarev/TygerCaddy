<template>
  <div class="text-center">
    <v-dialog
      width="500"
      v-model="show"
    >
      <v-card>
        <v-card-title
          class="headline orange white--text"
          dark
        >
          Add Application
        </v-card-title>

        <v-card-text>
         <v-container fluid>
              <v-layout row justify-space-between>

                  <v-text-field
                  name="appName"
                  color="orange"
                  label="App Name"
                  hint="For example, 'Plex', or 'Sonarr'"
                  v-model="formData.appName"
                  :error-messages="errors.collect('appName')"
                  v-validate="'required'">
                </v-text-field>

              </v-layout>
              <v-layout row justify-space-between>

         <v-text-field
                  name="appURL"
                  v-model="formData.appURL"
                  hint="The IP of your application including port e.g 10.10.200.1:32400"
                  color="orange"
                  :error-messages="errors.collect('appURL')"
                  v-validate="{url: {require_protocol: false,require_tld: false,}, required: true}"
                  label="URL">
                  </v-text-field>

              </v-layout>
              <v-layout row justify-space-between>

                  <v-switch
              color="orange"
              class="px-3"
              hint="If true, the proxy will check for a valid SSL certificate from the App"
              label="SSL Verification on Application?"
              v-model="formData.verify_ssl"
              persistent-hint="true"
            ></v-switch>

              </v-layout>
              <v-layout row justify-space-between>

                  <v-switch
              color="orange"
              class="px-3"
              hint="If true, the proxy will proxy websocket requests"
              :persistent-hint="true"
              label="Enable Websockets?"

              v-model="formData.websockets"
            ></v-switch>
              </v-layout>
              <v-layout row justify-space-between>

                  <v-switch
              color="orange"
              hint="Passes through host information from the original request as most backend apps would expect"
              :persistent-hint="true"
              class="px-3"
              label="Transparent Mode?"
              v-model="formData.transparent"
            ></v-switch>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="blue-grey darken-3"  @click="close">Cancel</v-btn>
            <v-btn dark color="orange"  @click="save">Save</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "NewApp",
  data() {
    return {
      formData: {
        appName: "",
        appURL: "",
        websockets: false,
        transparent: false,
        verify_ssl: false
      },
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
        this.show=false
        this.resetForm()
      },
      save(){
          this.submit()
      },
    resetForm(){
            this.formData = {
              appName: "",
              appURL: "",
              websockets: false,
              transparent: false,
              verify_ssl: false
            }
            this.errors.clear()
    },
    createApp() {
      let data = {

          name: this.formData.appName,
          url: this.formData.appURL,
          verify_ssl: this.formData.verify_ssl,
          websocket: this.formData.websockets,
          transparent: this.formData.transparent

      }

      this.$store.dispatch('apps/addApp', data)
            this.show = false;
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
