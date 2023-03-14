import type { RouterConfig } from '@nuxt/schema'

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

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig>{
  scrollBehavior: (to, from, savedPosition) => {
    const scrollPosition = document.documentElement.scrollTop
    const element = document.querySelector('.page-header-top') as HTMLDivElement
    let elementHeight = 0
    if (element) {
      elementHeight = element.offsetHeight
    }

    // // triggerScroll is only fired when a new component is loaded
    // if (to.path === from.path && to.hash !== from.hash) {
    //   nuxt.$nextTick(() => nuxt.$emit('triggerScroll'))
    // }

    return new Promise((resolve) => {
      //   nuxt.$once('triggerScroll', () => {
      if (savedPosition) {
        resolve(savedPosition)
      }

      let top = 0

      //   const element = document.querySelector('.page-header-top')
      if (elementHeight) {
        if (scrollPosition >= elementHeight) {
          top = element.offsetHeight
        } else {
          resolve(false)
        }
      }
      resolve({
        left: 0,
        top,
      })
    })
    // })
  },
}
