<script lang="ts" setup>
import type { IPostListItem } from '~/types/Content'

defineProps<{
  posts: IPostListItem[]
}>()
</script>

<template>
  <list-animation class="list" v-if="posts.length">
    <post-list-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
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
