<template>
  <app-loader v-if="loading" />
  <div v-else-if="page" class="page">
    <app-content
      :title="page.title"
      :content="page.content"
      :video="page.videoGroup.youtubeId"
    />
    <related-posters-section :related-posters="page.relatedPosters" />
    <lazy-related-products-section
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
import { computed, defineComponent, useRoute } from '@nuxtjs/composition-api'
import { usePageByUri } from '~/composables/usePage'

export default defineComponent({
  setup() {
    const route = useRoute()

    const { page, loading } = usePageByUri(route.value.params.pathMatch)

    const parentPageId = computed(
      () => page.value.parentDatabaseId || page.value.databaseId,
    )

    return {
      parentPageId,
      loading,
      page,
    }
  },
  head: {},

  nuxtI18n: {
    paths: {
      nl: '/*',
    },
  },
})
</script>
