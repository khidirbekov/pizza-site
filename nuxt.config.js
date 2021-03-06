export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Pizza',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Pizza - сеть пиццерий' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vuesax/dist/vuesax.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuesax',
    '@/plugins/vue-mask'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.VUE_APP_TARGET
  },

  env: {
    baseURL: process.env.VUE_APP_TARGET
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router: {
    middleware: ['cookies']
  }
}
