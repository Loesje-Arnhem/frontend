import { twitterUrl } from './../../data/socialMedia'
import { title } from './../../data/siteDetails'

export default [
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
]
