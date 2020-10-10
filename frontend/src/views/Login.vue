<template>
  <v-app id="inspire">
    <div class="context">
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="12">
          <v-toolbar color="orange" dark :src="require('../assets/sidebar-background.jpg')">
            <v-toolbar-title>TygerCaddy Login</v-toolbar-title>
          </v-toolbar>
          <v-container>
        <validation-observer
    ref="observer"
    v-slot="{ handleSubmit }"
  >
      <form name="form" @submit.prevent="handleSubmit(onSubmit)">

            <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="email"
          :error-messages="errors"
          append-icon="mdi-account"
          label="E-mail"
          color="orange"
          required
        ></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }">          
<v-text-field
            v-model="password"
            :append-icon="'mdi-eye'"
            :type="'password'"
            :error-messages="errors"
            color="orange"
            name="password"
            label="Password"
            required
          ></v-text-field>
                    </validation-provider>

                    <v-btn dark class="orange" type="submit">Login</v-btn>

      </form>
        </validation-observer>
        </v-container>
    </v-card>
      </v-col>
    </v-row>
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
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: 'Login',
  data() {
    return {
          email:"",
          password:"",
      loading: false,
      message: ''
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: 'isLoggedIn',
    }),
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  methods: {
    onSubmit() {
      this.loading = true;
        if (this.email && this.password) {
            let user = {
                email: this.email, 
                password: this.password
            }
          this.$store.dispatch('login', user).then(
            () => {
              
              this.$router.push('/');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            }
          );
        }
    }
  }
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