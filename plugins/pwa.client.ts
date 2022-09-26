import { Context } from '@nuxt/types'

const setBodyClass = (isStandalone: boolean) => {
  if (isStandalone) {
    document.documentElement.classList.add('standalone')
  } else {
    document.documentElement.classList.remove('standalone')
  }
}

export default ({ route }: Context) => {
  setBodyClass(route.query.standalone === 'true')
  window.addEventListener('DOMContentLoaded', () => {
    window.matchMedia('(display-mode: standalone)').addEventListener(
      'change',
      (event) => {
        setBodyClass(event.matches)
      },
      { once: true },
    )
  })
}
