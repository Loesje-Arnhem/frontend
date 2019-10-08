<template>
  <ul v-if="hasPosts" class="list">
    <post-list-item
      v-for="post in posts.edges"
      :key="post.node.postId"
      :post="post"
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

<style lang="postcss" scoped>
.list {
  @mixin list-reset;
  margin-bottom: 2em;
  max-width: 42rem;
}
</style>
