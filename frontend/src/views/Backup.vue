<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">Backup/Restore</h2>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-3>
        <backup-panel></backup-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>


import BackupPanel from "../components/Backup/BackupPanel.vue";
export default {
  data() {
    return {
      totalSteps: 100
    };
  },
  components: {
    BackupPanel,
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