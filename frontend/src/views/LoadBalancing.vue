<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">All Certificates</h2>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-3>
        <load-balancing-panel></load-balancing-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LoadBalancingPanel from "../components/LoadBalancing/LoadBalancingPanel";
export default {
  data() {
    return {
      totalSteps: 100,
    };
  },
  components: {
    LoadBalancingPanel,
  },
  methods: {},
};
</script>
<style>
.full-height {
  min-height: 100%;
}
</style>
