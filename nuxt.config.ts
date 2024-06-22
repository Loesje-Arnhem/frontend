import {
  categories,
  themeColor,
  facebook,
  backgroundColor,
  title,
  twitter,
} from './data/siteDetails'

export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => ['search'].includes(tag),
    },
  },

  image: {
    densities: [1, 2],
    domains: ['shop.loesje.nl', 'i3.ytimg.com'],
  },

  runtimeConfig: {
    postcode: {
      api: {
        secret: '',
        key: '',
      },
    },
    woocommerce: {
      consumerKey: '',
      consumerSecret: '',
    },
    newsletter: {
      api_key: '',
      list: {
        products: '',
        website: '',
      },
    },
    public: {
      apiUrl: '',
      includeShop: false,
    },
  },

  sitemap: {
    sitemaps: {
      posts: {
        sources: ['/api/sitemap/posts'],
      },
      posters: {
        sources: ['/api/sitemap/posters'],
      },
      pages: {
        sources: ['/api/sitemap/pages'],
      },
      // products: {
      //   sources: ['/api/sitemap/product'],
      // },
      // 'product-categories': {
      //   sources: ['/api/sitemap/product_cat'],
      // },
    },
  },

  experimental: {
    headNext: true,
    componentIslands: true,
    payloadExtraction: true,
    typedPages: true,
    sharedPrerenderData: true,
    appManifest: true,
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
    preset: 'netlify',
    prerender: {
      interval: 3000,
      concurrency: 5,
    },

    storage: {
      redis: {
        driver: 'netlifyBlobs',
        name: 'loesje',
        siteID: process.env.NETLIFY_SITE_ID,
        token: process.env.NETLIFY_TOKEN,
      },
    },
  },

  routeRules: {
    '/rss': {
      headers: {
        'content-type': 'text/xml',
      },
      prerender: true,
    },
    '/rss/posters': {
      headers: {
        'content-type': 'text/xml',
      },
      prerender: true,
    },
    '/winkeltje/**': {
      appMiddleware: ['cart'],
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
          rel: 'icon',
          href: '/favicon.svg',
          type: 'image/svg+xml',
        },
        {
          type: 'application/atom+xml',
          rel: 'alternate',
          href: `/rss`,
          title: 'Loesje - Nieuws',
        },
        {
          type: 'application/atom+xml',
          rel: 'alternate',
          href: `/rss/posters`,
          title: 'Loesje - Posters',
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
      '~/components/Forms/Forms',
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
    defaultLocale: 'nl',
    lazy: true,
    langDir: 'locales',
    baseUrl: 'https://www.loesje.nl/',
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
    '@nuxt/eslint',
    // '@nuxtjs/stylelint-module',
    '@nuxt/image',
    'nuxt-schema-org',
    '@nuxtjs/sitemap',
  ],

  postcss: {
    plugins: {
      'postcss-mixins': {
        mixinsDir: './assets/css/mixins/',
      },

      'postcss-preset-env': {
        browsers: 'last 2 versions',
        stage: 4,

        features: {
          'nesting-rules': true,
          'custom-media-queries': true,
          'media-query-ranges': true,
        },
      },
    },
  },
  eslint: {
    config: {
      stylistic: true, // <---
    },
  },

  pwa: {
    strategies: 'generateSW',
    registerWebManifestInRouteRules: true,
    registerType: 'autoUpdate',
    workbox: {
      importScripts: ['/badge.js'],
      globPatterns: ['**/*.{js,css,png,jpg,svg,ico,avif,webp,woff2}'],
      // Only precache these files - html should be excluded
      // globPatterns: ['**/*.{js,css}'],

      // Don't fallback on document based (e.g. `/some-page`) requests
      // Even though this says `null` by default, I had to set this specifically to `null` to make it work
      // navigateFallback: '/',
      // globPatterns: ['**/*.{js,css,html,json,svg,webp,avif,png}'],
    },
    manifest: {
      background_color: backgroundColor,
      theme_color: themeColor,
      categories,
      lang: 'nl',
      name: title,
      orientation: 'portrait-primary',
      description:
        'Loesje\'s posters vind je overal. Met haar positief-kritische teksten wil ze de wereld beter en mooier maken. Dat moet je niet overlaten aan bazen, politici of ouders. Door haar posters op straat en online te verspreiden, geeft Loesje de wereld een zetje in de goede richting.',
      short_name: title,
      edge_side_panel: {},
      dir: 'ltr',
      icons: [
        {
          src: '/icons/manifest-icon-192.maskable.png',
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
          src: '/icons/manifest-icon-512.maskable.png',
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
      // start_url: `/posters?standalone=true`,
      shortcuts: [
        {
          name: 'Favorieten',
          short_name: 'Favorieten',
          url: `./posters/favorieten?standalone=true`,
          icons: [{ src: '/icon.png', sizes: '512x512' }],
        },
      ],
      // screenshots: [
      //   {
      //     src: '/screenshots/screenshot-1-wide.png',
      //     sizes: '1280x800',
      //     type: 'image/png',
      //     platform: 'wide',
      //     label:
      //       'Met deze app kan je lekker door al haar posters heen kuieren. Gewoon doelloos rondneuzen of heel gericht zoeken.',
      //   },
      //   {
      //     src: '/screenshots/screenshot-2-wide.png',
      //     sizes: '1280x800',
      //     type: 'image/png',
      //     platform: 'wide',
      //     label: 'Alle uitspraken van Loesje zijn hier te vinden.',
      //   },
      //   {
      //     src: '/screenshots/screenshot-1-narrow.png',
      //     sizes: '750x1334',
      //     type: 'image/png',
      //     platform: 'narrow',
      //     label:
      //       'Met deze app kan je lekker door al haar posters heen kuieren. Gewoon doelloos rondneuzen of heel gericht zoeken.',
      //   },
      //   {
      //     src: '/screenshots/screenshot-1-narrow.png',
      //     sizes: '750x1334',
      //     type: 'image/png',
      //     platform: 'narrow',
      //     label: 'Alle uitspraken van Loesje zijn hier te vinden.',
      //   },
      // ],
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
