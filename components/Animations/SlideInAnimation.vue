<template>
  <transition :name="`slide-in-${direction}`" :mode="mode">
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    mode: {
      type: String,
      default: null,
    },
    direction: {
      type: String,
      default: 'up',
    },
  },
})
</script>

<style lang="postcss" scoped>
.slide-in-up-enter-active,
.slide-in-up-leave-active,
.slide-in-down-enter-active,
.slide-in-down-leave-active {
  transition: opacity var(--animation), transform var(--animation);
}

.slide-in-up-enter,
.slide-in-up-leave-to,
.slide-in-down-enter,
.slide-in-down-leave-to {
  opacity: 0;
}

.slide-in-up-enter,
.slide-in-up-leave-to {
  transform: translateY(-0.5em);
}

.slide-in-down-enter,
.slide-in-down-leave-to {
  transform: translateY(0.5em);
}
</style>
