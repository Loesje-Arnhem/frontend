import {
  title,
  categories,
  twitter,
  themeColor,
  backgroundColor,
} from './../data/siteDetails'

// PWA module configuration: https://go.nuxtjs.dev/pwa
export default {
  manifest: {
    background_color: backgroundColor,
    theme_color: themeColor,
    categories,
    lang: 'nl',
    name: title,
    orientation: 'portrait-primary',
    short_name: title,
  },
  meta: {
    appleStatusBarStyle: 'black-translucent',
    mobileApp: true,
    mobileAppIOS: true,
    twitterCard: 'summary',
    twitterCreator: twitter,
    twitterSite: twitter,
    viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  },
  shortcuts: [
    {
      name: 'Posters',
      short_name: 'Posters',
      url: '/posters',
      icons: [{ src: '/icon.png', sizes: '512x512' }],
    },
    {
      name: 'Nieuws',
      short_name: 'Nieuws',
      url: '/over-mij/nieuws',
      icons: [{ src: '/icon.png', sizes: '512x512' }],
    },
  ],
}
