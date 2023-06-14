export default defineNuxtPlugin(() => {
  const localePath = useLocalePath()
  const route = useRoute()
  const { mediaQueryStandAlone } = useAppConfig()

  const postersPath = localePath({ name: 'posters' })

  const setBodyClass = () => {
    document.documentElement.classList.add('standalone')
  }

  const redirectToPostersPageOnStandalone = () => {
    if (route.matched[0].path !== postersPath) {
      return navigateTo({
        path: postersPath,
        query: {
          standalone: 'true',
        },
      })
    }
  }

  window.test = window.matchMedia(mediaQueryStandAlone).matches

  if (window.matchMedia(mediaQueryStandAlone).matches) {
    setBodyClass()
    redirectToPostersPageOnStandalone()
  }

  const redirectIfProtocol = () => {
    const protocol = 'web+loesje'
    if (route.fullPath.includes(encodeURIComponent(protocol))) {
      const decodedUrl = decodeURIComponent(route.fullPath)
      const url = decodedUrl.replace(`${protocol}://`, '/')
      navigateTo(url, {
        external: true
      })
    }
  }

  redirectIfProtocol()

  window.addEventListener('DOMContentLoaded', () => {
    window
      .matchMedia(mediaQueryStandAlone)
      .addEventListener('change', (event) => {
        if (event.matches) {
          setBodyClass()
          redirectToPostersPageOnStandalone()
        }
      })
  })
})
