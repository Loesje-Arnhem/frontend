export default ({ app }) => {
  app.router.beforeEach(async (_, from, next) => {
    if (!process.client || !from.name || !document.createDocumentTransition) {
      next()
      return
    }
    const transition = document.createDocumentTransition()
    document.documentElement.classList.add('transition-warming-up')

    // const container = document.querySelector('.embed-container')
    // if (container) {
    //   container.classList.remove('embed-container')
    // }
    // console.log(container)

    next()
    await transition.start(async () => {
      await app.router.onReady(() => {
        document.documentElement.classList.remove(
          'transition-warming-up',
          'transition-to-poster-details',
        )
      })
    })
  })
}
