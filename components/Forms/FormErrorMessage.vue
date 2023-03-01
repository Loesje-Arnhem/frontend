<script lang="ts" setup>
withDefaults(
  defineProps<{
    error: string
  }>(),
  {
    error: '',
  },
)
</script>

<template>
  <span aria-live="assertive" class="error">{{ $t(error) }}</span>
</template>

<style lang="postcss" scoped>
.error {
  display: block;
}
</style>
