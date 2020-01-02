<template>
  <div>
    <h1 class="sr-only">Home</h1>
    <latest-posts-container />
    <related-posters-container
      v-if="page"
      :related-posters="page.relatedPosters"
    />
    <app-stores-section />
    <featured-products-section />
    <BlockInstagram />
    <groups />
  </div>
</template>

<script>
import Groups from '~/components/Blocks/Groups.vue'
import BlockInstagram from '~/components/Blocks/BlockInstagram.vue'
import AppStoresSection from '~/components/AppStores/AppStoresSection.vue'
import RelatedPostersContainer from '~/components/Posters/RelatedPosters/RelatedPostersContainer.vue'
import LatestPostsContainer from '~/components/Posts/LatestPosts/LatestPostsContainer.vue'
import FeaturedProductsSection from '~/components/Shop/FeaturedProducts/FeaturedProductsSection.vue'
import frontPageQuery from '~/graphql/FrontPage.gql'

export default {
  components: {
    Groups,
    BlockInstagram,
    RelatedPostersContainer,
    AppStoresSection,
    LatestPostsContainer,
    FeaturedProductsSection
  },

  apollo: {
    page: frontPageQuery
  },
  head() {
    return {
      title: 'Home'
    }
  }
}
</script>
