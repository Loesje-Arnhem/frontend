import { Context } from '@nuxt/types'

export default ({ route, app, redirect }: Context) => {
  // Add the userAgent property to the context
  if (
    !process.client ||
    window.matchMedia('(display-mode: standalone)').matches
  ) {
    return
  }

  const postersPath = app.localePath({ name: 'posters' })
  if (route.matched[0].path !== postersPath) {
    return redirect(postersPath)
  }
}
