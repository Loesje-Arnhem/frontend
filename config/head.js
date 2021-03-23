// Global page headers: https://go.nuxtjs.dev/config-head
import { title, facebook, apiUrl } from './../data/siteDetails'

/*
 ** Headers of the page
 */
export default {
  title,
  titleTemplate: '%s - Loesje',
  meta: [
    {
      hid: 'og:publisher',
      name: 'og:publisher',
      content: facebook,
    },
  ],
  link: [
    {
      rel: 'dns-prefetch',
      href: apiUrl,
    },
    {
      href:
        'https://fonts.googleapis.com/css?family=Ubuntu:400,700&display=swap',
      rel: 'stylesheet',
    },
  ],
}
