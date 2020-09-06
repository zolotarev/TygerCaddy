<template>
<div>
  <h1 style="color: white;">TygerNode Login</h1>

		<form name="form" @submit.prevent="login">
      <div class="form-group">
          <input
            v-model="email"
            type="text"
            class="form-control"
            name="email"
            placeholder="Email"
          />

        </div>
      <div class="form-group">
        <input
          v-model="password"
          type="password"
          class="form-control"
          name="password"
          placeholder="password"
        />
      </div>
			<div class="form-group">
          <button class="btn" :disabled="loading" type="submit">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Login</span>
          </button>
        </div>
		</form>
</div>
</template>

<script>
export default {
  layout: 'login',
    middleware: 'guest',
  components: {

  },

  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false,
            message: ''
    }
  },

  methods: {
    async login() {
      try {
        let response = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        console.log(response)
        console.log(this.$auth.Loggedin)
        this.$router.push('/dashboard')
      } catch (e) {
        this.error = e
        //console.log(e)
      }
    }
  }
}
</script>
<style scoped>

@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 200;
  src: local('Source Sans Pro ExtraLight'), local('SourceSansPro-ExtraLight'), url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3i94_wlxdr.ttf) format('truetype');
}
@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 300;
  src: local('Source Sans Pro Light'), local('SourceSansPro-Light'), url(https://fonts.gstatic.com/s/sourcesanspro/v13/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdr.ttf) format('truetype');
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
}
.alert-container{
  width: 300px;
   margin: 0 auto 10px auto;
}
form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
form input {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 300px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 18px;
  color: white;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
  font-weight: 300;
}
form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
form input:focus {
  background-color: white;
  width: 300px;
  color: #FF5722;
}
form button {
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: #FF5722;
  border-radius: 3px;
  width: 300px;
  cursor: pointer;
  font-size: 18px;
  -webkit-transition-duration: 0.25s;
          transition-duration: 0.25s;
}
form button:hover {
  background-color: #f5f7f9;
}
button{
  margin: 0 auto 10px auto;
}
.alert {
  margin: 0 auto 10px auto !important;
}
</style>
