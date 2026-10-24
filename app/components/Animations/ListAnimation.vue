<template>
  <transition-group
    name="list"
    tag="ul"
  >
    <slot />
  </transition-group>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: opacity var(--animation), translate var(--animation);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  translate: 0 1em;
}
</style>
