<template>
<div>
  <v-container>
 <v-row>
<ConfigCard :item="editConfig"/>



 </v-row>
</v-container>
    </div>
</template>
<script>

import ConfigCard from '../components/default/config/ConfigCard'
export default {
  components: {
    ConfigCard
  },
  layout: 'default',
  middleware: 'auth',
  data() {
    return {
      editConfig: {

      }
    }
  },
mounted(){

  },
  beforeCreate(){

  },
  created() {
    this.editConfig = Object.assign({},this.$store.state.config.config);
    this.$store.dispatch("config/getConfig");
  }
}
</script>
