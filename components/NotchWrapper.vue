<template>
  <div class="notch-wrapper">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.notch-wrapper {
  padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
}
</style>
