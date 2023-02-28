<template>
  <div class="buttons">
    <button
      class="btn-previous"
      :disabled="!previousSlideEnabled"
      @click="goToPreviousSlide"
    >
      <app-icon icon="chevron-left" title="Vorige slide" />
    </button>
    <button
      class="btn-next"
      :disabled="!nextSlideEnabled"
      @click="goToNextSlide"
    >
      <app-icon icon="chevron-right" title="Volgende slide" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useCarousel from '~/composables/carousel'

export default defineComponent({
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
})
</script>

<style lang="postcss" scoped>
.btn-next,
.btn-previous {
  position: absolute;
  top: 50%;
  margin-top: -0.75em;
  touch-action: manipulation;
  z-index: 9;
}

.btn-next {
  right: 0;
}

.btn-previous {
  left: 0;
}

.icon {
  width: 1.5em;
  height: 1.5em;
}
</style>
