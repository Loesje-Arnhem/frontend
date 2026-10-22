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

<style module>
.date {
  display: block;
  font-size: 0.9em;
}
</style>
