import { apiUrl } from './../../data/siteDetails'
import splashscreens from './splashscreens'

export default [
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
  {
    href: 'https://fonts.googleapis.com/css?family=Ubuntu:400,700&display=swap',
    rel: 'stylesheet',
  },
]
