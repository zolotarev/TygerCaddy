<template>
  <v-col cols="lg6">
    <v-toolbar color="orange" dark dense :src="require('~/assets/sidebar-background.jpg')">
      <v-toolbar-title>Import</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-badge color="blue-grey darken-4">
        <span slot="badge">11</span>
        <v-icon large color="white">mdi-link-box-variant-outline</v-icon>
      </v-badge>
    </v-toolbar>
    <v-card class="blue-grey lighten-5">
      <v-card-text>
      <v-container fluid>
            <v-layout row justify-space-between>
              <v-file-input
                  show-size
                  counter
                  label="File input"
                  color="orange"
                  ref="fileImport"
                ></v-file-input>
                 </v-layout>
                <v-layout row justify-space-between>
                <v-btn dark color="orange" @click="uploadImport">Upload</v-btn>
            </v-layout>
      </v-container>
      </v-card-text>
    </v-card>

  </v-col>
</template>
<script>

export default {
  components: {

  },
  data() {
    return {
    };
  },
  mounted() {
    
  },
  methods: {
    uploadImport(){
        let file = this.$refs.fileImport.files
        
        function onReaderLoad(event){
        console.log(event.target.result);
        let json = JSON.parse(event.target.result);
        alert(event.target.result);
    }

       var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(files[0]);
  },
  },
  computed: {
    
  },
};
</script>
