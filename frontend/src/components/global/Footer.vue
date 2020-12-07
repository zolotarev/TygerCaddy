<template>
  <v-footer class="orange" app inset>
    <v-layout row wrap>
      <v-flex xs8>
        <p class="white--text text-xs-center my-3">&copy; 2019</p>
      </v-flex>
      <v-flex xs4>
        <p class="white--text text-xs-right my-3">Version: {{ currentVersion }}</p>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
import { version } from "../../version";
export default {
  data: () => ({
    currentVersion: version,
  }),
};
</script>
