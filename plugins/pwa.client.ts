export default defineNuxtPlugin((nuxtApp) => {
  const localePath = useLocalePath()
  const route = useRoute()
  const { mediaQueryStandAlone } = useAppConfig()

  // Whether the app is running in the Microsoft Edge sidebar.
  const isSidebarPWA = (() => {
    if (navigator.userAgentData) {
      return navigator.userAgentData.brands.some((b) => {
        return b.brand === 'Edge Side Panel'
      })
    }
    return false
  })()

  const setBodyClass = () => {
    document.documentElement.classList.add('standalone')
  }

  const redirectToPostersPageOnStandalone = async () => {
    const posterPages = ['posters-favorites', 'posters', 'posters-details']
    if (posterPages.includes(nuxtApp.$getRouteBaseName())) {
      return
    }
    const postersListPage = localePath({ name: 'posters' })
    await navigateTo({
      path: postersListPage,
      query: {
        standalone: 'true',
      },
    })
  }

  if (window.matchMedia(mediaQueryStandAlone).matches || isSidebarPWA) {
    setBodyClass()
    redirectToPostersPageOnStandalone()
  }

  const redirectIfProtocol = () => {
    const protocol = 'web+loesje'
    if (route.fullPath.includes(encodeURIComponent(protocol))) {
      const decodedUrl = decodeURIComponent(route.fullPath)
      const url = decodedUrl.replace(`${protocol}://`, '/')
      navigateTo(url, {
        external: true,
      })
    }
  }

  redirectIfProtocol()

  window
    .matchMedia(mediaQueryStandAlone)
    .addEventListener('change', (event) => {
      if (event.matches) {
        setBodyClass()
        redirectToPostersPageOnStandalone()
      }
    })
})
