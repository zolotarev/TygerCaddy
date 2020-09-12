<template>
  <div>
    <v-container>
      <v-row>
        <ApplicationsCard />
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ApplicationsCard from "../components/default/dashboard/ApplicationsCard";

export default {
  components: {
    ApplicationsCard,
  },
  layout: "default",
  middleware: "auth",

  computed: {},
  mounted() {
    this.$store.dispatch("config/getConfig");
  },
};
</script>
