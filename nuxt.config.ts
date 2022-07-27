import { NuxtConfig } from '@nuxt/types'
import apollo from './config/apollo'
import auth from './config/auth'
import build from './config/build'
import buildModules from './config/buildModules'
import components from './config/components'
import css from './config/css'
import generate from './config/generate'
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
import target from './config/target'

const config: NuxtConfig = {
  apollo,
  auth,
  build,
  buildModules,
  components,
  css,
  generate,
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
  target,
}

export default config
