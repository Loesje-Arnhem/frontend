<template>
  <transition name="fade" mode="out-in">
    <slot />
  </transition>
</template>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--animation);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
