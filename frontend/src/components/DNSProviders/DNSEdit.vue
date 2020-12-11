<template>
  <v-dialog v-model="show" max-width="700px">
    <v-card>
      <v-card-title class="orange" dark flat>
        <span class="headline white--text">Edit DNS Provider</span>
      </v-card-title>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form name="form" @submit.prevent="handleSubmit(onSubmit)">
          <v-card-text>
            <v-text-field
              color="orange"
              name="name"
              label="Name"
              v-model="item.name"
              disabled
            >
            </v-text-field>
            <validation-provider v-slot="{ errors }" name="api_key" rules="required">
              <v-text-field
                name="api_key"
                color="orange"
                v-model="item.api_key"
                :error-messages="errors"
                required
                label="API Key"
              >
              </v-text-field>
            </validation-provider>
            <v-switch
              color="orange"
              class="px-3"
              label="Active?"
              hint="Activate this provider, so that it may be assigned to addresses."
              persistent-hint
              v-model="item.active"
              :disabled="checkAPI()"
            ></v-switch>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" @click="close">Cancel</v-btn>
            <v-btn color="orange" dark type="submit">Save</v-btn>
          </v-card-actions>
        </form>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>

<script>
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
  },
  methods: {
    close() {
      this.show = false;
    },

    onSubmit() {
      this.$store.dispatch("updateDNS", this.item);
      this.close();
    },
    checkAPI() {},
  },
};
</script>
