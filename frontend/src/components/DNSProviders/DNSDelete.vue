<template>

    <v-dialog v-model="show" max-width="500px">
        <v-card>
          <v-card-title class="orange" dark flat>
            <span class="headline white--text">Delete Certificate - {{ item.name }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                Are you sure you want to delete this certificate?
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey darken-1" dark @click="deleteclose">Cancel</v-btn>
            <v-btn color="orange darken-1" dark @click="deletecertificate">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>
<script>
export default {
    data(){
        return{
            editedItem: {
                id:0,
            }, 
        }
    },
    props: {
    value: Boolean,
    item: Object
  },
   model: {
        prop: 'value',
        event: 'showhide'
    },
  computed: {
    show: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("showhide", value);
      }
    }
  },
     methods: {
          deleteclose (){
            this.show = false
      },
      deletecertificate () {
        this.$store.dispatch('deleteCert', this.item)
        this.deleteclose()
      },
     },
}

</script>