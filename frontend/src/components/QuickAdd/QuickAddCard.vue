<template>
  <v-card flat class="blue-grey lighten-5">
    <v-toolbar color="orange" dark flat>
      <v-toolbar-title>Quick Add Wizard</v-toolbar-title>
    </v-toolbar>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1" color="orange">
                Create Application
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="e1 > 2" step="2" color="orange">
                Create Address
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3" color="orange"> Choose Settings </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <form name="form" @submit.prevent="handleSubmit(Submit1)">
                  <v-stepper-content step="1">
                    <validation-provider v-slot="{ errors }" name="Name" rules="required">
                      <v-text-field
                        name="appName"
                        label="Name"
                        color="orange"
                        v-model="app.appName"
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </validation-provider>

                    <validation-provider
                      v-slot="{ errors }"
                      name="ip_address"
                      rules="ip|required"
                    >
                      <v-text-field
                        name="ip_address"
                        color="orange"
                        v-model="app.ip_address"
                        :error-messages="errors"
                        label="IP Address"
                      >
                      </v-text-field>
                    </validation-provider>
                    <validation-provider
                      v-slot="{ errors }"
                      name="port_number"
                      rules="port_number|required"
                    >
                      <v-text-field
                        name="port_number"
                        color="orange"
                        v-model="app.port_number"
                        :error-messages="errors"
                        label="Port Number"
                      >
                      </v-text-field>
                    </validation-provider>
                    <v-switch
                      color="orange"
                      class="px-3"
                      label="Skip SSL Verification on Backend?"
                      v-model="app.verify_ssl"
                      hint="If your application uses a HTTPS backend with a self signed or otherwise invalid certificate, or your backend does not use HTTPS, this should be ON."
                      input-value="true"
                      persistent-hint
                    >
                    </v-switch>
                    <br />
                    <v-btn color="orange" dark type="submit"> Continue </v-btn>

                    <v-btn text> Cancel </v-btn>
                  </v-stepper-content>
                </form>
              </validation-observer>
              <v-stepper-content step="2">
                <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                <v-btn color="orange" dark @click="e1 = 3"> Continue </v-btn>

                <v-btn text> Cancel </v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                <v-btn color="orange" dark> Finish </v-btn>

                <v-btn text @click="e1 = 1"> Cancel </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      e1: 1,
      app: {
        appName: "",
        ip_address: "",
        port_number: "",
        verify_ssl: false,
      },
      address: {
        address: "",
        tls: false,
        staging: false,
        forceHTTPChallenge: false,
      },
    };
  },
  computed: {},
  methods: {
    Submit1() {
      this.e1 = this.e1 + 1;
    },
  },
};
</script>
