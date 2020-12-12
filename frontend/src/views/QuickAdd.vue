<template>
  <v-container>
    <h2 class="blue-grey--text darken-5 pa-2">Quick Add Wizard</h2>
    <v-layout row wrap>
      <v-flex xs12 sm12 pa-3>
        <QuickAdd-card></QuickAdd-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import QuickAddCard from "../components/QuickAdd/QuickAddCard.vue";

export default {
  components: {
    QuickAddCard,
  },
};
</script>
