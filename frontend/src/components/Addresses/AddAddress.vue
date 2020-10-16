<template>
<v-dialog v-model="show" max-width="700px">
     <v-card>
          <v-card-title class="orange" dark flat>
            <span class="headline white--text">Add Address</span>
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
                  v-model="formData.address"
                  :error-messages="errors"
                  required>
                </v-text-field>
            </validation-provider>
              
                   <v-switch
              color="orange"
              class="px-3"
              label="Default to HTTPS?"
              v-model="formData.tls"
            ></v-switch>
                  <v-switch
              color="orange"
              class="px-3"
              label="Use HTTPS Staging?"
              v-model="formData.staging"
            ></v-switch>
            <validation-provider
                  v-slot="{ errors }"
                  name="app"
                  rules="required"
                >
                  <v-combobox
          v-model="formData.app"
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
    
    data() {
    return {
      formData: {
        address: "",
        tls: false,
        staging: false,
        app: "",
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
        ...mapGetters({
      apps:'showApps' 
    }),
    show: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("showhide", value);
      }
    },
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
              address: "",
              tls: false,
              staging: false,
              app: "",
            }
    },
    onSubmit() { 
      let data = {
          address: this.formData.address,
          tls: this.formData.tls,
          staging: this.formData.staging,
          app: this.formData.app.id,
      }
      
      this.$store.dispatch('addAddress', data)
            this.show = false;
            this.resetForm();
            this.close()
    },
  },  

}
</script>
