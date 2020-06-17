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
          Edit Application
        </v-card-title>

        <v-card-text>
         <v-container fluid>
              <v-layout row justify-space-between>

                  <v-text-field
                  name="name"
                  color="orange"
                  label="App Name"
                  hint="For example, 'Plex', or 'Sonarr'"
                  v-model="item.name"
                  :error-messages="errors.collect('appName')"
                  v-validate="'required'">
                </v-text-field>

              </v-layout>
              <v-layout row justify-space-between>

         <v-text-field
                  name="url"
                  v-model="item.url"
                  hint="The IP of your application including port e.g 10.10.200.1:32400"
                  color="orange"
                  :error-messages="errors.collect('url')"
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
              v-model="item.verify_ssl"
              :persistent-hint="true"
            ></v-switch>

              </v-layout>
              <v-layout row justify-space-between>

                  <v-switch
              color="orange"
              class="px-3"
              hint="If true, the proxy will proxy websocket requests"
              :persistent-hint="true"
              label="Enable Websockets?"

              v-model="item.websocket"
            ></v-switch>
              </v-layout>
              <v-layout row justify-space-between>

                  <v-switch
              color="orange"
              hint="Passes through host information from the original request as most backend apps would expect"
              :persistent-hint="true"
              class="px-3"
              label="Transparent Mode?"
              v-model="item.transparent"
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
  name: "EditApp",
  props: {
    value: Boolean,
    item: Object,
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
      },
      save () {
        this.$store.dispatch('apps/updateApp', this.item)
        this.close()
      },
  },
}
</script>
