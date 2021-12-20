import { computed, inject } from '@nuxtjs/composition-api'

export default () => {
  const carousel = inject('carousel')
  const { totalPages, activeSlide, shouldAnimate } = carousel

  const previousSlideEnabled = computed(() => activeSlide.value > 0)
  const nextSlideEnabled = computed(() => activeSlide.value < totalPages - 1)

  const goToSlideNumber = (slide) => {
    if (slide === activeSlide.value) {
      return
    }
    activeSlide.value = slide
    shouldAnimate.value = true
  }

  const goToPreviousSlide = () => {
    if (!previousSlideEnabled.value) return
    shouldAnimate.value = true
    activeSlide.value = activeSlide.value - 1
  }
  const goToNextSlide = () => {
    if (!nextSlideEnabled.value) return
    shouldAnimate.value = true
    activeSlide.value = activeSlide.value + 1
  }

  const navigateByKeyboard = (event) => {
    if (event.key === 'ArrowLeft') {
      goToPreviousSlide()
    }
    if (event.key === 'ArrowRight') {
      goToNextSlide()
    }
  }

  return {
    activeSlide,
    totalPages,
    shouldAnimate,
    previousSlideEnabled,
    nextSlideEnabled,
    goToSlideNumber,
    goToNextSlide,
    goToPreviousSlide,
    navigateByKeyboard,
  }
}
