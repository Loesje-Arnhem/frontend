<template>
  <div v-if="showWindowControlsOverlay" class="wrapper">test</div>
</template>

<script>
import { defineComponent, onMounted, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const showWindowControlsOverlay = ref(false)
    onMounted(() => {
      if (!('windowControlsOverlay' in navigator)) {
        return
      }
      // Window Controls Overlay is supported.
      showWindowControlsOverlay.value = navigator.windowControlsOverlay.visible

      navigator.windowControlsOverlay.addEventListener(
        'geometrychange',
        (event) => {
          showWindowControlsOverlay.value = event.visible
        },
      )
    })
    return {
      showWindowControlsOverlay,
    }
  },
})
</script>

<style scoped lang="postcss">
.wrapper {
  /* Make sure the `div` stays there, even when scrolling. */
  @mixin color-negative;

  position: fixed;
  app-region: drag;
  inset: env(titlebar-area-y, 0) env(titlebar-area-x, 0) auto;
  height: env(titlebar-area-height, 33px);
}
</style>
