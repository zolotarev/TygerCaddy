include('./run.js');


module.exports = {
  server: {
    port: 3001, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  plugins: [
    "~/plugins/vee-validate.js",
    "~plugins/vuelidate.js"
  ],
  build: {
    transpile: ["vee-validate/dist/rules", "vuelidate"],
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['nuxt-env', {
      keys: [{
          key: 'BASE_API_URL',
          default: 'http://localhost:3000'
        } // Specify a default value
      ]
    }]
  ],
  buildModules: [
    // Simple usage
    //'@nuxtjs/vuetify',
    // With options
    ['@nuxtjs/vuetify', {
      /* module options */
    }]
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post'
          },
          user: {
            url: '/user/me',
            method: 'get',
            propertyName: ''
          },
          refresh: false,
          logout: false
        },
        user: {
          property: '',
          autoFetch: true
        },
        token: {
          property: 'token',
          maxAge: 1800,
          // type: 'Bearer'
        },
        autoLogout: true
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/dashboard',
      home: '/dashboard'
    }
  },
};
