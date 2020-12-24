<template>
  <v-dialog v-model="show" max-width="700px">
    <v-card>
      <v-card-title class="orange" dark flat>
        <span class="headline white--text">Add Load Balancer</span>
      </v-card-title>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form name="form" @submit.prevent="handleSubmit(onSubmit)">
          <v-card-text>
            <validation-provider v-slot="{ errors }" name="name" rules="required">
              <v-text-field
                color="orange"
                name="name"
                label="Name"
                v-model="formData.name"
                :error-messages="errors"
              >
              </v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="try_duration" rules="required">
              <v-text-field
                color="orange"
                name="try_duration"
                label="Try Duration"
                v-model="formData.try_duration"
                :error-messages="errors"
                hint="Defines how long to try selecting available backends for each request if the next available host is down. Use the format 2m for Two Minutes, or 1.5h for One and a Half Hours, etc."
                persistent-hint
              >
              </v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="try_interval" rules="required">
              <v-text-field
                color="orange"
                name="try_interval"
                label="Try Interval"
                v-model="formData.try_interval"
                :error-messages="errors"
                hint="Defines how long to wait between selecting the next host from the pool. Use the format 2m for Two Minutes, or 1.5h for One and a Half Hours, etc."
                persistent-hint
              >
              </v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="policy" rules="required">
              <v-combobox
                v-model="formData.policy"
                color="orange"
                :error-messages="errors"
                :items="policies"
                item-text="name"
                item-value="name"
                item-color="orange"
                label="Select a policy to apply: "
              ></v-combobox>
            </validation-provider>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      formData: {
        name: "",
        try_duration: "",
        try_interval: "",
        policy: [],
      },
    };
  },
  props: {
    value: Boolean,
  },
  model: {
    prop: "value",
    event: "showhide",
  },
  computed: {
    ...mapGetters({
      policies: "showPolicies",
    }),
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
      this.resetForm();
    },
    save() {
      this.submit();
    },
    resetForm() {
      this.formData = {
        name: "",
        try_duration: "",
        try_interval: "",
        policy: [],
      };
    },
    onSubmit() {
      let data = {
        name: this.formData.name,
        try_duration: this.formData.try_duration,
        try_interval: this.formData.try_interval,
        policy: this.formData.policy,
      };
      console.log(data);

      this.$store.dispatch("addLb", data);
      this.show = false;
      this.resetForm();
      this.close();
    },
  },
};
</script>
