import { baseUrl, facebook, apiUrl } from './data/siteDetails'

export default defineNuxtConfig({
  apollo: {
    clients: {
      default: {
        httpEndpoint: `${apiUrl}graphql`,
      },
    },
  },
  nitro: {
    prerender: {
      ignore: '/posters/',
    },
  },
  telemetry: false,
  app: {
    head: {
      meta: [
        {
          name: 'og:publisher',
          content: facebook,
        },
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1,viewport-fit=cover',
        },
      ],
      link: [
        {
          rel: 'dns-prefetch',
          href: apiUrl,
        },
        {
          rel: 'icon',
          href: '/favicon.svg',
          type: 'image/svg+xml',
        },
        {
          type: 'application/atom+xml',
          rel: 'alternate',
          href: `${apiUrl}feed/`,
          title: 'Nieuws - Loesje',
        },
        {
          type: 'application/atom+xml',
          rel: 'alternate',
          href: `${apiUrl}feed/?post_type=poster&source=landelijke-serie`,
          title: 'Posters - Loesje',
        },
        {
          type: 'application/opensearchdescription+xml',
          rel: 'search',
          href: '/opensearch.xml',
          title: 'Loesje',
        },
      ],
    },
  },

  components: {
    dirs: [
      '~/components/Animations',
      '~/components/AppStores',
      '~/components/BecomeMember',
      '~/components/Blocks',
      '~/components/Carousel',
      '~/components/Footer',
      '~/components/Forms/Fields',
      '~/components/Forms',
      '~/components/Layout',
      '~/components/LoadMore',
      '~/components/Menu/MainNavigation',
      '~/components/Menu',
      '~/components/Pages/RelatedPages',
      '~/components/Pages',
      '~/components/Posters/AutoComplete',
      '~/components/Posters/Details',
      '~/components/Posters/Filters',
      '~/components/Posters/PostersOverview',
      '~/components/Posters/RelatedPosters',
      '~/components/Posters/Shared',
      '~/components/Posters/Tags',
      '~/components/Posters',
      '~/components/Posts/LatestPosts',
      '~/components/Posts/Overview',
      '~/components/Posts/Shared',
      '~/components/Posts',
      '~/components/Shared',
      '~/components/Shop/Cart',
      '~/components/Shop/Checkout',
      '~/components/Shop/Layout',
      '~/components/Shop/Products/ProductDetails',
      '~/components/Shop/Products/ProductList',
      '~/components/Shop/Products/RelatedProducts',
      '~/components/Shop/Products/Shared',
      '~/components/Shop/Products',
      '~/components/Shop',
      '~/components/Wrappers',
      '~/components',
    ],
  },
  css: ['~/assets/css/base.css'],
  nitro: {
    preset: 'netlify',
  },
  i18n: {
    baseUrl,
    defaultLocale: 'nl',
    lazy: true,
    langDir: 'locales',
    locales: [
      {
        iso: 'nl-NL',
        code: 'nl',
        file: 'nl.json',
      },
    ],
    vueI18n: {
      numberFormats: {
        nl: {
          currency: {
            style: 'currency',
            currency: 'EUR',
            currencyDisplay: 'symbol',
          },
        },
      },
      datetimeFormats: {
        nl: {
          short: {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          },
          long: {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
          },
        },
      },
    },
  },
  modules: ['@nuxtjs/i18n', '@nuxtjs/apollo'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'postcss-url': {},
      cssnano: true,
      'postcss-mixins': {
        mixinsDir: './assets/css/mixins/',
      },

      'postcss-preset-env': {
        features: {
          'nesting-rules': true,
          'custom-media-queries': true,
          'media-query-ranges': true,
        },
      },
    },
  },
})
