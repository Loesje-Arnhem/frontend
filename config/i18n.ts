import { Options } from '@nuxtjs/i18n/types'
import { baseUrl } from '../data/siteDetails'

const config: Options = {
  baseUrl,
  defaultLocale: 'nl',
  lazy: true,
  langDir: 'locales/',
  locales: [
    {
      name: 'Nederlands',
      code: 'nl',
      iso: 'nl',
      file: 'nl.json',
    },
  ],
  vueI18nLoader: true,
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
    dateTimeFormats: {
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
}

export default config

// i18n: {
//   baseUrl: "https://nordgarden.info",
//   strategy: "prefix_except_default",
//   defaultLocale: "en",
//   locales: [
//     {
//       code: "en",
//       iso: "en-US",
//     },
//   ],
//   vueI18n: {
//     legacy: false,
//     messages: {
//       en,
//     },
//     datetimeFormats: {
//       en: {
//         short: {
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         },
//         long: {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//           weekday: "short",
//           hour: "numeric",
//           minute: "numeric",
//         },
//       },
//     },
//   },
// },
