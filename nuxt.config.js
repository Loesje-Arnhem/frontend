import axios from 'axios'
import pkg from './package'
const baseUrl = 'http://loesje.local/wp-json/'

export default {
  mode: 'universal',
  env: {
    baseUrl
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
        href: 'https://fonts.googleapis.com/css?family=Ubuntu:400,700&display=swap',
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
    middleware: ['i18n']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/i18n.js', '~/plugins/vue-youtube', '~/plugins/axios'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap',
    'nuxt-svg-loader',
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: baseUrl
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
  generate: {
    async routes() {
      const response = await axios.get(`${baseUrl}wp/v2/posts/?per_page=100`)
      const posts = response.data.map(post => post.slug)
      const urls = ['biography', ...posts]

      return urls
    }
  },
  sitemap: {
    hostname: 'https://loesje.local/',
    async routes() {
      const response = await axios.get(`${baseUrl}wp/v2/posts/?per_page=100`)
      return response.data.map(
        post => `https://loesje.local/${post.slug}`
      )
    }
  }
}
