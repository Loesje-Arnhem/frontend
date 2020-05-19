<template>
  <div>
    <post-details :post="post" />
    <related-posters-section
      v-if="post"
      :related-posters="post.relatedPosters"
    />
    {{ post.relatedProducts }}
    <!-- <related-products-section :related-products="post.relatedProducts" /> -->
    <posts-overview-section :not-in="post.databaseId" />
  </div>
</template>

<script>
import PostQuery from '~/graphql/Posts/Post.gql'
import PostsOverviewSection from '~/components/Posts/Overview/PostsOverviewSection.vue'
import PostDetails from '~/components/Posts/Details/PostDetails.vue'
import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
// import RelatedProductsSection from '~/components/Shop/Products/RelatedProducts/RelatedProductsSection.vue'

export default {
  components: {
    PostDetails,
    PostsOverviewSection,
    RelatedPostersSection,
    // RelatedProductsSection,
  },

  async asyncData({ app, params }) {
    const post = await app.apolloProvider.defaultClient.query({
      query: PostQuery,
      variables: {
        uri: params.slug,
      },
    })
    return {
      post: post.data.post,
    }
  },

  head() {
    return {
      title: this.post.title,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/over-mij/nieuws/:slug',
    },
  },
}
</script>
