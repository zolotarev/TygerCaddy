<template>
  <v-snackbar shaped v-model="show" :color="color">
        {{message}}
        <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="show = false"
        >
          Close
        </v-btn>
      </template>
       
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      show: false,
    }
  },
  computed:{

    ...mapGetters({
      message: 'snack', 
      color: 'color',

    })
  },
  created() {
    this.$store.subscribe((mutation)=> {
      if (mutation.type === 'setSnack') {
        this.show = true
      }
    })




    // this.$store.watch(state => state.snackbar.snack, () => {
    //   const msg = this.$store.state.snackbar.snack
    //   if (msg !== '') {
        
    //     this.message = this.$store.state.snackbar.snack
    //     this.color = this.$store.state.snackbar.color
    //     this.show = true
    //     this.$store.commit('setSnack', {snack: '', color: ''})
    //   }
    // })
  }
}
</script>