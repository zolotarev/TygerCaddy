<template>
  <div>
    <v-container>
      <v-row>
        <AddressesCard />
      </v-row>
    </v-container>
  </div>
</template>
<script>
import AddressesCard from "../components/default/dashboard/AddressesCard";
export default {
  components: {
    AddressesCard,
  },
  layout: "default",
  middleware: "auth",

  computed: {},
  mounted() {
    this.$store.dispatch("config/getConfig");
  },
};
</script>
