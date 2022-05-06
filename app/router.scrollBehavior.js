if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual' // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    }) // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}

export default (to, from, savedPosition) => {

  // as seen on https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/router.scrollBehavior.js
  const nuxt = window.<%= globals.nuxt %>;

  // triggerScroll is only fired when a new component is loaded
  if (to.path === from.path && to.hash !== from.hash) {
    nuxt.$nextTick(() => nuxt.$emit('triggerScroll'))
  }

  return new Promise((resolve) => {
    nuxt.$once('triggerScroll', () => {
      if (savedPosition) {
        resolve(savedPosition)
      }

      const position = {
        x: 0,
        y: 0,
      }

      const element = document.querySelector('.header-top')
      if (element) {
        const scrollPosition = document.documentElement.scrollTop
        const elementHeight = element.offsetHeight

        if (scrollPosition >= elementHeight) {
          position.y = element.offsetHeight
        } else {
          resolve({
            scrollToTop: false
          })
        }        
      }
      resolve(position)
    })
  })
}
