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
      type: 'memory',

      // maximum number of pages to store in memory
      // if limit is reached, least recently used page
      // is removed.
      max: 100,

      // number of seconds to store this page in cache
      ttl: 60,
    },
  },
  version: pkg.version,
}
