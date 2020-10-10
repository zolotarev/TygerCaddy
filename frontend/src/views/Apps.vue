<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">All Apps</h2>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-3>
        <applications-panel></applications-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>


import ApplicationsPanel from "../components/dashboard/ApplicationsPanel";
export default {
  data() {
    return {
      totalSteps: 100
    };
  },
  components: {
    ApplicationsPanel,
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