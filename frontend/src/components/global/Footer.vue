<template>
  <v-footer class="orange" app inset>
    <v-layout row wrap>
      <v-flex xs8>
        <p class="white--text text-xs-center my-3">&copy; 2021</p>
      </v-flex>
      <v-flex xs4>
        <p class="white--text text-right my-3">
          Version:
          <a
            :href="
              'https://gitlab.tygercaddy.co.uk/tygercaddy/TygerCaddy/-/releases#' +
              currentVersion
            "
            >{{ currentVersion }}</a
          >
        </p>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
import { version } from "../../version.js";
export default {
  data: () => ({
    currentVersion: version,
  }),
};
</script>
