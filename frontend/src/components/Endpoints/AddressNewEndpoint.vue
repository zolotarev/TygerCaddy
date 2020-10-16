<template>
<v-dialog v-model="urlformshow" max-width="700px">
     <v-card>
          <v-card-title class="orange" dark flat>
            <span class="headline white--text">Endpoint Proxy</span>
          </v-card-title>
 <validation-observer
    ref="observer"
    v-slot="{ handleSubmit }">
    <form name="form" @submit.prevent="handleSubmit(onSubmit)">
          <v-card-text>               
      <validation-provider
                  v-slot="{ errors }"
                  name="Endpoint"
                  rules="required"
                >
               <v-text-field 
               color="orange"
                  name="Endpoint" 
                  label="Endpoint" 
                  placeholder="/example/link" 
                  v-model="endpoint"
                  :error-messages="errors">
                </v-text-field>
      </validation-provider>
                 <validation-provider
                  v-slot="{ errors }"
                  name="app"
                  rules="required"
                >
                <v-combobox
                color="orange"
                 name="app" 
          v-model="app"
          :items="apps"
          :error-messages="errors"
          item-text="name"
          item-value="id"
          label="Select an app to proxy to:"
        ></v-combobox>
        </validation-provider>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" text @click="close">Cancel</v-btn>
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
        endpoint: "",
        app: "",
        address:"",
    };
  },
    props: {
    value: Boolean,
    item: Object
  },
   model: {
        prop: 'value',
        event: 'showhide'
    },
  computed: {
    urlformshow: {
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
            this.urlformshow = false
      },
    
      onSubmit () {
        let data = {
          address: this.item.id,
          endpoint: this.endpoint,
          app: this.app.id,
      }
        this.$store.dispatch('addEndpoint', data)
        this.close()
      },
     },
}

</script>