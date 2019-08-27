import pkg from './package'
const baseUrl = 'https://api.loesje.michielkoning.nl/'

export default {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s | Loesje',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      {
        href:
          'https://fonts.googleapis.com/css?family=Ubuntu:400,700&display=swap',
        rel: 'stylesheet'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/styles/base.css'],
  router: {
    middleware: ['i18n'],
    scrollBehavior() {
      const dailyPostersHeight = document.querySelector('.poster-daily')
        .offsetHeight
      const scrollPosition = document.documentElement.scrollTop
      const scrollTo =
        scrollPosition > dailyPostersHeight
          ? dailyPostersHeight
          : scrollPosition

      return { x: 0, y: scrollTo }
    }
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/vue-youtube',
    '~/plugins/axios',
    '~/plugins/vuelidate',
    { src: '~/plugins/houdini', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    'nuxt-svg-loader',
    '@nuxtjs/axios',
    '@nuxtjs/apollo'
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    postcss: {
      plugins: {
        'postcss-mixins': {
          mixinsDir: './styles/mixins/'
        },
        'postcss-preset-env': {
          importFrom: ['./styles/media-queries/media-queries.css'],

          features: {
            'nesting-rules': true,
            'custom-media-queries': true,
            'media-query-ranges': true
          }
        }
      }
    }
  },
  apollo: {
    clientConfigs: {
      default: {
        // required
        httpEndpoint: `${baseUrl}graphql`
      }
    }
  }
}
