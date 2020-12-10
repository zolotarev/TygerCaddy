<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">All Certificates</h2>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-3>
        <certificates-panel></certificates-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>


import CertificatesPanel from "../components/Certificates/CertificatesPanel";
export default {
  data() {
    return {
      totalSteps: 100
    };
  },
  components: {
    CertificatesPanel
  },
  methods: {
   
  }
};
</script>
<style>
.full-height {
  min-height: 100%;
}
</style>