<template>
  <div>
    <v-container>
      <v-row>
        <Import />
        <Export />
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Import from "../components/default/backup/Import";
import Export from "../components/default/backup/Export";
export default {
  components: {
    Import,
    Export,
  },
  layout: "default",
  middleware: "auth",

  computed: {},
  mounted() {
    this.$store.dispatch("config/getConfig");
  },
};
</script>
