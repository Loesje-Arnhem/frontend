import { routes } from "vue-router/auto-routes";
import {
  categories,
  themeColor,
  facebook,
  backgroundColor,
  title,
  twitter,
} from "./app/data/siteDetails";
import { ofetch } from "ofetch";

export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) =>
        ["search", "clubcollect-widget"].includes(tag),
    },
  },

  image: {
    domains: ["shop.loesje.nl", "i3.ytimg.com"],
  },

  runtimeConfig: {
    postcode: {
      api: {
        secret: "",
        key: "",
      },
    },
    woocommerce: {
      consumerKey: "",
      consumerSecret: "",
    },
    newsletter: {
      api_key: "",
      list: {
        products: "",
        website: "",
      },
    },
    public: {
      apiUrl: "",
      includeShop: false,
    },
  },

  sitemap: {
    sitemaps: {
      posts: {
        sources: ["/api/sitemap/posts"],
      },
      posters: {
        sources: ["/api/sitemap/posters"],
      },
      pages: {
        sources: ["/api/sitemap/pages"],
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
          "@types/body-scroll-lock",
          "vite-plugin-pwa/client",
          "@types/rss",
        ],
      },
    },
    strict: true,
  },

  nitro: {
    preset: "netlify",
    prerender: {
      interval: 3000,
      concurrency: 5,
      routes: ["/rss", "/rss/posters", "/posters", "/"],
    },
    storage: {
      cache: {
        driver: "netlify-blobs",
        name: "cache",
      },
    },
  },

  routeRules: {
    "/rss": {
      headers: {
        "content-type": "text/xml",
      },
    },
    "/rss/posters": {
      headers: {
        "content-type": "text/xml",
      },
    },
    "/winkeltje/**": {
      appMiddleware: ["cart"],
    },
  },

  telemetry: false,

  app: {
    head: {
      meta: [
        {
          name: "og:publisher",
          content: facebook,
        },
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1,viewport-fit=cover",
        },

        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black",
        },
        { name: "apple-mobile-web-app-title", content: title },
        { name: "theme-color", content: themeColor },
        { property: "og:site_name", content: title },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: twitter },
        { name: "twitter:creator", content: twitter },
      ],
      link: [
        {
          rel: "apple-touch-icon",
          href: "/icons/manifest-icon-512.maskable.png",
          sizes: "512x512",
        },
        {
          rel: "icon",
          href: "/favicon.svg",
          type: "image/svg+xml",
        },
        {
          type: "application/atom+xml",
          rel: "alternate",
          href: `/rss`,
          title: "Loesje - Nieuws",
        },
        {
          type: "application/atom+xml",
          rel: "alternate",
          href: `/rss/posters`,
          title: "Loesje - Posters",
        },
        {
          type: "application/opensearchdescription+xml",
          rel: "search",
          href: "/opensearch.xml",
          title: "Loesje",
        },
      ],
    },
  },
  hooks: {
    async "prerender:routes"(ctx: { routes: Set<string> }) {
      const PAGESIZE = 20;
      // const PAGESIZE = 99
      const FETCH_TIMEOUT = 0;

      const pauseFetching = () => {
        return new Promise((resolve) => {
          setTimeout(resolve, FETCH_TIMEOUT);
        });
      };
      const fetchPagesByType = async (type: string) => {
        let hasNextPage = true;
        let page = 1;
        const baseUrl = process.env.NUXT_PUBLIC_API_URL as string;

        while (hasNextPage) {
          const apiUrl = `${baseUrl}wp-json/wp/v2/${type}/?_fields[]=link&per_page=${PAGESIZE}&page=${[
            page,
          ]}&status=publish`;
          const response = await ofetch
            .raw(apiUrl)
            .catch((error) => error.data);
          const totalPages = Number(response.headers.get("X-WP-TotalPages"));

          let suffix = "/";
          if (type === "posts") {
            suffix = `/over-loesje/nieuws/`;
          }

          response._data.forEach((r: { link: string }) => {
            const url = r.link.replace(baseUrl, suffix);
            ctx.routes.add(url);
          });

          if (page >= totalPages) {
            hasNextPage = false;
          } else if (page > 5 && type === "posters") {
            hasNextPage = false;
          }

          page = page + 1;
          pauseFetching();
        }
      };
      // await fetchPagesByType("posts");
      await fetchPagesByType("pages");
      // await fetchPagesByType("posters");
    },
  },

  components: {
    dirs: [
      "~/components/Animations",
      "~/components/AppStores",
      "~/components/BecomeMember",
      "~/components/Blocks",
      // '~/components/Carousel',
      "~/components/Footer",
      "~/components/ClubCollect",
      "~/components/Forms/Fields",
      "~/components/Forms/Forms",
      "~/components/Forms",
      "~/components/Layout",
      "~/components/LoadMore",
      "~/components/Menu/MainNavigation",
      "~/components/Menu",
      "~/components/Pages/RelatedPages",
      "~/components/Pages",
      "~/components/Posters/AutoComplete",
      "~/components/Posters/Details",
      "~/components/Posters/Filters",
      "~/components/Posters/PostersOverview",
      "~/components/Posters/RelatedPosters",
      "~/components/Posters/Shared",
      "~/components/Posters/Tags",
      "~/components/Posters",
      "~/components/Posts/LatestPosts",
      "~/components/Posts/Overview",
      "~/components/Posts/Shared",
      "~/components/Posts",
      "~/components/Shared",
      "~/components/Shop/Cart",
      "~/components/Shop/Checkout",
      "~/components/Shop/Layout",
      "~/components/Shop/Products/ProductDetails",
      "~/components/Shop/Products/RelatedProducts",
      "~/components/Shop/Products/Shared",
      "~/components/Shop/Products",
      "~/components/Shop",
      "~/components/Wrappers",
      "~/components",
    ],
  },

  css: ["~/assets/css/base.css"],

  i18n: {
    defaultLocale: "nl",
    baseUrl: "https://www.loesje.nl/",
    locales: [
      {
        language: "nl-NL",
        code: "nl",
        file: "nl.json",
      },
    ],
    experimental: {
      strictSeo: true,
    },
  },

  modules: [
    "@nuxtjs/i18n",
    "nuxt-svgo",
    "@vite-pwa/nuxt",
    "@nuxt/eslint", // "@nuxtjs/stylelint-module",
    "@nuxt/image",
    "nuxt-schema-org",
    "@nuxtjs/sitemap",
    "@nuxt/scripts",
  ],
  stylelint: {
    lintOnStart: false,
  },
  postcss: {
    plugins: {
      "postcss-mixins": {
        mixinsDir: "./app/assets/css/mixins/",
      },

      "postcss-preset-env": {
        browsers: "last 2 versions",
        stage: 4,

        features: {
          "nesting-rules": true,
          "custom-media-queries": true,
          "media-query-ranges": true,
        },
      },
      autoprefixer: {},
      cssnano: {},
    },
  },
  pwa: {
    // devOptions: {
    //   enabled: true,
    // },

    base: "/",
    client: {},
    strategies: "generateSW",
    registerWebManifestInRouteRules: true,
    registerType: "autoUpdate",
    workbox: {
      navigateFallback: null,
      globPatterns: ["**/*.{js,css,woff2}"],
      globIgnores: ["**/_payload.json"],
      runtimeCaching: [
        {
          urlPattern: ({ request }) => request.destination === "image",
          handler: "CacheFirst",
          options: {
            cacheName: "images",
            // expiration: {
            //   maxEntries: 50,
            //   purgeOnQuotaError: true,
            //   // maxAgeSeconds: 60 * 60 * 24 * 7,
            // },
          },
        },
        {
          urlPattern: ({ request }) => request.destination === "document",
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "document",
            // expiration: {
            //   maxEntries: 50,
            //   purgeOnQuotaError: true,
            //   // maxAgeSeconds: 60 * 60 * 24 * 7,
            // },
          },
        },
        {
          urlPattern: ({ url }) => url.href.includes("_payload.json"),
          handler: "CacheFirst",
          options: {
            cacheName: "json",
            // expiration: {
            //   maxEntries: 50,
            //   purgeOnQuotaError: true,
            //   // maxAgeSeconds: 60 * 60 * 24 * 7,
            // },
          },
        },
        {
          urlPattern: ({ url }) => url.href.endsWith("messages.json"),
          handler: "CacheFirst",
          options: {
            cacheName: "i18n",
            // expiration: {
            //   maxEntries: 50,
            //   purgeOnQuotaError: true,
            //   // maxAgeSeconds: 60 * 60 * 24 * 7,
            // },
          },
        },
      ],
    },
    // workbox: {
    // },
    // workbox: {
    //   importScripts: ["/badge.js"],
    //   globPatterns: ["**/*.{js,css,png,jpg,svg,ico,avif,webp,woff2}"],
    //   // Only precache these files - html should be excluded
    //   // globPatterns: ['**/*.{js,css}'],

    //   // Don't fallback on document based (e.g. `/some-page`) requests
    //   // Even though this says `null` by default, I had to set this specifically to `null` to make it work
    //   // navigateFallback: '/',
    //   // globPatterns: ['**/*.{js,css,html,json,svg,webp,avif,png}'],
    // },
    manifest: {
      id: "loesje",
      background_color: backgroundColor,
      theme_color: themeColor,
      categories,
      lang: "nl",
      name: title,
      orientation: "portrait-primary",
      description:
        "Loesje's posters vind je overal. Met haar positief-kritische teksten wil ze de wereld beter en mooier maken. Dat moet je niet overlaten aan bazen, politici of ouders. Door haar posters op straat en online te verspreiden, geeft Loesje de wereld een zetje in de goede richting.",
      short_name: title,
      edge_side_panel: {},
      dir: "ltr",
      icons: [
        {
          src: "/icons/manifest-icon-192.maskable.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/manifest-icon-192.maskable.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/icons/manifest-icon-512.maskable.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/manifest-icon-512.maskable.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      // display_override: ['window-controls-overlay'],
      start_url: "/",
      shortcuts: [
        {
          name: "Favorieten",
          short_name: "Favorieten",
          url: `./posters/favorieten?standalone=true`,
          icons: [{ src: "/icon.png", sizes: "512x512" }],
        },
      ],
      prefer_related_applications: false,
      related_applications: [
        {
          platform: "itunes",
          url: "https://apps.apple.com/nl/app/loesje-posters/id910472463?l=nl&amp;ls=1",
          id: "loesje-posters",
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

      protocol_handlers: [
        {
          protocol: "web+loesje",
          url: "/posters%s",
        },
      ],
    },
  },

  devtools: {
    enabled: true,
  },
  compatibilityDate: "2025-08-03",
});
