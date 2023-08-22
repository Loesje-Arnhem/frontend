<script lang="ts" setup>
import { PostListItemsFragment } from '#gql'

defineProps<{
  posts: PostListItemsFragment
}>()
</script>

<template>
  <list-animation v-if="posts.edges.length" class="list">
    <post-list-item
      v-for="post in posts.edges"
      :key="post.node.id"
      :post="post.node"
      class="list-item"
    />
  </list-animation>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;

  margin-bottom: 2em;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  align-items: stretch;
}

.list-item {
  padding-bottom: 2em;
  border-bottom: 2px solid var(--color-black);
  display: flex;
  flex-direction: column;
}
</style>
