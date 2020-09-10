<template>
  <div v-if="page.title">
    <posts-overview-section />
    <!-- <related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    /> -->
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script>
import { blogPageId } from '~/data/pages'
import PageQuery from '~/graphql/Pages/PageById.gql'
import PostsOverviewSection from '~/components/Posts/Overview/PostsOverviewSection.vue'
// import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import RelatedProductsSection from '~/components/Shop/Products/RelatedProducts/RelatedProductsSection.vue'

export default {
  components: {
    // RelatedPostersSection,
    PostsOverviewSection,
    RelatedProductsSection,
  },
  async asyncData({ app, params }) {
    const page = await app.apolloProvider.defaultClient.query({
      query: PageQuery,
      variables: {
        id: blogPageId,
      },
    })
    return {
      page: page.data.page,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/over-mij/nieuws',
    },
  },
  head() {
    return {
      title: this.page.title,
    }
  },
}
</script>
