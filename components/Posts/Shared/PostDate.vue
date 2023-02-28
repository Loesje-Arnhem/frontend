<script lang="ts" setup>
defineProps<{
  date: string
}>()
</script>

<template>
  <app-date :date="date" :class="$style.date" />
</template>

<style lang="postcss" module>
.date {
  font-size: 0.9em;
  display: block;
}
</style>
