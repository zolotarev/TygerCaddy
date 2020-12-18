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

              <v-stepper-step step="3" color="orange"> Confirm </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <form name="form" @submit.prevent="handleSubmit(Submit1)">
                  <v-stepper-content step="1">
                    <validation-provider v-slot="{ errors }" name="Name" rules="required">
                      <v-text-field
                        name="name"
                        label="Name"
                        color="orange"
                        v-model="app.name"
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
                      hint="If your app or backend is expecting a HTTPS request, and does not provide a valid certificate, switch this on. "
                      input-value="true"
                      persistent-hint
                    >
                    </v-switch>
                    <br />
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="orange" dark type="submit"> Continue </v-btn>
                    </v-card-actions>
                  </v-stepper-content>
                </form>
              </validation-observer>
              <v-stepper-content step="2">
                <validation-observer ref="observer" v-slot="{ handleSubmit }">
                  <form name="form2" @submit.prevent="handleSubmit(Submit1)">
                    <validation-provider
                      v-slot="{ errors }"
                      name="address"
                      rules="required|domain"
                    >
                      <v-text-field
                        color="orange"
                        name="address"
                        label="External Address"
                        v-model="address.address"
                        :error-messages="errors"
                      >
                      </v-text-field>
                    </validation-provider>

                    <v-switch
                      color="orange"
                      class="px-3"
                      label="Default to HTTPS?"
                      v-model="address.tls"
                    ></v-switch>
                    <v-switch
                      color="orange"
                      class="px-3"
                      label="Use HTTPS Staging?"
                      v-model="address.staging"
                    ></v-switch>
                    <v-switch
                      color="orange"
                      class="px-3"
                      label="Force HTTP Challenge"
                      v-model="address.forceHTTPChallenge"
                    ></v-switch>
                  </form>
                </validation-observer>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey" dark @click="e1 = 1"> Cancel </v-btn>
                  <v-btn color="orange" dark type="submit" @click="e1 = 3">
                    Continue
                  </v-btn>
                </v-card-actions>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-container class="fill-height" fluid>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <h4>Address:</h4>
                      <p>{{ address.address }}</p>
                      <h4>HTTPS:</h4>
                      <p>{{ address.tls }}</p>
                      <h4>Staging:</h4>
                      <p>{{ address.staging }}</p>
                      <h4>Force HTTP Challenge:</h4>
                      <p>{{ address.forceHTTPChallenge }}</p>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <h4>App:</h4>
                      <p>{{ app.name }}</p>
                      <h4>IP:</h4>
                      <p>{{ app.ip_address }}</p>
                      <h4>Port:</h4>
                      <p>{{ app.port_number }}</p>
                      <h4>SSL Verification:</h4>
                      <p>{{ app.verify_ssl }}</p>
                    </v-col>
                  </v-row>
                </v-container>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="grey" dark @click="e1 = 1"> Cancel </v-btn>
                  <v-btn color="orange" dark type="submit" @click="SubmitForm()">
                    Finish
                  </v-btn>
                </v-card-actions>
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
        name: "",
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
    resetForm() {
      (this.app = {
        name: "",
        ip_address: "",
        port_number: "",
        verify_ssl: false,
      }),
        (this.address = {
          address: "",
          tls: false,
          staging: false,
          forceHTTPChallenge: false,
        });
    },
    Submit1() {
      this.e1 = this.e1 + 1;
    },
    SubmitForm() {
      let data = {
        address: this.address,
        app: this.app,
      };
      this.$store.dispatch("quickAdd", data);
      this.resetForm();
      this.$router.push("/");
    },
  },
};
</script>
