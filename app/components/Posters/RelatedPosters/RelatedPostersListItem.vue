<script lang="ts" setup>
import type { IPosterListItem } from '~/types/Content'

defineProps<{
  poster: IPosterListItem
}>()
</script>

<template>
  <li>
    <poster-tile :poster="poster" />
  </li>
</template>

<style lang="css" scoped>
li {
  flex: 0 0 10em;
  padding: 0.5em;
  rotate: random(-5deg, 5deg);
  scale: random(0.95, 1.05);
  translate: random(-1em, 1em) random(-1em, 1em);
}
</style>
