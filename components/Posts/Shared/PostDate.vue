<script lang="ts" setup>
defineProps<{
  date?: string | null
}>()
</script>

<template>
  <app-date
    v-if="date"
    :date="date"
    :class="$style.date"
  />
</template>

<style lang="postcss" module>
.date {
  font-size: 0.9em;
  display: block;
}
</style>
