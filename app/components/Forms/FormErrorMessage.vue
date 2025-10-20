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
  <span
    aria-live="assertive"
    class="error"
  >
    <span
      v-if="error"
      v-html="error"
    />
  </span>
</template>

<style scoped>
.error {
  display: block;
}
</style>
