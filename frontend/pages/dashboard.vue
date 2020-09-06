<template>
<div>
  <v-container>
 <v-row>
<AddressesCard />
  <ApplicationsCard />


 </v-row>
</v-container>
    </div>
</template>
<script>

import ApplicationsCard from '../components/default/dashboard/ApplicationsCard'
import AddressesCard from '../components/default/dashboard/AddressesCard'
export default {
  components: {
    ApplicationsCard,
    AddressesCard
  },
  layout: 'default',
  middleware: 'auth',

  computed: {

  }
}
</script>
