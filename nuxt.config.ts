import {
  categories,
  themeColor,
  baseUrl,
  facebook,
  backgroundColor,
  title,
  twitter,
} from './data/siteDetails'
import getAllRoutes from './data/routes'

export default defineNuxtConfig({
  site: {
    url: baseUrl,
    name: title,
  },

  image: {
    densities: [1, 2, 3],
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['search'].includes(tag),
    },
  },

  runtimeConfig: {
    newsletter: {
      api_key: '',
      list: {
        products: '',
        website: '',
      },
    },
    woocommerce: {
      consumerKey: '',
      consumerSecret: '',
    },
    public: {
      apiUrl: '',
    },
  },

  experimental: {
    headNext: true,
    componentIslands: true,
    payloadExtraction: true,
  },

  apollo: {
    clients: {
      default: {
        inMemoryCacheOptions: {
          typePolicies: {
            GraphQlConfigurationOption: {
              keyFields: ['id'],
            },
          },
        },
        httpEndpoint: `${process.env.NUXT_PUBLIC_API_URL}graphql`,
      },
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        isolatedModules: true,
        esModuleInterop: true,
        types: [
          '@types/body-scroll-lock',
          'vite-plugin-pwa/client',
          '@types/rss',
        ],
      },
    },
    strict: true,
  },

  nitro: {
    preset: 'netlify_builder',
    prerender: {
      interval: 3000,
      concurrency: 20,
      routes: ['/rss.xml', '/rss-posters.xml'],
    },
  },

  hooks: {
    async 'nitro:config'(nitroConfig) {
      if (nitroConfig.dev) {
        return
      }
      if (process.env.NUXT_SSR === 'false') {
        return
      }
      const pages = await getAllRoutes()
      if (nitroConfig?.prerender?.routes) {
        nitroConfig.prerender.routes.push(...pages)
      }
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/doe-mee/doe-mee': { ssr: false },
    '/posters/posters/favorieten': { ssr: false },
  },

  build: {
    transpile: ['tslib']
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

        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black',
        },
        { name: 'apple-mobile-web-app-title', content: title },
        { name: 'theme-color', content: themeColor },
        { property: 'og:site_name', content: title },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: twitter },
        { name: 'twitter:creator', content: twitter },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          href: '/icons/manifest-icon-512.maskable.png',
          sizes: '512x512',
        },
        {
          rel: 'dns-prefetch',
          href: process.env.NUXT_PUBLIC_API_URL,
        },
        {
          rel: 'icon',
          href: '/favicon.svg',
          type: 'image/svg+xml',
        },
        {
          type: 'application/atom+xml',
          rel: 'alternate',
          href: `/rss.xml`,
          title: 'Nieuws - Loesje',
        },
        {
          type: 'application/atom+xml',
          rel: 'alternate',
          href: `/rss-posters.xml`,
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
      // '~/components/Carousel',
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
      // '~/components/Shop/Checkout',
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
  },

  modules: [
    '@nuxtjs/i18n',
    'nuxt-svgo',
    '@vite-pwa/nuxt',
    '@nuxtjs/apollo',
    '@nuxtjs/eslint-module',
    // '@nuxtjs/stylelint-module',
    '@nuxt/image',
    'nuxt-schema-org',
  ],

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

  pwa: {
    strategies: 'generateSW',
    registerWebManifestInRouteRules: true,
    registerType: 'autoUpdate',
    workbox: {
      // Only precache these files - html should be excluded
      // globPatterns: ['**/*.{js,css}'],

      // Don't fallback on document based (e.g. `/some-page`) requests
      // Even though this says `null` by default, I had to set this specifically to `null` to make it work
      navigateFallback: null,
    },
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
      // start_url: `/posters?standalone=true`,
      shortcuts: [
        {
          name: 'Favorieten',
          short_name: 'Favorieten',
          url: `./posters/favorieten?standalone=true`,
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
      protocol_handlers: [
        {
          protocol: 'web+loesje',
          url: '/posters%s',
        },
      ],
    },
  },

  devtools: {
    enabled: true,
  },
})
