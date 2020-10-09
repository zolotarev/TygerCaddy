<template>
  <div>
       <v-layout row wrap>
      <v-flex xs12 sm12 pa-3>
<v-card flat class="blue-grey lighten-5">
    <v-toolbar color="orange" dark flat>
      <v-toolbar-title>Backup</v-toolbar-title>
      <v-spacer></v-spacer>

     
        <v-icon large color="white">mdi-domain</v-icon>
    </v-toolbar>
      <v-card-title primary-title>
         <v-row
      class="mb-6"
      no-gutters
    >
      <v-col class="d-none d-lg-block">
        <h2 class="blue-grey--text darken-4">Backup</h2>
      </v-col>
      
      <v-col class="text-right">
<v-btn rounded color="orange" dark @click.stop="">
  <v-icon dark>mdi-plus</v-icon>
  <div class="d-none d-lg-block">Backup</div>
  </v-btn>
      </v-col>
    </v-row>

      </v-card-title>
      
    </v-card>
      </v-flex>
      <v-flex xs12 sm12 pa-3>
    <v-card flat class="blue-grey lighten-5">
    <v-toolbar color="orange" dark flat>
      <v-toolbar-title>Restore</v-toolbar-title>
      <v-spacer></v-spacer>

     
        <v-icon large color="white">mdi-domain</v-icon>

    </v-toolbar>
      <v-card-title primary-title>
         <v-row
      class="mb-6"
      no-gutters
    >
      <v-col class="d-none d-lg-block">
        <h2 class="blue-grey--text darken-4">Restore</h2>
      </v-col>
      
      <v-col class="text-right">
<v-btn rounded color="orange" dark @click.stop="">
  <v-icon dark>mdi-plus</v-icon>
  <div class="d-none d-lg-block">Restore</div>
  </v-btn>
      </v-col>
    </v-row>

      </v-card-title>
      
    </v-card>
      </v-flex>
       </v-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
    
  },
  components:{
  },
  methods: {
  },
  computed: {
  }
};
</script>
