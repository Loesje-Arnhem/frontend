<template>
  <ul v-if="hasPosts" :class="$style.list">
    <post-list-item
      v-for="post in posts.edges"
      :key="post.node.postId"
      :post="post"
      :class="$style['list-item']"
    />
  </ul>
</template>

<script>
import PostListItem from '@/components/Posts/PostListItem.vue'

export default {
  components: {
    PostListItem
  },

  props: {
    posts: {
      type: Object,
      required: true
    }
  },

  computed: {
    hasPosts() {
      return this.posts && this.posts.edges && this.posts.edges.length
    }
  }
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
