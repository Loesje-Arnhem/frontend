<template>
  <transition name="fade" :mode="mode">
    <slot />
  </transition>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: null,
    },
  },
}
</script>

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
