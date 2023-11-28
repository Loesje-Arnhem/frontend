<script lang="ts" setup>
import { type PosterNodeFragment } from '~/types/__generated__/graphql'

defineProps<{
  posters: PosterNodeFragment[]
}>()
</script>

<template>
  <ul class="list">
    <related-posters-list-item
      v-for="poster in posters"
      :key="poster.node.id"
      :poster="poster.node"
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
