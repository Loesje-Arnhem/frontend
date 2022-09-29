import { Context } from '@nuxt/types'

const setBodyClass = () => {
  document.documentElement.classList.add('standalone')
}

const redirectToPostersPageOnStandalone = ({
  route,
  app,
  redirect,
}: Context) => {
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

export default (context: Context) => {
  if (context.route.query.standalone === 'true') {
    setBodyClass()
    redirectToPostersPageOnStandalone(context)
  }

  const mediaQuery =
    '(display-mode: standalone), (display-mode: window-controls-overlay)'
  window.addEventListener('DOMContentLoaded', () => {
    window.matchMedia(mediaQuery).addEventListener(
      'change',
      (event) => {
        if (event.matches) {
          setBodyClass()
          redirectToPostersPageOnStandalone(context)
        }
      },
      { once: true },
    )
  })
}
