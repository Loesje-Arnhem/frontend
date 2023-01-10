<template>
  <app-loader v-if="loading" />
  <div v-else-if="page" class="page">
    <app-content
      :title="page.title"
      :content="page.content"
      :video="page.videoGroup.youtubeId"
    />
    <center-wrapper size="md">
      <form-newsletter class="newsletter" />
    </center-wrapper>
    <related-posters-section :posters="page.relatedPosters" />
    <related-products-section :related-products="page.relatedProducts" />
    <related-pages-section :pages="page.relatedPages" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { newsletterPageId } from '~/data/pages'
import { usePageById } from '~/composables/usePage'

export default defineComponent({
  setup() {
    const { page, loading } = usePageById(newsletterPageId)
    return {
      page,
      loading,
    }
  },

  head: {},
  nuxtI18n: {
    paths: {
      nl: '/doe-mee/blijf-op-hoogte/',
    },
  },
})
</script>

<style scoped lang="postcss">
.newsletter {
  max-width: var(--container-width-sm);
  margin-bottom: 4em;
}
</style>
