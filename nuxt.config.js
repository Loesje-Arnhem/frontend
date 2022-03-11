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
    pages: [/^\/$/],
    store: {
      type: 'redis',
      host: 'localhost',
      ttl: 10 * 60,
      configure: [
        // these values are configured
        // on redis upon initialization
        ['maxmemory', '200mb'],
        ['maxmemory-policy', 'allkeys-lru'],
      ],
    },
  },
  version: pkg.version,
  serverMiddleware: {
    '/_ipx': '~/server/middleware/ipx.js',
  },
}
