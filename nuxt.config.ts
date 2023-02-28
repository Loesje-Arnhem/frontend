// import { defineNuxtConfig } from 'nuxt/config'
import apollo from './config/apollo'
// import auth from './config/auth'
// import build from './config/build'
// import buildModules from './config/buildModules'
import components from './config/components'
import css from './config/css'
// // import generate from './config/generate'
// import head from './config/head'
import i18n from './config/i18n'
// import image from './config/image'
// import loaders from './config/loaders'
// import loading from './config/loading'
// import modern from './config/modern'
// import modules from './config/modules'
// import plugins from './config/plugins'
// import pwa from './config/pwa'
// import render from './config/render'
// import server from './config/server'
// import target from './config/target'

export default defineNuxtConfig({
  apollo,
  // @ts-ignore
  // auth,
  // build,
  // buildModules,
  components: {
    dirs: [
      '~/components/Animations',
      '~/components/AppStores',
      '~/components/BecomeMember',
      '~/components/Blocks',
      '~/components/Carousel',
      '~/components/Footer',
      '~/components/Forms/Fields',
      '~/components/Forms',
      '~/components/Layout',
      '~/components/LoadMore',
      '~/components/Menu/MainNavigation',
      '~/components/Menu',
      '~/components/Pages/RelatedPages',
      '~/components/Pages',
      '~/components/Posters/AutoComplete',
      '~/components/Posters/Details',
      '~/components/Posters/Filters',
      '~/components/Posters/PostersOverview',
      '~/components/Posters/RelatedPosters',
      '~/components/Posters/Shared',
      '~/components/Posters/Tags',
      '~/components/Posters',
      '~/components/Posts/LatestPosts',
      '~/components/Posts/Overview',
      '~/components/Posts/Shared',
      '~/components/Posts',
      '~/components/Shared',
      '~/components/Shop',
      '~/components/Shop/Cart',
      '~/components/Shop/Checkout',
      '~/components/Shop/Layout',
      '~/components/Shop/Products/ProductDetails',
      '~/components/Shop/Products/ProductList',
      '~/components/Shop/Products/RelatedProducts',
      '~/components/Shop/Products/Shared',
      '~/components/Shop/Products',
      '~/components/Wrappers',
      '~/components',
    ],
  },
  css,
  // // @ts-ignore
  // // generate,
  // head,
  i18n,
  // image,
  // loaders,
  // loading,
  // modern,
  // modules,
  // plugins,
  // pwa,
  // render,
  // server,
  // target,
  modules: ['@nuxtjs/i18n', '@nuxtjs/apollo'],
})
