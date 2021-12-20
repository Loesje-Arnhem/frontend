<template>
  <div>
    <h1 v-if="page" class="sr-only">{{ page.title }}</h1>
    <posts-overview-section />
    <!-- <related-posters-section :related-posters="page.relatedPosters" /> -->
    <!-- <related-products-section :related-products="page.relatedProducts" /> -->
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import { blogPageId } from '~/data/pages'
import { usePageById } from '~/composables/usePage'

export default defineComponent({
  setup() {
    const { page, loading } = usePageById(blogPageId)
    return {
      page,
      loading,
    }
  },
  head: {},
  nuxtI18n: {
    paths: {
      nl: '/over-loesje/nieuws',
    },
  },
})
</script>
