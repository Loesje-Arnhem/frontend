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
import { useContext, computed } from '@nuxtjs/composition-api'
import AppContent from '~/components/Shared/AppContent.vue'
import RelatedPagesSection from '~/components/Pages/RelatedPages/RelatedPagesSection.vue'
import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
// import RelatedProductsSection from '~/components/Shop/Products/RelatedProducts/RelatedProductsSection.vue'
import { usePageByUri } from '~/compositions/page'
export default {
  setup() {
    const { params } = useContext()
    const uri = computed(() => params.value.pathMatch)
    const { page, loading, error } = usePageByUri(uri)
    const parentId = computed(() => {
      if (page.value.parent) {
        return page.value.parent.node.databaseId
      }
      return page.value.databaseId
    })

    return {
      parentId,
      page,
      loading,
      error,
      uri,
    }
  },
  components: {
    RelatedPagesSection,
    RelatedPostersSection,
    // RelatedProductsSection,
    AppContent,
  },

  // head() {
  //   return {
  //     title: this.page.title,
  //   }
  // },
  nuxtI18n: {
    paths: {
      nl: '/*',
    },
  },
}
</script>
