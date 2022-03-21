import { baseUrl } from '../data/siteDetails'

export default {
  baseUrl,
  defaultLocale: 'nl',
  vuex: false,
  lazy: true,
  seo: false,
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
    silentFallbackWarn: true,
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
