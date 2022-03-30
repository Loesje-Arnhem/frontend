import apollo from './config/apollo'
import build from './config/build'
import buildModules from './config/buildModules'
import cache from './config/cache'
import components from './config/components'
import css from './config/css'
import googleFonts from './config/googleFonts'
import head from './config/head'
import i18n from './config/i18n'
import image from './config/image'
import loaders from './config/loaders'
import loading from './config/loading'
import modern from './config/modern'
import modules from './config/modules'
import plugins from './config/plugins'
import pwa from './config/pwa'
import render from './config/render'
import server from './config/server'
import version from './config/version'

export default {
  apollo,
  build,
  buildModules,
  cache,
  components,
  css,
  googleFonts,
  head,
  i18n,
  image,
  loaders,
  loading,
  modern,
  modules,
  plugins,
  pwa,
  render,
  server,
  target: 'static',
  generate: {
    concurrency: 20,
    interval: 10000,
    exclude: [
      /^\/mijn-account/, // path starts with /admin
      /^\/winkeltje/, // path starts with /admin
      /^\/shop/, // path starts with /admin
      /^\/account/, // path starts with /admin
      /^\/posters/, // path starts with /admin
      /^\/posts/, // path starts with /admin
      /^\/over-loesje/, // path starts with /admin
    ],
  },
  version,
  // serverMiddleware: {
  //   '/_ipx': '~/server/middleware/ipx.js',
  // },

  auth: {
    strategies: {
      graphql: {
        scheme: '~/schemes/graphqlSchemes.js',
      },
    },
    redirect: {
      login: '/winkeltje/inloggen',
      logout: '/winkeltje/inloggen?logout=true',
      callback: false,
      home: '/winkeltje/mijn-account',
    },
  },
}
