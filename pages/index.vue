<template>
  <div>
    <h1 class="sr-only">{{ page.title }}</h1>
    <latest-posts-section />
    <related-posters-section :related-posters="page.relatedPosters" />
    <app-stores-section />
    <related-products-section :related-products="page.relatedProducts" />
    <block-instagram />
    <groups />
  </div>
</template>

<script>
import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import Groups from '~/components/Blocks/Groups.vue'
import BlockInstagram from '~/components/Blocks/BlockInstagram.vue'
import AppStoresSection from '~/components/AppStores/AppStoresSection.vue'
import LatestPostsSection from '~/components/Posts/LatestPosts/LatestPostsSection.vue'
import RelatedProductsSection from '~/components/Shop/RelatedProducts/RelatedProductsSection.vue'
import PageQuery from '~/graphql/Pages/PageById.gql'
import { homePageId } from '~/data/pages'

export default {
  components: {
    Groups,
    BlockInstagram,
    RelatedPostersSection,
    AppStoresSection,
    LatestPostsSection,
    RelatedProductsSection,
  },

  async asyncData({ app, params }) {
    const page = await app.apolloProvider.defaultClient.query({
      query: PageQuery,
      variables: {
        id: homePageId,
      },
    })

    return {
      page: page.data.page,
    }
  },
  head() {
    return {
      title: this.page.title,
    }
  },
}
</script>
