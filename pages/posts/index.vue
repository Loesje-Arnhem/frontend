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
import PostsOverviewSection from '~/components/Posts/Overview/PostsOverviewSection.vue'
// import RelatedPostersSection from '~/components/Posters/RelatedPosters/RelatedPostersSection.vue'
import RelatedProductsSection from '~/components/Shop/Products/RelatedProducts/RelatedProductsSection.vue'
import { usePageById } from '~/compositions/page'

export default {
  components: {
    // RelatedPostersSection,
    PostsOverviewSection,
    RelatedProductsSection,
  },
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
  // head() {
  //   return {
  //     title: this.page.title,
  //   }
  // },
}
</script>
