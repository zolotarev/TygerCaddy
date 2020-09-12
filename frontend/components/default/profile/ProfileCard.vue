
<template >
  <v-col cols="12" v-if="show">
    <v-toolbar color="orange" dark dense :src="require('~/assets/sidebar-background.jpg')">
      <v-toolbar-title>View Profile</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-icon large color="white">mdi-cog</v-icon>
    </v-toolbar>
    <v-card class="blue-grey lighten-5">
      <v-card-text>
        <v-container fluid>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>User Name:</v-list-item-title>
              <v-list-item-subtitle>{{user.name}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Email:</v-list-item-title>
                <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Role:</v-list-item-title>
                  <v-list-item-subtitle>{{user.role}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Registered:</v-list-item-title>
                  <v-list-item-subtitle>{{user.register_timestamp}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Last Updated:</v-list-item-title>
                  <v-list-item-subtitle>{{user.updatedAt}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

        </v-container>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  props: {
    value: Boolean,
    item: Object,
  },
  model: {
    prop: "value",
    event: "showhide",
  },
  computed: {
    show: {
      get: function () {
        return this.value;
      },
      set: function (value) {
        this.$emit("showhide", value);
      },
    },
    user() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    editConfig() {},
  },
};
</script>
