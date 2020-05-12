<template>
  <div v-if="page.title">
    <posts-overview-container />
    <related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script>
import { blogPageId } from '~/data/pages'
import PageQuery from '~/graphql/Pages/PageById.gql'
import PostsOverviewContainer from '~/components/Posts/PostsOverview/PostsOverviewContainer.vue'
import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import RelatedProductsSection from '~/components/Shop/RelatedProducts/RelatedProductsSection.vue'

export default {
  components: {
    RelatedPostersSection,
    PostsOverviewContainer,
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
