<template>
  <app-loader v-if="loading" />
  <div v-else-if="page" class="page">
    <app-content
      :title="page.title"
      :content="page.content"
      :video="page.videoGroup.youtubeId"
    />
    <!-- <form-workshop /> -->
    <related-posters-section :related-posters="page.relatedPosters" />
    <related-products-section :related-products="page.relatedProducts" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { workshopsPageId } from '~/data/pages'
import { usePageById } from '~/compositions/page'

export default defineComponent({
  setup() {
    const { page, loading } = usePageById(workshopsPageId)
    return {
      page,
      loading,
    }
  },

  head: {},
  nuxtI18n: {
    paths: {
      nl: '/workshops',
    },
  },
})
</script>
