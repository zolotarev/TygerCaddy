<template>
  <div class="text-center">
    <v-dialog
      width="500"
      v-model="show"
    >
      <v-card>
        <v-card-title
          class="headline orange white--text"
          dark
        >
          Delete App - {{ item.name }}
        </v-card-title>

<v-card-text>
            <v-container fluid>
              <v-layout row justify-space-between>

                  <v-layout wrap>
                Are you sure you want to delete this App?
              </v-layout>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="blue-grey darken-3"  @click="deleteclose">Cancel</v-btn>
            <v-btn dark color="orange"  @click="deleteapp">Delete</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {

    data() {
    return {
      editedItem: {
                id:0,
            },


    };
  },
 props: {
    value: Boolean,
    item: Object,
  },
   model: {
        prop: 'value',
        event: 'showhide',

    },
  computed: {
    show: {
      get: function() {
        return this.value;
      },
      set: function(value) {
        this.$emit("showhide", value);
      }
    },
  },
  methods: {
      deleteclose (){
            this.show = false
      },
      deleteapp () {
        this.$store.dispatch('apps/deleteApp', this.item)
        this.deleteclose()
      },
  },

}
</script>
