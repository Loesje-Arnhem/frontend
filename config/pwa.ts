import { url } from '@vuelidate/validators'
import {
  title,
  categories,
  twitter,
  themeColor,
  backgroundColor,
  baseUrl,
  apiUrl,
} from './../data/siteDetails'

// PWA module configuration: https://go.nuxtjs.dev/pwa
export default {
  manifest: false,
  icon: false,
  meta: {
    appleStatusBarStyle: 'black',
    mobileApp: true,
    mobileAppIOS: true,
    twitterCard: 'summary',
    twitterCreator: twitter,
    twitterSite: twitter,
    viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  },
  workbox: {
    importScripts: ['/badge.js'],

    runtimeCaching: [
      {
        urlPattern: `${apiUrl}.*`,
      },
    ],
  },
}
