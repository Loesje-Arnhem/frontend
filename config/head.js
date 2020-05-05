import { twitterUrl } from './../data/socialMedia'
import { apiUrl, title } from './../data/siteDetails'
import splashscreens from './head/splashscreens'

/*
 ** Headers of the page
 */
export default {
  title,
  titleTemplate: '%s',
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, viewport-fit=cover',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      hid: 'og:site_name',
      name: 'og:site_name',
      content: title,
    },
    // Twitter Card
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:site',
      content: `@${twitterUrl}`,
    },
    {
      name: 'twitter:creator',
      content: `@${twitterUrl}`,
    },
  ],
  link: [
    ...splashscreens,
    {
      rel: 'dns-prefetch',
      href: apiUrl,
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
}
