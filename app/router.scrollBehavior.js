export default function(to, from, savedPosition) {
  const dailyPostersHeight = document.querySelector('.poster-daily')
    .offsetHeight
  const scrollPosition = document.documentElement.scrollTop
  const scrollTo =
    scrollPosition > dailyPostersHeight ? dailyPostersHeight : scrollPosition

  return { x: 0, y: scrollTo }
}
