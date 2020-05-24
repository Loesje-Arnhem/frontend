<template>
  <div class="page">
    <app-content :title="page.title" :content="page.content" />
    <form-workshop />
    <related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script>
import PageQuery from '~/graphql/Pages/PageById.gql'
import AppContent from '~/components/Shared/AppContent.vue'

import { workshopsPageId } from '~/data/pages'
import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import FormWorkshop from '~/components/Blocks/FormWorkshop.vue'
import RelatedProductsSection from '~/components/Shop/Products/RelatedProducts/RelatedProductsSection.vue'

export default {
  components: {
    AppContent,
    RelatedPostersSection,
    FormWorkshop,
    RelatedProductsSection,
  },

  async asyncData({ app, params }) {
    const page = await app.apolloProvider.defaultClient.query({
      query: PageQuery,
      variables: {
        id: workshopsPageId,
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
