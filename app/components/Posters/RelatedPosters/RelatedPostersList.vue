<script lang="ts" setup>
import type { IPosterListItem } from '~/types/Content'

defineProps<{
  posters: IPosterListItem[]
}>()
</script>

<template>
  <ul class="list">
    <related-posters-list-item
      v-for="poster in posters"
      :key="poster.id"
      :poster="poster"
    />
  </ul>
</template>

<style lang="css" scoped>
.list {
  @mixin list-reset;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-block-end: 3em;
}
</style>
