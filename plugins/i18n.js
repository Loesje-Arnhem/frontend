import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const dateTimeFormats = {
  nl: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    tour: {
      month: 'short',
      day: 'numeric'
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric'
    }
  }
}

export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'nl',
    messages: {
      nl: require('~/locales/nl.json')
    },
    dateTimeFormats
  })
}
