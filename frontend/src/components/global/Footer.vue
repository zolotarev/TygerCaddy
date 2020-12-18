<template>
  <v-footer class="orange" app inset>
    <v-layout row wrap>
      <v-flex xs8>
        <p class="white--text text-xs-center my-3">
          &copy; 2021 |
          <a
            class="white--text"
            href="https://gitlab.tygercaddy.co.uk/tygercaddy/TygerCaddy/-/wikis/home"
            target="_blank"
            >Documentation</a
          >
          |
          <a class="white--text" target="_blank" href="https://tygercaddy.co.uk"
            >Website</a
          >
          |
          <a
            class="white--text"
            href="https://gitlab.tygercaddy.co.uk/tygercaddy/TygerCaddy/-/issues"
            target="_blank"
            >Report Issue</a
          >
        </p>
      </v-flex>
      <v-flex xs4>
        <p class="white--text text-right my-3">
          <small>
            Version:
            <a
              class="white--text"
              :href="
                'https://gitlab.tygercaddy.co.uk/tygercaddy/TygerCaddy/-/releases#' +
                currentVersion
              "
              >{{ currentVersion }}</a
            >
          </small>
        </p>
      </v-flex>
    </v-layout>
  </v-footer>
</template>
<script>
import { version } from "../../version.js";
export default {
  data: () => ({
    currentVersion: version || "Development Live",
  }),
};
</script>
