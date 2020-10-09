<template>
<v-dialog v-model="show" max-width="700px">
     <v-card>
          <v-card-title class="orange" dark flat>
            <span class="headline white--text">Edit Application</span>
          </v-card-title>
                    
              <validation-observer
    ref="observer"
    v-slot="{ handleSubmit }">
    <form name="form" @submit.prevent="handleSubmit(onSubmit)">
      <v-card-text>
                <validation-provider
                  v-slot="{ errors }"
                  name="Name"
                  rules="required"
                >
                  <v-text-field 
                  name="appName" 
                  label="Name" 
                  color="orange" 
                  v-model="item.name"
                  :error-messages="errors"
                  required>
                </v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="ip_address"
                  rules="ip|required"
                >
                  <v-text-field 
                  name="ip_address"  
                  color="orange" 
                  v-model="item.ip_address"
                  :error-messages="errors"
                  required
                  label="IP Address">
                  </v-text-field>
                </validation-provider>
                <validation-provider
                  v-slot="{ errors }"
                  name="port_number"
                  rules="port_number|required"
                >
                  <v-text-field 
                  name="port_number"  
                  color="orange" 
                  v-model="item.port_number"
                  :error-messages="errors"
                  required
                  label="Port Number">
                  </v-text-field>
                </validation-provider>
                   <v-switch
              color="orange"
              class="px-3"
              label="Skip SSL Verification on Backend?"
              v-model="item.verify_ssl"
            ></v-switch>
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
      onSubmit () {
             //   console.log(this.item)
        this.$store.dispatch('updateApp', this.item)
        this.close()
      },
     },
}

</script>