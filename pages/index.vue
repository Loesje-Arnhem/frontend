<template>
  <div v-if="page">
    <h1 class="sr-only">{{ page.title }}</h1>
    <lazy-related-products-section
      v-if="page"
      :related-products="page.relatedProducts"
      :title="page.relatedPosters.title"
    />
    <latest-posts-section />
    <lazy-related-posters-section
      v-if="page"
      :related-posters="page.relatedPosters"
    />
    <lazy-app-stores-section />
    <block-instagram />
    <lazy-groups />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { homePageId } from '~/data/pages'
import { usePageById } from '~/composables/usePage'

export default defineComponent({
  setup() {
    const { page, loading } = usePageById(homePageId)
    return {
      page,
      loading,
    }
  },

  head: {},
})
</script>
