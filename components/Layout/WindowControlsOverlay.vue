<template>
  <div v-if="supportsWindowControlsOverlay" class="wrapper">test</div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const supportsWindowControlsOverlay = ref(false)
    if (
      'windowControlsOverlay' in navigator &&
      navigator.windowControlsOverlay.visible
    ) {
      // Window Controls Overlay is supported.
      supportsWindowControlsOverlay.value = true
    }
    return {
      supportsWindowControlsOverlay,
    }
  },
})
</script>

<style scoped lang="postcss">
.wrapper {
  /* Make sure the `div` stays there, even when scrolling. */
  position: fixed;
  app-region: drag;
  background-image: var(--color-black);
  inset: env(titlebar-area-y, 0) env(titlebar-area-x, 0)
    env(titlebar-area-height, 33px);
}
</style>
