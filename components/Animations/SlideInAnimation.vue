<template>
  <transition name="slide-in" :mode="mode">
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
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all var(--animation);
}

.slide-in-enter,
.slide-in-leave-to {
  opacity: 0;
  transform: translateY(-0.5em);
}
</style>
