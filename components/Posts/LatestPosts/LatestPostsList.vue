<template>
  <ul :class="$style.list">
    <post-list-item
      v-for="post in posts"
      :key="post.node.postId"
      :post="post"
      :class="$style['list-item']"
    />
  </ul>
</template>

<script>
import PostListItem from '@/components/Posts/Shared/PostListItem.vue'

export default {
  components: {
    PostListItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="postcss" module>
.list {
  @mixin list-reset;

  margin-bottom: 2em;
}

.list-item {
  &:not(:last-child) {
    margin: 0 0 3em;
  }
}
</style>
