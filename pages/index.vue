<template>
  <div>
    <h1 class="sr-only">Home</h1>
    <latest-posts :posts="posts" :show-button="true" />
    <posters :posters="posters" />
    <AppStoresBlock />
    <BlockInstagram />
    <groups />
  </div>
</template>

<script>
import LatestPosts from '@/components/Blocks/LatestPosts.vue'
import Groups from '@/components/Blocks/Groups.vue'
import BlockInstagram from '@/components/Blocks/BlockInstagram.vue'
import AppStoresBlock from '@/components/Blocks/AppStoresBlock.vue'
import Posters from '@/components/Blocks/Posters.vue'
import PostersQuery from '~/graphql/Posters.gql'
import PostsQuery from '~/graphql/Posts.gql'

export default {
  components: {
    LatestPosts,
    Groups,
    BlockInstagram,
    AppStoresBlock,
    Posters
  },

  async asyncData({ app, params }) {
    const posters = await app.apolloProvider.defaultClient.query({
      query: PostersQuery,
      variables: {
        first: 5
      }
    })
    const posts = await app.apolloProvider.defaultClient.query({
      query: PostsQuery,
      variables: {
        first: 3
      }
    })

    return {
      posters: posters.data.posters,
      posts: posts.data.posts
    }
  },

  head() {
    return {
      title: 'Home'
    }
  }
}
</script>

<style scoped lang="postcss">
.page {
  @mixin center;
}
</style>
