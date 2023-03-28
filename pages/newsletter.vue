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
  <div
    v-else-if="data"
    class="page"
  >
    <app-content
      :title="data.title"
      :content="data.content"
      :video="data.youtubeId"
    />
    <center-wrapper size="md">
      <form-newsletter class="newsletter" />
    </center-wrapper>
    <related-posters-section :posters="data.relatedPosters" />
    <!-- <related-products-section :related-products="data.page.relatedProducts" /> -->
    <related-pages-section :parent-id="data.parentId" />
  </div>
</template>

<style scoped lang="postcss">
.newsletter {
  max-width: var(--container-width-sm);
  margin-bottom: 4em;
}
</style>
