module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'TygerNuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  css: [

  ],
  script: [

  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-validate'
  ],
  module: {
    rules: [
        {
           test: /\.s[ac]ss$/i,
           use: ['style-loader','css-loader','sass-loader',],
         }
   ]
},
  plugins: [
    '@/plugins/axios'
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/users/login', method: 'post'},
          user: { url: '/users/me', method: 'get'},
          refresh: false,
          logout:false
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
      //callback: '/dashboard',
      home: '/dashboard'
    }
  },
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

