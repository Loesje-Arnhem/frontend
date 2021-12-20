<template>
  <app-loader v-if="loading" />
  <div v-else-if="page" class="page">
    <app-content
      :title="page.title"
      :content="page.content"
      :video="page.videoGroup.youtubeId"
    />
    <related-posters-section :related-posters="page.relatedPosters" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { usePageByUri } from '~/composables/usePage'

export default defineComponent({
  setup() {
    const route = useRoute()

    const { page, loading } = usePageByUri(route.value.params.pathMatch)

    return {
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
