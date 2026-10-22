<script lang="ts" setup>
defineProps<{
  show: boolean
  text: string
}>()
</script>

<template>
  <div
    v-if="show"
    class="alert"
  >
    <div
      class="wrapper"
      role="alert"
    >
      {{ text }}
      <slot />
    </div>
  </div>
</template>

<style lang="css" scoped>
.alert {
  position: fixed;
  inset: auto 0 0;
  z-index: var(--z-index-alert);
  padding-block: 0.75em;
  line-height: 1.2;
  text-align: center;
  background-color: var(--color-white);
  border: 1px solid currentcolor;
}

.wrapper {
  padding-block-end: env(safe-area-inset-bottom);
}
</style>
