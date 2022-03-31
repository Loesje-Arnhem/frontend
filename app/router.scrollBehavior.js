export default () => {
  const dailyPosters = document.querySelector('.header-top')
  if (!dailyPosters) {
    return {
      x: 0,
      y: 0,
    }
  }

  const dailyPostersHeight = dailyPosters.offsetHeight
  const scrollPosition = document.documentElement.scrollTop

  let scrollTo
  let loaderColor
  if (scrollPosition >= dailyPostersHeight) {
    scrollTo = dailyPostersHeight
    loaderColor = 'var(--color-white)'
  } else {
    scrollTo = scrollPosition
    loaderColor = 'var(--color-black)'
  }

  if (document) {
    document.documentElement.style.setProperty(
      '--nuxt-loader-color',
      loaderColor,
    )
  }

  return { x: 0, y: scrollTo }
}
