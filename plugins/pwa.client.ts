export default defineNuxtPlugin((nuxtApp) => {
  const localePath = useLocalePath()
  const route = useRoute()
  const { mediaQueryStandAlone } = useAppConfig()

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

  const isInSideBar = () => {
    const brands = navigator.userAgentData.brands;
    return brands.find(b => b.brand === "Edge Side Panel");
  }

  if (window.matchMedia(mediaQueryStandAlone).matches || isInSideBar()) {
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
