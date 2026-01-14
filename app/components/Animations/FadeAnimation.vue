<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <slot />
  </transition>
</template>

<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--animation);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
