<script lang="ts" setup>
const showWindowControlsOverlay = ref(false);

const onGeometryChange = (event: any) => {
  showWindowControlsOverlay.value = event.visible;
};

onMounted(() => {
  if (!("windowControlsOverlay" in navigator)) {
    return;
  }
  // Window Controls Overlay is supported.

  // @ts-expect-error: windowControlsOverlay
  showWindowControlsOverlay.value = navigator.windowControlsOverlay.visible;

  // @ts-expect-error: windowControlsOverlay
  navigator.windowControlsOverlay.addEventListener(
    "geometrychange",
    onGeometryChange,
  );
});

onUnmounted(() => {
  if (!("windowControlsOverlay" in navigator)) {
    return;
  }

  // @ts-expect-error: windowControlsOverlay
  navigator.windowControlsOverlay.removeEventListener(
    "geometrychange",
    onGeometryChange,
  );
});
</script>

<template>
  <div v-if="showWindowControlsOverlay">
    <div class="wrapper">
      <app-icon icon="logo" class="logo" :height="50" :width="87" />
    </div>
    <div class="placeholder" />
  </div>
</template>

<style scoped>
.wrapper,
.placeholder {
  height: 3em;
}

.wrapper {
  /* Make sure the `div` stays there, even when scrolling. */
  @mixin color-negative;

  position: fixed;
  app-region: drag;
  inset: env(titlebar-area-y, 0) 0 auto;
  padding: 0.5em env(titlebar-area-x, 0);
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  display: block;
  height: 100%;
}
</style>
