module.exports = {
  server: {
    port: 3001, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
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
  ],
  buildModules: [
    // Simple usage
    //'@nuxtjs/vuetify',
    // With options
    ['@nuxtjs/vuetify', {
      /* module options */
    }]
  ],
  axios: {
    baseURL: this.publicRuntimeConfig.baseURL
  },

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
