<template>
  <div>
    <h1 v-if="page" class="sr-only">{{ page.title }}</h1>
    <latest-posts-section />
    <lazy-related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    />
    <lazy-app-stores-section />
    <lazy-related-products-section
      v-if="page"
      :related-products="page.relatedProducts"
      :title="page.relatedPosters.title"
    />
    <block-instagram /> -->
    <lazy-groups />
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { homePageId } from '~/data/pages'
import { usePageById } from '~/compositions/page'

export default defineComponent({
  setup() {
    const { page, loading } = usePageById(homePageId)
    return {
      page,
      loading,
    }
  },

  head() {},
})
</script>
