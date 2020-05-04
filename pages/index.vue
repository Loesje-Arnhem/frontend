<template>
  <div>
    <h1 class="sr-only">Home</h1>
    <latest-posts-section />
    <related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    />
    <app-stores-section />
    <featured-products-section />
    <block-instagram />
    <groups />
  </div>
</template>

<script>
import RelatedPostersSection from '@/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import Groups from '~/components/Blocks/Groups.vue'
import BlockInstagram from '~/components/Blocks/BlockInstagram.vue'
import AppStoresSection from '~/components/AppStores/AppStoresSection.vue'
import LatestPostsSection from '~/components/Posts/LatestPosts/LatestPostsSection.vue'
import FeaturedProductsSection from '~/components/Shop/FeaturedProducts/FeaturedProductsSection.vue'
import frontPageQuery from '~/graphql/FrontPage.gql'

export default {
  components: {
    Groups,
    BlockInstagram,
    RelatedPostersSection,
    AppStoresSection,
    LatestPostsSection,
    FeaturedProductsSection,
  },

  apollo: {
    page: frontPageQuery,
  },
  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
