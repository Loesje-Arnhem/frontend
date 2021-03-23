import { modules, buildModules } from './config/modules'
import apollo from './config/apollo'
import build from './config/build'
import css from './config/css'
import env from './config/env'
import generate from './config/generate'
import head from './config/head'
import i18n from './config/i18n'
import loaders from './config/loaders'
import loading from './config/loading'
import pwa from './config/pwa'
import plugins from './config/plugins'
import server from './config/server'
import components from './config/components'

export default {
  apollo,
  build,
  buildModules,
  css,
  env,
  generate,
  head,
  i18n,
  loaders,
  loading,
  pwa,
  modules,
  plugins,
  server,
  components,
  modern: 'client',
}
