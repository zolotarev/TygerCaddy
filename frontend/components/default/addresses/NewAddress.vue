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
          Add Address
        </v-card-title>

<v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>

                  <v-text-field
                  name="address"
                  color="orange"
                  label="External Address"
                  hint="The domain or subdomain you would like to proxy e.g plex.mydomain.com"
                  v-model="formData.address"
                  :error-messages="errors.collect('address')"
                  v-validate="'required'">
                </v-text-field>

              </v-layout>
              <v-layout row justify-space-between>

                   <v-switch
              color="orange"
              class="px-3"
              label="Default to HTTPS?"
              hint="Enable automatic SSL Cert signing, and redirect from HTTP to HTTPS"
              :persistent-hint="true"
              v-model="formData.tls"
            ></v-switch>

              </v-layout>
              <v-layout row justify-space-between>

                  <v-switch
              color="orange"
              class="px-3"
              label="Use HTTPS Staging?"
              hint="Only works with 'Default to HTTPS', this uses the LetsEncrypt test servers to avoid rate limits during testing"
              :persistent-hint="true"
              v-model="formData.staging"
            ></v-switch>

              </v-layout>
              <v-layout row justify-space-between>

                  <v-combobox
          v-model="formData.app"
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
            <v-btn dark color="blue-grey darken-3"  @click="close">Cancel</v-btn>
            <v-btn dark color="orange"  @click="save">Save</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
        app: '',
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
    },
    apps() {
      return this.$store.state.apps.apps
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
              address: "",
              tls: false,
              staging: false,
              app: "",
            }
            this.errors.clear()
    },
    createAdd() {
      let data = {
          address: this.formData.address,
          tls: this.formData.tls,
          staging: this.formData.staging,
          AppId: this.formData.app.id,
      }

      this.$store.dispatch('addresses/addAddress', data)
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
