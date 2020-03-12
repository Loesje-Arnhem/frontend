import pkg from './package'

export default {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
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
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

      {
        href:
          'https://fonts.googleapis.com/css?family=Ubuntu:400,700&display=swap',
        rel: 'stylesheet',
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/styles/base.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-youtube',
    '~/plugins/axios',
    '~/plugins/vuelidate',
    { src: '~/plugins/houdini', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    'nuxt-svg-loader',
    '@nuxtjs/axios',
    '@nuxtjs/apollo',
    '@nuxtjs/auth',
    'nuxt-i18n',
  ],
  buildModules: ['@nuxtjs/stylelint-module'],
  manifest: {
    name: 'Loesje',
    background_color: '#000',
    theme_color: '#000',
    short_name: 'Loesje',
  },
  i18n: {
    defaultLocale: 'nl',
    lazy: true,
    langDir: 'locales/',
    locales: [
      {
        name: 'Nederlands',
        code: 'nl',
        iso: 'nl-NL',
        file: 'nl.json',
      },
    ],
    vueI18nLoader: true,
    vueI18n: {
      dateTimeFormats: {
        nl: {
          short: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
          long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
          },
        },
      },
    },
  },
  loaders: {
    cssModules: {
      localIdentName: '[local]_[hash:base64:5]',
    },
  },
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
          exclude: /(node_modules)/,
        })
      }
    },
    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining'],
    },
    loaders: {
      cssModules: {
        modules: {
          // this is where you can alter the generated class names:
          localIdentName: '[local]-[hash:base64:4]',
        },
      },
    },
    postcss: {
      plugins: {
        'postcss-mixins': {
          mixinsDir: './styles/mixins/',
        },
        'postcss-preset-env': {
          importFrom: ['./styles/media-queries/media-queries.css'],

          features: {
            'nesting-rules': true,
            'custom-media-queries': true,
            'media-query-ranges': true,
          },
        },
      },
    },
  },
  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: '@/plugins/apollo-config.js',
    },
  },
  generate: {
    fallback: true,
  },
}
