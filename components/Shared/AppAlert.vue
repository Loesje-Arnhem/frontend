<script lang="ts" setup>
defineProps<{
  show: boolean;
  text: string;
}>();
</script>

<template>
  <div v-if="show" class="alert">
    <div class="wrapper" role="alert">
      {{ text }}
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.alert {
  z-index: var(--z-index-alert);
  background-color: var(--color-white);
  padding-block: 0.75em;
  line-height: 1.2;
  position: fixed;
  inset: auto 0 0;
  border: 1px solid currentcolor;
  text-align: center;
}

.wrapper {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
