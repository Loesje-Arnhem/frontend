import Vue from 'vue'
import VueAnnouncer from '@vue-a11y/announcer'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(({ app }) => {
  Vue.use(
    VueAnnouncer,
    {
      complementRoute: 'is geladen',
    },
    app.router,
  )
})
