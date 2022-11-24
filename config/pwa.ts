import { NuxtConfig } from '@nuxt/types'
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
const config: NuxtConfig = {
  pwa: {
    manifest: {
      background_color: backgroundColor,
      theme_color: themeColor,
      categories,
      lang: 'nl',
      name: title,
      orientation: 'portrait-primary',
      description:
        'Ook zo benieuwd wat Loesje allemaal al heeft gezegd? Met deze app kan je lekker door al haar posters heen kuieren.',
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
      display_override: ['window-controls-overlay'],
      start_url: './posters?standalone=true',
      id: './posters?standalone=true',
      scope: '/posters',
      shortcuts: [
        {
          name: 'Favorieten',
          short_name: 'Favorieten',
          url: `${baseUrl}/posters/favorieten?standalone=true`,
          icons: [{ src: '/icon.png', sizes: '512x512' }],
        },
      ],
      screenshots: [
        {
          src: '/screenshots/screenshot-1-wide.png',
          sizes: '1280x800',
          type: 'image/png',
          platform: 'wide',
          label:
            'Met deze app kan je lekker door al haar posters heen kuieren. Gewoon doelloos rondneuzen of heel gericht zoeken.',
        },
        {
          src: '/screenshots/screenshot-2-wide.png',
          sizes: '1280x800',
          type: 'image/png',
          platform: 'wide',
          label: 'Alle uitspraken van Loesje zijn hier te vinden.',
        },
        {
          src: '/screenshots/screenshot-1-narrow.png',
          sizes: '750x1334',
          type: 'image/png',
          platform: 'narrow',
          label:
            'Met deze app kan je lekker door al haar posters heen kuieren. Gewoon doelloos rondneuzen of heel gericht zoeken.',
        },
        {
          src: '/screenshots/screenshot-1-narrow.png',
          sizes: '750x1334',
          type: 'image/png',
          platform: 'narrow',
          label: 'Alle uitspraken van Loesje zijn hier te vinden.',
        },
      ],
      // android only
      // related_applications: [
      //   {
      //     platform: 'webapp',
      //     url: baseUrl,
      //   },
      // ],
      // protocol_handlers: [
      //   {
      //     protocol: 'web+loesje',
      //     url: './%s?standalone=true',
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
      // importScripts: ['/badge.js', '/update.js'],
      importScripts: ['/update.js'],
      runtimeCaching: [
        {
          urlPattern: `${apiUrl}.*`,
        },
      ],
    },
  },
}
export default config.pwa
