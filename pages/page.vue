<template>
  <app-loader v-if="loading" />
  <div v-else-if="page">
    <app-content :title="page.title" :content="page.content" />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePageByUri } from '~/composables/usePage'

export default defineComponent({
  setup() {
    const { page, loading } = usePageByUri()

    return {
      page,
      loading,
    }
  },
  head: {},

  nuxtI18n: {
    paths: {
      nl: '/:slug/:slug2?',
    },
  },
})
</script>
