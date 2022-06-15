import {
  title,
  categories,
  twitter,
  themeColor,
  backgroundColor,
  baseUrl,
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
    icons: [
      {
        src: '/icons/manifest-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/manifest-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    // display_override: ['window-controls-overlay'],
    start_url: `${baseUrl}/posters?standalone=true`,
    id: `${baseUrl}/posters?standalone=true`,
    shortcuts: [
      {
        name: 'Favorieten',
        short_name: 'Favorieten',
        url: `${baseUrl}/posters/favorieten?standalone=true`,
        icons: [{ src: '/icon.png', sizes: '512x512' }],
      },
    ],
    // protocol_handlers: [
    //   {
    //     protocol: 'web+loesje',
    //     url: './posters/%s',
    //   },
    // ],
  },
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
    importScripts: ['./assets/badge.js'],
  },
}
