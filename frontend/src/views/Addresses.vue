<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">All Addresses</h2>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-3>
        <addresses-panel></addresses-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>


import AddressesPanel from "../components/dashboard/AddressesPanel";
export default {
  data() {
    return {
      totalSteps: 100
    };
  },
  components: {
    AddressesPanel
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