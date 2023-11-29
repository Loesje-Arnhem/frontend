<script lang="ts" setup>
import { type PostListItemNodeFragment } from '~/graphql/__generated__/graphql'
defineProps<{
  posts: PostListItemNodeFragment[]
}>()
</script>

<template>
  <ul class="list">
    <post-list-item
      v-for="post in posts"
      :key="post.node.id"
      :post="post.node"
      class="list-item"
    />
  </ul>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;

  margin-bottom: 2em;
}

.list-item {
  &:not(:last-child) {
    margin: 0 0 2em;
  }
}
</style>
