<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">DNS Providers</h2>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-3>
        <DNSPanel></DNSPanel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DNSPanel from "../components/DNSProviders/DNSPanel.vue";
export default {
  data() {
    return {
      totalSteps: 100,
    };
  },
  components: {
    DNSPanel,
  },
  methods: {},
};
</script>
<style>
.full-height {
  min-height: 100%;
}
</style>
