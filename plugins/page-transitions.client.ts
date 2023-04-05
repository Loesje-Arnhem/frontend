let navigateByBrowserButtons = false
window.addEventListener('popstate', () => {
  navigateByBrowserButtons = true
})

export default defineNuxtPlugin(() => {
  const router = useRouter()

  const localeRoute = useLocaleRoute()
  const posterDetailsRoute = localeRoute({
    name: 'posters-details',
    params: {
      slug: '-',
    },
  })
  router.beforeEach((to, from, next) => {
    if (
      !process.client ||
      !from.name ||
      navigateByBrowserButtons ||
      // @ts-ignore
      !document.startViewTransition ||
      to.name !== posterDetailsRoute?.name
    ) {
      next()
    } else {
      // back buttontrigger does not work yet
      const navigateToPoster = true

      let tile: HTMLElement | null = null
      let details: HTMLElement | null = null

      if (navigateToPoster) {
        tile = document.querySelector(
          `.image-wrapper-tile[data-slug=${to.params.slug}]`,
        )
        setStyles(tile)
      } else {
        details = document.querySelector(
          `.image-wrapper-details[data-slug=${from.params.slug}]`,
        )
        setStyles(details)
      }

      if (!tile && !details) {
        navigateByBrowserButtons = false
        next()
        return
      }

      document.documentElement.classList.add(
        'transition-warming-up',
        'transition-to-poster-details',
      )

      const pageHeaderTop = document.querySelector(
        '.page-header-top',
      ) as HTMLElement

      let scrollPosition = document.documentElement.scrollTop
      if (pageHeaderTop && scrollPosition >= pageHeaderTop.offsetHeight) {
        scrollPosition = pageHeaderTop.offsetHeight
      }
      navigateByBrowserButtons = false

      document.startViewTransition(async () => {
        next()

        if (navigateToPoster) {
          console.log(`.image-wrapper-details[data-slug=${to.params.slug}]`)
          await waitForElement(
            `.image-wrapper-details[data-slug=${to.params.slug}]`,
          ).then((element) => {
            console.log(to.params.slug)
            details = element
            updateDOMOnNextPage(element)
          })
        } else {
          await waitForElement(
            `.image-wrapper-tile[data-slug=${from.params.slug}]`,
          ).then((element) => {
            console.log(to.params.slug)
            tile = element
            updateDOMOnNextPage(element)
          })
        }
        document.documentElement.classList.remove(
          'transition-to-poster-details',
        )
        clearStyles(tile)
        clearStyles(details)
      })
    }
  })
})

const updateDOMOnNextPage = (element: HTMLElement | null) => {
  setStyles(element)
  document.documentElement.classList.remove('transition-warming-up')
}

const setStyles = (element: HTMLElement | null) => {
  if (!element) {
    return
  }
  element.style['view-transition-name'] = 'poster-details'
  element.style.contain = 'layout'
}

const clearStyles = (element: HTMLElement | null) => {
  if (!element) {
    return
  }
  element.style.removeProperty('view-transition-name')
  element.style.removeProperty('contain')
}

const waitForElement = (selector: string) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector) as HTMLElement)
    }

    const observer = new MutationObserver((_) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector) as HTMLElement)
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}
