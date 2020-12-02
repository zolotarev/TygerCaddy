<template>
<v-dialog v-model="show" max-width="700px">
     <v-card>
          <v-card-title class="orange" dark flat>
            <span class="headline white--text">Edit Certificate</span>
          </v-card-title>
               <validation-observer
    ref="observer"
    v-slot="{ handleSubmit }">
    <form name="form" @submit.prevent="handleSubmit(onSubmit)">
      <v-card-text>
            <validation-provider
                  v-slot="{ errors }"
                  name="name"
                  rules="required"
                >
                  <v-text-field 
                  color="orange"
                  name="name" 
                  label="Name"  
                  v-model="item.name"
                  :error-messages="errors"
                  required>
                </v-text-field>
            </validation-provider>
              <v-file-input 
                chips 
                clearable 
                persistent-hint 
                hint="Only Upload the full cert.pem"  
                label="Cert.pem File" 
                name="cert_file"
                v-model="cert_file"
                color="orange" 
                >
                </v-file-input>
                <v-file-input 
                chips 
                clearable 
                persistent-hint 
                hint="Only Upload the full key.pem"  
                label="key.pem File" 
                name="key_file"
                color="orange" 
                v-model="key_file"
                >
                </v-file-input>
            
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
  data() {
    return {
      key_file:null,
      cert_file:null,
    }
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
      },
    },
    ...mapGetters({
      apps:'showApps' 
    })
      
    
  },
     methods: {
          close (){
            this.show = false
      },
    
      onSubmit () {
       let formData = new FormData()
      //if (this.cert_file){
        formData.append("cert_file", this.cert_file)
      //}
      //if (this.key_file){
        formData.append("pem_file", this.key_file)
      //}
      formData.append("name", this.name)
      formData.append("id", this.item.id)
        this.$store.dispatch('updateCert', formData)
        this.close()
      },
     },
}

</script>