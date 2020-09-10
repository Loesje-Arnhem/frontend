<template>
  <div v-if="page" class="page">
    <app-content :title="page.title" :content="page.content" />

    <related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    />
    <related-pages-section
      :not-in="page.databaseId"
      :parent-page-id="parentId"
    />
    <!-- <related-products-section :related-products="page.relatedProducts" /> -->
  </div>
</template>

<script>
import AppContent from '~/components/Shared/AppContent.vue'
import RelatedPagesSection from '~/components/Pages/RelatedPages/RelatedPagesSection.vue'
import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
// import RelatedProductsSection from '~/components/Shop/Products/RelatedProducts/RelatedProductsSection.vue'
import { usePageByUri } from '~/compositions/page'

export default {
  setup() {
    const { page, loading, error } = usePageByUri()

    return {
      page,
      loading,
      error,
    }
  },
  components: {
    RelatedPagesSection,
    RelatedPostersSection,
    // RelatedProductsSection,
    AppContent,
  },

  computed: {
    parentId() {
      if (this.page.parent) {
        return this.page.parent.node.databaseId
      }
      return this.page.databaseId
    },
  },
  head() {
    return {
      title: this.page.title,
    }
  },
  nuxtI18n: {
    paths: {
      nl: '/*',
    },
  },
}
</script>
