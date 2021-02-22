import Vue from 'vue'
import VueAnnouncer from '@vue-a11y/announcer'

export default ({ app }) => {
  Vue.use(
    VueAnnouncer,
    {
      complementRoute: 'is geladen',
    },
    app.router,
  )
}
