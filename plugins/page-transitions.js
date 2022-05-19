import { nextTick } from '@nuxtjs/composition-api'

export default ({ app }) => {
  app.router.beforeEach(async (to, from, next) => {
    if (
      !process.client ||
      !from.name ||
      !document.createDocumentTransition ||
      to.name !== 'posters-details___nl'
    ) {
      next()
    } else {
      const transition = document.createDocumentTransition()
      document.documentElement.classList.add(
        'transition-warming-up',
        'transition-to-poster-details',
      )

      const container = document.querySelector('.embed-container')
      if (container) {
        container.classList.remove('embed-container')
      }

      next()
      await transition.start(async () => {
        await app.router.onReady(async () => {
          await nextTick(() => {
            document.documentElement.classList.remove('transition-warming-up')
          })
        })
      })
      document.documentElement.classList.remove('transition-to-poster-details')
    }
  })
}
