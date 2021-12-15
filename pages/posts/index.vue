<template>
  <div v-if="page">
    <h1 class="sra-only">{{ page.title }}</h1>
    <!-- <posts-overview-section /> -->
    <!-- <related-posters-section :related-posters="page.relatedPosters" /> -->
    <!-- <related-products-section :related-products="page.relatedProducts" /> -->
  </div>
</template>

<script>
import { blogPageId } from '~/data/pages'
import { usePageById } from '~/compositions/page'
export default {
  setup() {
    const { page, loading } = usePageById(blogPageId)
    return {
      page,
      loading,
    }
  },
  head() {},
  nuxtI18n: {
    paths: {
      nl: '/over-loesje/nieuws',
    },
  },
}
</script>
