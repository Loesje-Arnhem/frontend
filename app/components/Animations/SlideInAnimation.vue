<script lang="ts" setup>
withDefaults(
  defineProps<{
    mode?: 'in-out' | 'out-in' | 'default'
    direction?: 'up' | 'down'
  }>(),
  {
    mode: 'default',
    direction: 'up',
  },
)
</script>

<template>
  <transition
    :name="`slide-in-${direction}`"
    :mode="mode"
  >
    <slot />
  </transition>
</template>

<style scoped>
.slide-in-up-enter-active,
.slide-in-up-leave-active,
.slide-in-down-enter-active,
.slide-in-down-leave-active {
  transition:
    opacity var(--animation),
    transform var(--animation);
}

.slide-in-up-enter-from,
.slide-in-up-leave-to,
.slide-in-down-enter-from,
.slide-in-down-leave-to {
  opacity: 0;
}

.slide-in-up-enter-from,
.slide-in-up-leave-to {
  transform: translateY(-0.5em);
}

.slide-in-down-enter-from,
.slide-in-down-leave-to {
  transform: translateY(0.5em);
}
</style>
