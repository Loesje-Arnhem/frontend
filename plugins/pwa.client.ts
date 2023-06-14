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

  alert(`r23: ${window.matchMedia(mediaQueryStandAlone).matches}`)

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


  window
    .matchMedia(mediaQueryStandAlone)
    .addEventListener('change', (event) => {
      alert(`r47: ${window.matchMedia(mediaQueryStandAlone).matches}`)
      if (event.matches) {
        setBodyClass()
        redirectToPostersPageOnStandalone()
      }
    })
})
