import { Context } from '@nuxt/types'

const setBodyClass = () => {
  document.documentElement.classList.add('standalone')
}

export default ({ route, app, redirect }: Context) => {
  if (route.query.standalone === 'true') {
    setBodyClass()
  }
  window.addEventListener('DOMContentLoaded', () => {
    window.matchMedia('(display-mode: standalone)').addEventListener(
      'change',
      (event) => {
        if (event.matches) {
          setBodyClass()

          const postersPath = app.localePath({ name: 'posters' })
          if (route.matched[0].path !== postersPath) {
            return redirect({
              path: postersPath,
              query: {
                standalone: 'true',
              },
            })
          }
        }
      },
      { once: true },
    )
  })
}
