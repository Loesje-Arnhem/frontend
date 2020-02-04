<template>
  <div v-if="post.title">
    <post-details :post="post" />
    <related-posters-section
      v-if="post"
      :related-posters="post.relatedPosters"
    />
    <posts-overview-container :not-in="post.postId" />
  </div>
</template>

<script>
import PostsOverviewContainer from '@/components/Posts/PostsOverview/PostsOverviewContainer.vue'
import PostDetails from '@/components/Posts/PostDetails/PostDetails.vue'
import RelatedPostersSection from '@/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import PostQuery from '~/graphql/Post.gql'

export default {
  components: {
    PostDetails,
    PostsOverviewContainer,
    RelatedPostersSection
  },

  async asyncData({ app, params }) {
    const post = await app.apolloProvider.defaultClient.query({
      query: PostQuery,
      variables: {
        uri: params.slug
      }
    })
    return {
      post: post.data.post
    }
  },

  data() {
    return {
      post: {}
    }
  },

  head() {
    return {
      title: this.post.title
    }
  }
}
</script>
