<template>
<v-app id="inspire">
    <div class="context">
        <v-container class="fill-height" fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm4 pa-4>
        <v-card elevation="12">
          <v-toolbar color="orange" dark :src="require('../assets/sidebar-background.jpg')">
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
                color="orange"
              ></v-text-field>

              <v-text-field
                v-model="password"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                color="orange"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="orange" dark type="submit">login</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
    </div>
    <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </v-app>
<!--    -->
</template>

<script>
export default {
  data: function() {
    return {
      email: "",
      password: "",
      error: "",
      pending: false,
      alert: false
    };
  },
  
  computed: {},
  methods: {
    login: function() {
      const password = this.password;
      const email = this.email;
      this.$auth.login({
        data: { email: email, password: password },
        error: function () {
           this.$store.commit('setSnack', {snack: "Error! Please check your email and password and try again. ", color: 'error'})
           },
        success: function () {
         // this.$store.commit('SET_ALERT', {message: "", type: ""})
          this.$store.dispatch('setEmail', {email: this.email })
          localStorage.setItem("email", this.email)
          this.$store.commit('setSnack', {snack: "Success! You are now logged in as " + this.email , color: 'success'})
           
        },
        rememberMe: true,
        redirect: "/"
      });
    }
  },

  
};
</script>
<style>
* {
  margin: 0px;
  padding: 0px;
}
.context {
  width: 100%;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  z-index: 9999;
}

.area {
  background: #ff9800;
  background: -webkit-linear-gradient(to left, #ffaa00, #ff7700);
  width: 100%;
  height: 100vh;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 5s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 1s;
  animation-duration: 6s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 9s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 15s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 20s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 0%;
  }
}
</style>