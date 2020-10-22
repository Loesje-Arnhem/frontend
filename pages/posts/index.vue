<template>
  <div v-if="page">
    <h1 class="sr-only">{{ page.title }}</h1>
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
import { usePageById } from '~/compositions/page'

export default {
  setup() {
    const { page, loading, error } = usePageById(blogPageId)

    return {
      page,
      loading,
      error,
    }
  },

  nuxtI18n: {
    paths: {
      nl: '/over-mij/nieuws',
    },
  },
}
</script>
