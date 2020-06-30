<template>

  <v-col cols="12">
    <v-toolbar
      color="orange"
      dark
      dense
      :src="require('~/assets/sidebar-background.jpg')"
    >
      <v-toolbar-title>View/Edit Tyger Config</v-toolbar-title>
      <v-spacer></v-spacer>

        <v-icon large color="white">mdi-cog</v-icon>

    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-container fluid>
              <v-layout row justify-space-between>

                  <v-text-field
                  name="server_name"
                  color="orange"
                  label="Server Name"
                  hint="A friendly name for this server."
                  v-model="item.server_name"
                  :error-messages="errors.collect('server_name')"
                  v-validate="'required'">
                </v-text-field>

              </v-layout>
              <v-layout row justify-space-between>

                  <v-text-field
                  name="listen"
                  color="orange"
                  label="Caddy API Address"
                  hint="Do not change this unless you know what you are doing!"
                  v-model="item.listen"
                  :error-messages="errors.collect('listen')"
                  v-validate="'required'">
                </v-text-field>
              </v-layout>
               <v-layout row justify-space-between>

                  <v-switch
              color="orange"
              class="px-3"
              label="Use Automatic HTTPS?"
              hint="Use automatic HTTPS on all Domains?"
              :persistent-hint="true"
              v-model="item.automatic_https"
            ></v-switch>

              </v-layout>
                             <v-layout row justify-space-between>

                  <v-switch
              color="orange"
              class="px-3"
              label="Automatic redirect to HTTPS?"
              hint="Automaticallly redirect HTTP to HTTPS?"
              :persistent-hint="true"
              v-model="item.redirect_https"
            ></v-switch>

              </v-layout>
              <v-layout row justify-space-between>

                  <v-switch
              color="orange"
              class="px-3"
              label="Use DNS Verification?"
              hint="Automaticallly redirect HTTP to HTTPS?"
              :persistent-hint="true"
              v-model="item.use_dns_verification"
            ></v-switch>

              </v-layout>
                            <v-layout row justify-space-between>

                  <v-text-field
                  name="dns_provider_name"
                  color="orange"
                  label="DNS Provider Name"
                  hint="Currently Only cloudflare is supported"
                  v-model="item.dns_provider_name"
                  :error-messages="errors.collect('dns_provider_name')"
                  >
                </v-text-field>
              </v-layout>
                            <v-layout row justify-space-between>

                  <v-text-field
                  name="dns_api_token"
                  color="orange"
                  label="DNS API Token"
                  hint="Used to authenticate with your DNS provider for SSL Verification!"
                  v-model="item.dns_api_token"
                  :error-messages="errors.collect('dns_api_token')"
                  v-validate="'required'">
                </v-text-field>
              </v-layout>
<v-btn dark color="orange"  @click="save">Save</v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </v-col>

</template>
<script>
export default {
  props: {
    value: Boolean,
    item: Object
  },
  computed: {

  },
  methods:{
     save(){
        let data = {
          server_name: this.item.server_name,
      }
      console.log(this.item)
      console.log(data)
      //this.$store.dispatch('addresses/updateAddress', data)
      },
  }
};
</script>
