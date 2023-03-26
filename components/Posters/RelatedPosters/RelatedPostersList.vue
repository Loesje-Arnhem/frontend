<script lang="ts" setup>
import { IPosterListItem } from '~~/interfaces/IContent'
import { IRelatedPosterNode } from '~~/interfaces/IPoster'

defineProps<{
  posters: IPosterListItem[]
}>()
</script>

<template>
  <ul class="list">
    <related-posters-list-item
      v-for="poster in posters"
      :key="poster.slug"
      :poster="poster"
    />
  </ul>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;

  margin-bottom: 3em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
