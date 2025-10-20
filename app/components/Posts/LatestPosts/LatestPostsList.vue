<script lang="ts" setup>
import type { IPostListItem } from '~/types/Content'

defineProps<{
  posts: IPostListItem[]
}>()
</script>

<template>
  <ul class="list">
    <post-list-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      class="list-item"
    />
  </ul>
</template>

<style scoped>
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
