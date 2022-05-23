export default ({ app }) => {
  app.router.beforeEach(async (to, from, next) => {
    if (
      !process.client ||
      !from.name ||
      !document.createDocumentTransition ||
      !document.documentElement.classList.contains(
        'transition-to-poster-details',
      )
    ) {
      next()
    } else {
      const transition = document.createDocumentTransition()
      document.documentElement.classList.add('transition-warming-up')

      // back buttontrigger does not work yet
      const navigateToPoster = true

      let tile = null
      let details = null

      if (navigateToPoster) {
        tile = document.querySelector(
          `.image-wrapper-tile[data-slug=${to.params.slug}]`,
        )
        setStyles(tile)
      } else {
        details = document.querySelector(
          `.image-wrapper-details[data-slug=${from.params.slug}]`,
        )
        setStyles(container)
      }

      const pageHeaderTop = document.querySelector('.page-header-top')

      let scrollPosition = document.documentElement.scrollTop
      if (pageHeaderTop && scrollPosition >= pageHeaderTop.offsetHeight) {
        scrollPosition = pageHeaderTop.offsetHeight
      }

      await transition.start(async () => {
        next()

        if (navigateToPoster) {
          await waitForElement(
            `.image-wrapper-details[data-slug=${to.params.slug}]`,
          ).then((element) => {
            details = element
            updateDOMOnNextPage(element)

            window.scrollTo({
              top: scrollPosition,
            })
          })
        } else {
          await waitForElement(
            `.image-wrapper-[data-slug=${from.params.slug}]`,
          ).then((element) => {
            tile = element
            updateDOMOnNextPage(element)
          })
        }
      })
      document.documentElement.classList.remove('transition-to-poster-details')
      clearStyles(tile)
      clearStyles(details)
    }
  })
}

const updateDOMOnNextPage = (element) => {
  setStyles(element)
  document.documentElement.classList.remove('transition-warming-up')
}

const setStyles = (element) => {
  if (!element) {
    return
  }
  element.style['page-transition-tag'] = 'poster-details'
  element.style.contain = 'paint'
}

const clearStyles = (element) => {
  if (!element) {
    return
  }
  element.style.removeProperty('page-transition-tag')
  element.style.removeProperty('contain')
}

const waitForElement = (selector) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((_) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}
