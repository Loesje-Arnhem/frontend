<template>
  <transition-group
    name="list"
    tag="ul"
  >
    <slot />
  </transition-group>
</template>

<style lang="postcss">
.list-enter-active,
.list-leave-active {
  transition: all 0.2s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(1em);
}
</style>
