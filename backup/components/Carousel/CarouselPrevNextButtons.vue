<template>
  <div class="buttons">
    <button
      class="btn-previous"
      :disabled="!previousSlideEnabled"
      @click="goToPreviousSlide"
    >
      prev
    </button>
    <button
      class="btn-next"
      :disabled="!nextSlideEnabled"
      @click="goToNextSlide"
    >
      next
    </button>
  </div>
</template>

<script>
import useCarousel from '~/compositions/carousel'

export default {
  setup() {
    const {
      previousSlideEnabled,
      nextSlideEnabled,
      goToNextSlide,
      goToPreviousSlide,
    } = useCarousel()

    return {
      previousSlideEnabled,
      nextSlideEnabled,
      goToNextSlide,
      goToPreviousSlide,
    }
  },
}
</script>

<style lang="postcss" scoped>
.btn-next,
.btn-previous {
  position: absolute;
  top: 50%;
  margin-top: -1em;
  touch-action: manipulation;
  z-index: 9;
}

.btn-next {
  right: calc(var(--gutter) * 2);
  transform: translateX(0.5em);
}

.btn-previous {
  transform: translateX(-0.5em);
  left: calc(var(--gutter) * 2);
}

.icon {
  width: 2em;
  height: 2em;
}
</style>
