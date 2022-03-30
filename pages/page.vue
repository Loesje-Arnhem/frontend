<template>
  <app-loader v-if="loading" />
  <div v-else-if="page" class="page">
    <app-content
      :title="page.title"
      :content="page.content"
      :video="page.videoGroup.youtubeId"
    />
    <related-posters-section :related-posters="page.relatedPosters" />
    <related-products-section
      :related-products="page.relatedProducts"
      :title="page.relatedPosters.title"
    />
    <lazy-related-pages-section
      :not-in="page.databaseId"
      :parent-page-id="parentPageId"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { usePageByUri } from '~/composables/usePage'

export default defineComponent({
  setup() {
    const { page, loading } = usePageByUri()
    const parentPageId = computed(
      () => page.value.parentDatabaseId || page.value.databaseId,
    )

    return {
      loading,
      parentPageId,
      page,
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
