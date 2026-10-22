<script lang="ts" setup>
import type { IPostListItem } from '~/types/Content'

defineProps<{
  posts: IPostListItem[]
}>()
</script>

<template>
  <list-animation
    v-if="posts.length"
    class="list"
  >
    <post-list-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      class="list-item"
    />
  </list-animation>
</template>

<style lang="css" scoped>
.list {
  @mixin list-reset;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
  gap: 2em;
  align-items: stretch;
  margin-block-end: 2em;
}

.list-item {
  display: flex;
  flex-direction: column;
  padding-block-end: 2em;
  border-block-end: 2px solid var(--color-black);
}
</style>
