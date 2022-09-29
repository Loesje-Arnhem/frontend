<template>
  <div v-if="showWindowControlsOverlay" class="wrapper">
    <app-icon icon="logo" class="logo" height="50" width="87" />
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
} from '@vue/composition-api'

export default defineComponent({
  setup() {
    const showWindowControlsOverlay = ref(false)

    const onGeometryChange = (event) => {
      showWindowControlsOverlay.value = event.visible
    }

    onMounted(() => {
      if (!('windowControlsOverlay' in navigator)) {
        return
      }
      // Window Controls Overlay is supported.
      showWindowControlsOverlay.value = navigator.windowControlsOverlay.visible

      navigator.windowControlsOverlay.addEventListener(
        'geometrychange',
        onGeometryChange,
      )
    })

    onUnmounted(() => {
      if (!('windowControlsOverlay' in navigator)) {
        return
      }
      navigator.windowControlsOverlay.removeEventListener(
        'geometrychange',
        onGeometryChange,
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
  inset: env(titlebar-area-y, 0) 0 auto;
  height: 3em;
  padding: 0.75em env(titlebar-area-x, 0);
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
