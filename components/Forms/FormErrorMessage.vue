<script lang="ts" setup>
defineProps<{
  error?: string
}>()
</script>

<template>
  <span aria-live="assertive" class="error">
    <template v-if="error">
      {{ $t(error) }}
    </template>
  </span>
</template>

<style lang="postcss" scoped>
.error {
  display: block;
}
</style>
