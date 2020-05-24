<template>
  <div>
    <app-content
      :title="post.title"
      :content="post.content"
      :date="post.date"
    />

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
import AppContent from '~/components/Shared/AppContent.vue'
import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
// import RelatedProductsSection from '~/components/Shop/Products/RelatedProducts/RelatedProductsSection.vue'

export default {
  components: {
    AppContent,
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
