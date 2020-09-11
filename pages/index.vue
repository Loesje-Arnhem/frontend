<template>
  <div v-if="loading">{{ loading }}</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else-if="page">
    <h1 class="sr-only">{{ page.title }}</h1>
    <latest-posts-section />
    <related-posters-section :related-posters="page.relatedPosters" />
    <app-stores-section />
    <!-- <related-products-section
      :related-products="page.relatedProducts"
      :title="page.relatedPosters.title"
    />
    <block-instagram /> -->
    <groups />
  </div>
</template>

<script>
import { homePageId } from '~/data/pages'
import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import Groups from '~/components/Blocks/Groups.vue'
// import BlockInstagram from '~/components/Blocks/BlockInstagram.vue'
import AppStoresSection from '~/components/AppStores/AppStoresSection.vue'
import LatestPostsSection from '~/components/Posts/LatestPosts/LatestPostsSection.vue'
// import RelatedProductsSection from '~/components/Shop/Products/RelatedProducts/RelatedProductsSection.vue'
import { usePageById } from '~/compositions/page'

export default {
  setup() {
    const { page, loading, error } = usePageById(homePageId)

    return {
      page,
      loading,
      error,
    }
  },

  components: {
    Groups,
    // BlockInstagram,
    RelatedPostersSection,
    AppStoresSection,
    LatestPostsSection,
    // RelatedProductsSection,
  },

  head() {
    return {
      // title: this.page.title,
    }
  },
}
</script>
