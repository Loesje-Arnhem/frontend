<template>
  <div>
    <latest-posts :posts="posts" />
  </div>
</template>

<script>
import LatestPosts from '@/components/Blocks/LatestPosts.vue'
import PostsQuery from '~/graphql/Posts.gql'

export default {
  components: {
    LatestPosts
  },
  data() {
    return {
      title: 'Nieuws'
    }
  },

  async asyncData({ app, params }) {
    const posts = await app.apolloProvider.defaultClient.query({
      query: PostsQuery,
      variables: {
        first: 10
      }
    })

    return {
      posts: posts.data.posts
    }
  },
  head() {
    return {
      title: this.title
    }
  }
}
</script>

<style scoped lang="postcss">
.page {
  @mixin center;
}
</style>
