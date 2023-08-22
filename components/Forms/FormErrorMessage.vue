<script lang="ts" setup>
withDefaults(
  defineProps<{
    error?: string | null
  }>(),
  {
    error: null,
  },
)
</script>

<template>
  <span aria-live="assertive" class="error">
    <template v-if="error">
      {{ error }}
    </template>
  </span>
</template>

<style lang="postcss" scoped>
.error {
  display: block;
}
</style>
