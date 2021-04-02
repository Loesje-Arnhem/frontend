// Global page headers: https://go.nuxtjs.dev/config-head
import { facebook, apiUrl } from './../data/siteDetails'

/*
 ** Headers of the page
 */
export default {
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
  ],
}
