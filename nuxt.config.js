import pkg from './package.json'
import apollo from './config/apollo'
import build from './config/build'
import buildModules from './config/buildModules'
import components from './config/components'
import css from './config/css'
import env from './config/env'
import generate from './config/generate'
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
import server from './config/server'

export default {
  apollo,
  build,
  buildModules,
  components,
  css,
  env,
  generate,
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
  server,
  render: {
    // Setting up cache for 'static' directory - a year in milliseconds
    // https://web.dev/uses-long-cache-ttl
    static: {
      maxAge: 60 * 60 * 24 * 365 * 1000,
    },
  },

  cache: {
    useHostPrefix: true,
    pages: ['/'],
    key(route) {
      if (route === '/') {
        return 'page:home:string'
      }
      let page = route.substr(1).split('/')
      page = page.join('.')
      return `page:${page}:string`
    },
    store: {
      type: 'memory',
      max: 100,
      ttl: 60 * 10,
    },
  },
  version: pkg.version,
  serverMiddleware: {
    '/_ipx': '~/server/middleware/ipx.js',
  },
}
