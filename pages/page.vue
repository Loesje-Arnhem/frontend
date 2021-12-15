<template>
  <app-loader v-if="loading" />
  <div v-else-if="page" class="page">
    <app-content
      :title="page.title"
      :content="page.content"
      :video="page.videoGroup.youtubeId"
    />
    <!-- <related-posters-section :related-posters="page.relatedPosters" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { usePageByUri } from '~/compositions/page'

export default defineComponent({
  setup() {
    const { page, loading } = usePageByUri()

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
