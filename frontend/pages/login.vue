<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="12">
          <v-toolbar color="orange" dark :src="require('~/assets/sidebar-background.jpg')">
            <v-toolbar-title>TygerCaddy Login</v-toolbar-title>
          </v-toolbar>
          <form name="form" @submit.prevent="login">
            <v-card-text>
              <v-text-field
                v-model="email"
                label="Email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange" dark :disabled="loading" type="submit">login</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "login",
  middleware: "guest",
  components: {},

  data() {
    return {
      email: "",
      password: "",
      error: null,
      loading: false,
      message: "",
    };
  },

  methods: {
    async login() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        console.log(response);
        console.log(this.$auth.Loggedin);
        this.$router.push("/dashboard");
      } catch (e) {
        this.error = e;
        //console.log(e)
      }
    },
  },
};
</script>
