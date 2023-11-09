// Global page headers: https://go.nuxtjs.dev/config-head
import { NuxtConfig } from '@nuxt/types'
import { facebook, apiUrl } from '../data/siteDetails'
import splashscreens from './splashscreens'

/*
 ** Headers of the page
 */
const config: NuxtConfig = {
  head: {
    titleTemplate: '%s',
    meta: [
      {
        hid: 'og:publisher',
        name: 'og:publisher',
        content: facebook,
      },
    ],

    link: [
      ...splashscreens,
      {
        hid: 'dns-prefetch:api',
        rel: 'dns-prefetch',
        href: apiUrl,
      },
      {
        hid: 'favicon:svg',
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        hid: 'rss:news',
        type: 'application/atom+xml',
        rel: 'alternate',
        href: `/rss.xml`,
        title: 'Nieuws - Loesje',
      },
      {
        hid: 'rss:posters',
        type: 'application/atom+xml',
        rel: 'alternate',
        href: `/rss-posters.xml`,
        title: 'Posters - Loesje',
      },
      {
        hid: 'search',
        type: 'application/opensearchdescription+xml',
        rel: 'search',
        href: '/opensearch.xml',
        title: 'Loesje',
      },
    ],
  },
}

export default config.head
