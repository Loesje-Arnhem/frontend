<script lang="ts" setup>
const previousSlideEnabled = ref(false)
const nextSlideEnabled = ref(true)
const goToPreviousSlide = () => {}
const goToNextSlide = () => {}
</script>

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
