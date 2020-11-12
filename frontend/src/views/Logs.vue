<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">View Logs</h2>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-3>
        <logs-panel></logs-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>


import LogsPanel from "../components/Logs/LogsPanel";
export default {
  data() {
    return {
      totalSteps: 100
    };
  },
  components: {
    LogsPanel
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