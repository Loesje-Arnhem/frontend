import { Context } from '@nuxt/types'

export default ({ route, app, redirect }: Context) => {
  if (route.query.standalone === 'true') {
    document.documentElement.classList.add('standalone')
  }
  window.addEventListener('DOMContentLoaded', () => {
    window.matchMedia('(display-mode: standalone)').addEventListener(
      'change',
      (event) => {
        if (event.matches) {
          const postersPath = app.localePath({ name: 'posters' })
          if (route.matched[0].path !== postersPath) {
            return redirect(postersPath)
          }
        }
      },
      { once: true },
    )
  })
}
