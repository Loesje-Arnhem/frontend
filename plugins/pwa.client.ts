import { Context } from '@nuxt/types'
import { mediaQueryStandAlone } from '~/utils/media-queries'

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
  if (window.matchMedia(mediaQueryStandAlone).matches) {
    setBodyClass()
    redirectToPostersPageOnStandalone(context)
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.matchMedia(mediaQueryStandAlone).addEventListener(
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
