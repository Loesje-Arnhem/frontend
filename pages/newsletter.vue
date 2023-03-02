<script lang="ts" setup>
defineI18nRoute({
  paths: {
    nl: '/doe-mee/blijf-op-hoogte/',
  },
})
const { pageIds } = useAppConfig()

const { data, pending } = await usePageById(pageIds.newsletter)
</script>

<template>
  <app-loader v-if="pending" />
  <div v-else-if="data?.page" class="page">
    <app-content
      :title="data.page.title"
      :content="data.page.content"
      :video="data.page.videoGroup.youtubeId"
    />
    <center-wrapper size="md">
      <form-newsletter class="newsletter" />
    </center-wrapper>
    <related-posters-section :posters="data.page.relatedPosters" />
    <related-products-section :related-products="data.page.relatedProducts" />
    <related-pages-section :pages="data.page.relatedPages" />
  </div>
</template>

<style scoped lang="postcss">
.newsletter {
  max-width: var(--container-width-sm);
  margin-bottom: 4em;
}
</style>
