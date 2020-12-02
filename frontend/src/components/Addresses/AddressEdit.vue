<template>
<v-dialog v-model="show" max-width="700px">
     <v-card>
          <v-card-title class="orange" dark flat>
            <span class="headline white--text">Edit Address</span>
          </v-card-title>
               <validation-observer
    ref="observer"
    v-slot="{ handleSubmit }">
    <form name="form" @submit.prevent="handleSubmit(onSubmit)">
      <v-card-text>
            <validation-provider
                  v-slot="{ errors }"
                  name="address"
                  rules="required|domain"
                >
                  <v-text-field 
                  color="orange"
                  name="address" 
                  label="External Address"  
                  v-model="item.address"
                  :error-messages="errors"
                  required>
                </v-text-field>
            </validation-provider>
              
                   <v-switch
              color="orange"
              class="px-3"
              label="Default to HTTPS?"
              v-model="item.tls"
            ></v-switch>
                  <v-switch
              color="orange"
              class="px-3"
              label="Use HTTPS Staging?"
              v-model="item.staging"
            ></v-switch>
                              <v-switch
              color="orange"
              class="px-3"
              label="Force HTTP Challenge?"
              v-model="item.forceHTTPChallenge"
            ></v-switch>
            <v-switch
              color="orange"
              class="px-3"
              label="Use Custom Certificate?"
              v-model="item.custom_cert"
            ></v-switch>
            <div v-show="item.custom_cert">
            <validation-provider
                  v-slot="{ errors }"
                  name="cert"
                  rules="required"
                >
                  <v-combobox
          v-model="item.cert"
          color="orange"
          :error-messages="errors"
          :items="certs"
          item-text="name"
          item-value="name"
          label="Select custom certificate:"
          required
        ></v-combobox>
            </validation-provider>
            </div>
            <validation-provider
                  v-slot="{ errors }"
                  name="app"
                  rules="required"
                >
                  <v-combobox
          v-model="item.app"
          color="orange"
          :error-messages="errors"
          :items="apps"
          item-text="name"
          item-value="name"
          label="Select an app to proxy to:"
          required
        ></v-combobox>
            </validation-provider>
          </v-card-text>

          <v-card-actions>
 <v-spacer></v-spacer>
            <v-btn color="grey" @click="close">Cancel</v-btn>
            <v-btn color="orange" dark type="submit">Save</v-btn>
          </v-card-actions>
    </form>
              </validation-observer>
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
  data: () => ({
    required: false
  }),
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
      apps:'showApps',
      certs: 'showCerts' 
    })
      
    
  },
     methods: {
          close (){
            this.show = false
      },
    
      onSubmit () {
        let data = {
          id: this.item.id,
          address: this.item.address,
          tls: this.item.tls,
          staging: this.item.staging,
          appId: this.item.app.id,
          certId: this.item.cert.id,
          forceHTTPChallenge: this.item.forceHTTPChallenge,
          custom_cert: this.item.custom_cert
      }
        this.$store.dispatch('updateAddress', data)
        this.close()
      },
     },
}

</script>