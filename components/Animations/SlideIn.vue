<template>
  <transition name="slide-in">
    <slot />
  </transition>
</template>

<style lang="postcss" scoped>
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.2s;
}

.slide-in-enter,
.slide-in-leave-to {
  opacity: 0;
  transform: translateY(-0.5em);
}
</style>
