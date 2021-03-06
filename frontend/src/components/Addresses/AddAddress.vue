<template>
  <v-dialog v-model="show" max-width="700px">
    <v-card>
      <v-card-title class="orange" dark flat>
        <span class="headline white--text">Add Address</span>
      </v-card-title>
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form name="form" @submit.prevent="handleSubmit(onSubmit)">
          <v-card-text>
            <validation-provider
              v-slot="{ errors }"
              name="address"
              rules="required|domain"
            >
              <v-text-field
                color="orange"
                name="address"
                label="External Address"
                v-model="formData.address"
                :error-messages="errors"
              >
              </v-text-field>
            </validation-provider>

            <v-switch
              color="orange"
              class="px-3"
              label="Default to HTTPS?"
              v-model="formData.tls"
            ></v-switch>
            <v-switch
              color="orange"
              class="px-3"
              label="Use HTTPS Staging?"
              v-model="formData.staging"
            ></v-switch>
            <v-switch
              color="orange"
              class="px-3"
              label="Force HTTP Challenge"
              v-model="formData.forceHTTPChallenge"
            ></v-switch>
            <validation-provider rules="" vid="custom_cert">
              <v-switch
                color="orange"
                class="px-3"
                label="Use Custom Certificate?"
                v-model="formData.custom_cert"
              ></v-switch>
            </validation-provider>
            <div v-show="formData.custom_cert">
              <validation-provider
                v-slot="{ errors }"
                name="cert"
                :rules="{ required_if: { target: 'custom_cert', value: true } }"
              >
                <v-combobox
                  v-model="formData.cert"
                  color="orange"
                  :error-messages="errors"
                  :items="certs"
                  item-text="name"
                  item-value="name"
                  label="Select custom certificate:"
                ></v-combobox>
              </validation-provider>
            </div>
            <validation-provider v-slot="{ errors }" name="app" rules="required">
              <v-combobox
                v-model="formData.app"
                multiple
                color="orange"
                :error-messages="errors"
                :items="apps"
                item-text="name"
                item-value="name"
                dense
                small-chips
                item-color="orange"
                label="Select an app to proxy to:"
              ></v-combobox>
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="dns"
              rules=""
              v-if="formData.forceHTTPChallenge == false"
            >
              <v-combobox
                v-model="formData.dns"
                name="dns"
                color="orange"
                :error-messages="errors"
                :items="dns"
                item-text="name"
                item-value="name"
                label="DNS Provider:"
                hint="To use DNS Verification, select the DNS provider for this domain."
                placeholder="Select an active DNS Provider"
                persistent-hint
              ></v-combobox>
            </validation-provider>
            <div v-if="formData.app.length >= 2">
              <validation-provider v-slot="{ errors }" name="policy" rules="">
                <v-combobox
                  v-model="formData.policy"
                  name="policy"
                  color="orange"
                  :error-messages="errors"
                  :items="policies"
                  item-text="name"
                  item-value="name"
                  label="Load Balance Policy:"
                  hint="To Load Balacing, select the Load Balancer for this domain."
                  placeholder="Select a Load Balancer"
                  persistent-hint
                ></v-combobox>
              </validation-provider>
            </div>
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
        address: "",
        tls: false,
        staging: false,
        app: [],
        policy: null,
        forceHTTPChallenge: false,
        custom_cert: false,
        cert: null,
        dns: null,
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
      apps: "showApps",
      certs: "showCerts",
      dns: "getActiveDNS",
      policies: "showLbs",
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
        address: "",
        tls: false,
        staging: false,
        app: [],
        policy: null,
        forceHTTPChallenge: false,
        custom_cert: false,
        cert: null,
        dns: null,
      };
    },
    onSubmit() {
      let data = {
        address: this.formData.address,
        tls: this.formData.tls,
        staging: this.formData.staging,
        app: this.formData.app,
        forceHTTPChallenge: this.formData.forceHTTPChallenge,
        custom_cert: this.formData.custom_cert,
        cert: this.formData.cert || null,
        policy: this.formData.policy || null,
        dns: this.formData.dns || null,
      };
      console.log(data);

      this.$store.dispatch("addAddress", data);
      this.show = false;
      this.resetForm();
      this.close();
    },
  },
};
</script>
