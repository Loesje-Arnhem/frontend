export default defineI18nConfig(() => ({
  legacy: false,
  locale: "nl",

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
}));
