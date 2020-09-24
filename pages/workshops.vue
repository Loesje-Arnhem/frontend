<template>
  <app-loader v-if="loading" />
  <div v-else-if="page" class="page">
    <app-content :title="page.title" :content="page.content" />
    <form-workshop />
    <related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    />
    <!-- <related-products-section :related-products="page.relatedProducts" /> -->
  </div>
</template>

<script>
import { usePageById } from '~/compositions/page'
import AppContent from '~/components/Shared/AppContent.vue'

import { workshopsPageId } from '~/data/pages'
import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import FormWorkshop from '~/components/Blocks/FormWorkshop.vue'
// import RelatedProductsSection from '~/components/Shop/Products/RelatedProducts/RelatedProductsSection.vue'

export default {
  setup() {
    const { page, loading, error } = usePageById(workshopsPageId)

    return {
      page,
      loading,
      error,
    }
  },
  components: {
    AppContent,
    RelatedPostersSection,
    FormWorkshop,
    // RelatedProductsSection,
  },

  // head() {
  //   return {
  //     title: this.page.title,
  //   }
  // },
}
</script>
